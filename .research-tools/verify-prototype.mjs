import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from '../node_modules/vite/dist/node/index.js';
import { translations } from '../src/data/translations.js';
import { showroomCopy } from '../src/data/showroom.js';

// Exercise the production build in installed Chrome; never send requests externally.
const output = 'docs/showroom-review';
await fs.mkdir(output, { recursive: true });
const server = await preview({ preview: { host: '127.0.0.1', port: 4175, strictPort: true } });
let browser;
const results = [];
const failures = [];
async function check(name, fn) {
  try { await fn(); results.push({ name, passed: true }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, passed: false, error: error.message }); failures.push(name); console.error(`FAIL ${name}: ${error.message}`); }
}
const origin = 'http://127.0.0.1:4175';
async function settle(page) {
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await page.evaluate(async () => {
    // Full-page captures must load offscreen media without changing production lazy loading.
    document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true });
    })));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}
async function noOverflow(page) {
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  assert.ok(dimensions.document <= dimensions.viewport + 1, JSON.stringify(dimensions));
}
try {
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  for (const locale of ['en', 'fa']) {
    const t = { ...translations[locale], ...showroomCopy[locale] };
    for (const width of [1440, 1024, 768, 390, 320]) {
      await check(`${locale}: layout and assets at ${width}px`, async () => {
        const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 640, hasTouch: width < 640, reducedMotion: 'reduce' });
        try {
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', e => errors.push(e.message));
          await page.goto(`${origin}/${locale}-af/`);
          await settle(page);
          await noOverflow(page);
          assert.equal(await page.locator('html').getAttribute('dir'), locale === 'fa' ? 'rtl' : 'ltr');
          assert.equal(await page.locator('h1').count(), 1);
          assert.equal(await page.locator('.category-tile').count(), 6);
          assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || !i.naturalWidth).map(i => i.src)), []);
          assert.deepEqual(errors, []);
          await page.screenshot({ path: `${output}/${locale}-${width}.png`, fullPage: true });
          if (width === 1440 || width === 390) await page.screenshot({ path: `${output}/${locale}-${width}-hero.png` });
          if (width === 390) {
            await page.locator('.menu-button').click();
            assert.equal(await page.locator('dialog[open]').count(), 1);
            await page.screenshot({ path: `${output}/${locale}-mobile-menu.png` });
            await page.locator('.menu-dialog nav a').first().click();
            assert.equal(await page.locator('dialog[open]').count(), 0);
            assert.ok(await page.locator('#equipment').evaluate(el => Math.abs(el.getBoundingClientRect().top - 112) < 2));
            await page.locator('.mobile-action-bar button').first().click();
            await page.screenshot({ path: `${output}/${locale}-mobile-request.png` });
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('dialog[open]').count(), 0);
          }
        } finally { await context.close(); }
      });
    }
    await check(`${locale}: filtering, model context, forms, keyboard and language`, async () => {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        const external = [];
        await page.route('**/*', route => {
          if (!route.request().url().startsWith(origin)) { external.push(route.request().url()); return route.abort(); }
          return route.continue();
        });
        await page.goto(`${origin}/${locale}-af/`);
        await page.locator('.category-tile').nth(1).click();
        assert.equal(await page.locator('.product-card').count(), 1);
        assert.equal(await page.locator('.product-card h3').innerText(), 'SE220LC');
        await page.locator('.product-image').click();
        assert.equal(await page.locator('#product-title').innerText(), 'SE220LC');
        await page.screenshot({ path: `${output}/${locale}-model.png` });
        await page.locator('.model-grid .primary').click();
        assert.equal(await page.locator('#request-machine').inputValue(), 'SE220LC');
        await page.locator('.form-submit').click();
        assert.equal(await page.locator('.field-error').count(), 3);
        assert.equal(await page.evaluate(() => document.activeElement.id), 'request-name');
        await page.locator('#request-name').fill('Preview User');
        await page.locator('#request-phone').fill('123');
        await page.locator('#request-province').fill('Kabul');
        await page.locator('.form-submit').click();
        assert.equal(await page.locator('#phone-error').count(), 1);
        await page.locator('#request-phone').fill(locale === 'fa' ? '۰۷۰۱۲۳۴۵۶۷' : '0701234567');
        await page.locator('.form-submit').click();
        assert.equal(await page.locator('.request-result h3').innerText(), t.reviewed);
        assert.equal(await page.locator('.request-context bdi').innerText(), 'SE220LC');
        assert.equal(await page.evaluate(() => document.activeElement.className), 'request-result');
        await page.getByRole('button', { name: t.editRequest, exact: true }).click();
        assert.equal(await page.locator('#request-name').inputValue(), 'Preview User');
        await page.keyboard.press('Escape');
        await page.locator('.quick-item').nth(1).click();
        assert.equal(await page.locator('#request-identifier').count(), 1);
        await page.locator('.form-submit').click();
        assert.equal(await page.locator('#message-error').count(), 1);
        await page.keyboard.press('Escape');
        assert.ok(await page.locator('.quick-item').nth(1).evaluate(el => el === document.activeElement));
        await page.locator('.quick-item').nth(2).click();
        assert.equal(await page.locator('#request-stopped').count(), 1);
        await page.keyboard.press('Tab');
        assert.ok(await page.evaluate(() => !!document.activeElement.closest('dialog')));
        await page.keyboard.press('Escape');
        await page.locator('.hero-selector button').nth(1).click();
        assert.equal(await page.locator('.hero-selector button').nth(1).getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.stage-caption strong').innerText(), locale === 'en' ? 'Excavators' : 'اکسکاواتورها');
        await page.locator('.filter-list button').first().click();
        assert.equal(await page.locator('.product-card').count(), 3);
        await page.locator('.range-more button').click();
        assert.equal(await page.locator('.product-card').count(), 6);
        await page.locator('#catalog-search').fill('SE220LC');
        assert.equal(await page.locator('.product-card').count(), 1);
        await page.locator('#catalog-search').fill('no-such-machine');
        assert.equal(await page.locator('.product-card').count(), 0);
        assert.equal(await page.locator('.catalog-empty').count(), 1);
        await page.locator('.catalog-empty button').click();
        assert.equal(await page.locator('.product-card').count(), 6);
        await page.locator('.compare-toggle').nth(0).click();
        assert.equal(await page.locator('.compare-tray > .primary').isDisabled(), true);
        await page.locator('.compare-toggle').nth(1).click();
        await page.locator('.compare-toggle').nth(2).click();
        assert.equal(await page.locator('.compare-toggle').nth(3).isDisabled(), true);
        await page.locator('.compare-tray > .primary').click();
        assert.equal(await page.locator('.comparison-table thead bdi').count(), 3);
        await page.screenshot({ path: `${output}/${locale}-comparison.png` });
        await page.locator('.comparison-table .primary').nth(1).click();
        assert.equal(await page.locator('#request-machine').inputValue(), 'SE220LC');
        await page.keyboard.press('Escape');
        await page.locator('.tray-clear').click();
        assert.equal(await page.locator('.compare-tray').count(), 0);
        await page.locator('.product-image').first().click();
        await page.locator('.model-zoom').click();
        assert.equal(await page.locator('.model-zoom').getAttribute('aria-pressed'), 'true');
        await page.keyboard.press('Escape');
        await page.locator('.header-actions .language-button').click();
        assert.equal(await page.locator('html').getAttribute('dir'), locale === 'fa' ? 'ltr' : 'rtl');
        assert.equal(await page.locator('.product-card').count(), 6);
        await page.reload();
        assert.equal(await page.locator('html').getAttribute('lang'), locale === 'fa' ? 'en-AF' : 'fa-AF');
        assert.deepEqual(external, []);
        assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), ['shantui-locale']);
      } finally { await context.close(); }
    });
  }
  await check('Normal motion, scroll reveals and reduced-motion preference changes', async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    await page.goto(`${origin}/en-af/`);
    assert.equal(await page.locator('.hero-machine').evaluate(el => getComputedStyle(el).animationName), 'machine-arrive');
    for (const section of await page.locator('[data-reveal]').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForFunction(el => el.classList.contains('is-visible'), await section.elementHandle());
    }
    await page.waitForFunction(() => document.getAnimations().every(a => a.playState === 'finished'));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `${output}/en-motion-desktop.png`, fullPage: true });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.documentElement.classList.contains('motion-ready'));
    assert.equal(await page.locator('.hero-machine').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.close();
  });
  await check('Mobile comparison and search reflow in Dari', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, reducedMotion: 'reduce' });
    await page.goto(`${origin}/fa-af/`);
    await page.locator('.compare-toggle').nth(0).click();
    await page.locator('.compare-toggle').nth(1).click();
    await noOverflow(page);
    await page.screenshot({ path: `${output}/fa-mobile-shortlist.png` });
    await page.locator('.compare-tray > .primary').click();
    await noOverflow(page);
    assert.ok(await page.locator('.comparison-scroll').evaluate(el => el.scrollWidth > el.clientWidth));
    await page.screenshot({ path: `${output}/fa-mobile-comparison.png` });
    await page.keyboard.press('Escape');
    await page.locator('.tray-clear').click();
    await page.locator('#catalog-search').fill('بلدوزر');
    assert.equal(await page.locator('.product-card').count(), 1);
    await page.close();
  });
  await check('Missing images: readable categories, models and working quote', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.route('**/images/**', route => route.abort());
    await page.goto(`${origin}/en-af/`);
    await page.locator('.category-tile').first().scrollIntoViewIfNeeded();
    await page.locator('.image-fallback').first().waitFor();
    await noOverflow(page);
    await page.locator('.category-tile').first().click();
    await page.locator('.product-image').click();
    assert.equal(await page.locator('#product-title').innerText(), 'SD22');
    await page.locator('.model-grid .primary').click();
    assert.equal(await page.locator('#request-machine').inputValue(), 'SD22');
    await page.close();
  });
} finally {
  await browser?.close();
  await new Promise(resolve => server.httpServer.close(resolve));
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
}
if (failures.length) throw new Error(`${failures.length} failed checks: ${failures.join('; ')}`);
console.log(`All ${results.length} checks passed. Screenshots: ${output}`);
