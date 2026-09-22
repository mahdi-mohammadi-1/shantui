import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from '../node_modules/vite/dist/node/index.js';
import { categories, products } from '../src/data/catalog.js';
import { translations } from '../src/data/translations.js';
import { pageCopy } from '../src/data/pages.js';

const output = 'docs/multipage-review';
await fs.mkdir(output, { recursive: true });
const origin = 'http://127.0.0.1:4175';
const server = await preview({ preview: { host: '127.0.0.1', port: 4175, strictPort: true } });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
const runtimeErrors = [];
const routes = ['', 'equipment', ...categories.map(c => `equipment/${c.id}`), ...products.map(p => `models/${p.id}`), 'availability', 'parts', 'service', 'applications', 'applications/mining', 'applications/roads', 'applications/infrastructure', 'company', 'contact', 'quote', 'downloads', 'privacy'];
const screenshots = new Set(['', 'equipment', 'models/sd22', 'parts', 'service', 'company', 'contact', 'quote', 'applications', 'downloads']);
const url = (locale, path = '') => `${origin}/${locale}-af/${path}${path && !path.includes('?') ? '/' : ''}`;
async function check(name, fn) {
  try { await fn(); results.push({ name, passed: true }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, passed: false, error: error.message }); console.error(`FAIL ${name}: ${error.message}`); }
}
async function noOverflow(page) {
  const size = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  assert.ok(size.page <= size.viewport + 1, JSON.stringify(size));
}
async function ready(page) {
  await page.locator('main h1').waitFor();
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true });
    })));
  });
}
try {
  for (const [locale, width] of [['en', 1440], ['fa', 390]]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', isMobile: width < 640 });
    const page = await context.newPage();
    page.on('pageerror', e => runtimeErrors.push(e.message));
    for (const path of routes) await check(`${locale} ${width}px: /${path || 'home'}`, async () => {
      await page.goto(url(locale, path));
      await ready(page);
      assert.equal(await page.locator('main h1').count(), 1);
      assert.equal(await page.locator('html').getAttribute('lang'), `${locale}-AF`);
      await noOverflow(page);
      assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(img => !img.naturalWidth).map(img => img.src)), []);
      if (path.startsWith('models/')) assert.equal(await page.locator('.model-page').count(), 1);
      if (path.startsWith('equipment/')) assert.equal(await page.locator('.product-card').count(), 1);
      if (screenshots.has(path)) {
        const slug = path.replaceAll('/', '-') || 'home';
        await page.screenshot({ path: `${output}/${locale}-${slug}.png`, fullPage: true });
        if (path === 'equipment' || path === 'models/sd22' || path === 'parts') await page.screenshot({ path: `${output}/${locale}-${slug}-top.png` });
      }
    });
    await context.close();
  }
  for (const [locale, width] of [['en', 390], ['fa', 1440], ['en', 320], ['fa', 320]]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await check(`${locale} ${width}px: catalog, model, parts, contact and quote reflow`, async () => {
      for (const path of ['equipment', 'models/sd22', 'parts', 'contact', 'quote']) {
        await page.goto(url(locale, path)); await ready(page); await noOverflow(page);
      }
    });
    await context.close();
  }
  await check('Native links, deep-link reload, browser back/forward and language continuity', async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(url('en'));
    await page.locator('header nav a').first().click();
    await page.waitForURL('**/en-af/equipment/');
    await page.locator('.filter-list a[href$="/excavators/"]').click();
    await page.waitForURL('**/en-af/equipment/excavators/');
    assert.equal(await page.locator('.product-card').count(), 1);
    await page.locator('.product-view').click();
    await page.waitForURL('**/en-af/models/se220lc/');
    assert.equal(await page.locator('main h1').innerText(), 'SE220LC');
    await page.reload();
    assert.equal(await page.locator('main h1').innerText(), 'SE220LC');
    await page.goBack();
    await page.waitForURL('**/en-af/equipment/excavators/');
    await page.goForward();
    await page.waitForURL('**/en-af/models/se220lc/');
    await page.locator('[data-header-language]').click();
    await page.waitForURL('**/fa-af/models/se220lc/');
    assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
    assert.ok((await page.title()).includes('SE220LC'));
    await page.locator('header a[aria-label^="SHANTUI"]').click();
    await page.waitForURL('**/fa-af/');
    await page.close();
  });
  await check('Comparison persists across pages and hands the exact model to the request page', async () => {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    await page.goto(url('en', 'equipment/bulldozers'));
    await page.locator('.compare-toggle').click();
    await page.locator('.filter-list a[href$="/excavators/"]').click();
    await page.locator('.compare-toggle').click();
    assert.equal(await page.locator('.tray-models button').count(), 2);
    await page.locator('.compare-tray > .primary').click();
    await page.locator('.comparison-table .primary').nth(1).click();
    await page.waitForURL('**/quote/**');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await page.locator('#request-machine').inputValue(), 'SE220LC');
    await page.locator('.tray-clear').click();
    await page.close();
  });
  for (const locale of ['en', 'fa']) await check(`${locale}: inline request validation, review, edit and department context`, async () => {
    const t = translations[locale];
    const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
    const external = [];
    await page.route('**/*', route => {
      if (!route.request().url().startsWith(origin)) { external.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    await page.goto(url(locale, 'quote/?kind=quote&model=SE220LC'));
    await page.locator('.form-submit').click();
    assert.equal(await page.locator('.field-error').count(), 3);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'request-name');
    await page.locator('#request-name').fill('Preview User');
    await page.locator('#request-province').fill('Kabul');
    await page.locator('#request-phone').fill('123');
    await page.locator('.form-submit').click();
    assert.equal(await page.locator('#phone-error').count(), 1);
    await page.locator('#request-phone').fill(locale === 'fa' ? '۰۷۰۱۲۳۴۵۶۷' : '0701234567');
    await page.locator('.form-submit').click();
    assert.equal(await page.locator('.request-result h3').innerText(), t.reviewed);
    await page.getByRole('button', { name: t.editRequest, exact: true }).click();
    assert.equal(await page.locator('#request-name').inputValue(), 'Preview User');
    await page.locator('[data-header-language]').click();
    assert.equal(await page.locator('#request-name').inputValue(), 'Preview User');
    assert.equal(await page.locator('#request-machine').inputValue(), 'SE220LC');
    await page.locator('.request-type-nav a').nth(1).click();
    assert.equal(await page.locator('#request-identifier').count(), 1);
    assert.equal(await page.locator('#request-machine').inputValue(), 'SE220LC');
    await page.locator('.form-submit').click();
    assert.equal(await page.locator('#message-error').count(), 1);
    await page.locator('.request-type-nav a').nth(2).click();
    assert.equal(await page.locator('#request-stopped').count(), 1);
    assert.deepEqual(external, []);
    assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), ['shantui-locale']);
    await page.close();
  });
  await check('Mobile navigation, search empty state, documents and unknown routes', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(url('en'));
    await page.locator('[data-header-menu]').click();
    await page.locator('.menu-dialog a[href$="/parts/"]').click();
    await page.waitForURL('**/parts/');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    await page.goto(url('en', 'equipment'));
    await page.locator('#catalog-search').fill('SE220LC');
    assert.equal(await page.locator('.product-card').count(), 1);
    await page.locator('#catalog-search').fill('not-a-model');
    assert.equal(await page.locator('.catalog-empty').count(), 1);
    await page.locator('.catalog-empty button').click();
    assert.equal(await page.locator('.product-card').count(), 6);
    await page.goto(url('en', 'downloads'));
    await page.locator('.document-list article').nth(1).locator('button').click();
    assert.equal(await page.locator('#request-machine').inputValue(), 'SE220LC');
    assert.equal(await page.locator('#request-message').inputValue(), translations.en.requestSubject);
    for (const path of ['missing', 'models/invalid', 'parts/extra', 'equipment/invalid', 'applications/invalid']) {
      await page.goto(url('en', path));
      assert.equal(await page.locator('main h1').innerText(), pageCopy.en.notFoundTitle);
    }
    await page.close();
  });
  await check('Home motion reinitializes after navigation and respects reduced motion', async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    await page.goto(url('en', 'parts'));
    await page.locator('header a[aria-label^="SHANTUI"]').click();
    await page.locator('.hero-machine').waitFor();
    assert.equal(await page.locator('.hero-machine').evaluate(el => getComputedStyle(el).animationName), 'machine-arrive');
    for (const section of await page.locator('[data-reveal]').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForFunction(el => el.classList.contains('is-visible'), await section.elementHandle());
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.documentElement.classList.contains('motion-ready'));
    assert.equal(await page.locator('.hero-machine').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.close();
  });
  await check('Missing machine imagery keeps model and request pages usable', async () => {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    await page.route('**/images/**', route => route.abort());
    await page.goto(url('en', 'models/sd22'));
    await page.locator('.image-fallback').first().waitFor();
    assert.equal(await page.locator('main h1').innerText(), 'SD22');
    await page.locator('.model-page-actions .primary').click();
    assert.equal(await page.locator('#request-machine').inputValue(), 'SD22');
    await page.close();
  });
  await check('No JavaScript runtime errors on route matrix', async () => assert.deepEqual(runtimeErrors, []));
} finally {
  await browser.close();
  await new Promise(resolve => server.httpServer.close(resolve));
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), routeCountPerLanguage: routes.length, results }, null, 2));
}
const failures = results.filter(r => !r.passed);
if (failures.length) throw Error(`${failures.length} checks failed: ${failures.map(r => r.name).join('; ')}`);
console.log(`All ${results.length} checks passed; ${routes.length} routes per language.`);
