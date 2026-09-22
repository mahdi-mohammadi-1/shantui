import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { pageCopy } from '../src/data/pages.js';

const [routeArg = '', sectionSelector, mode] = process.argv.slice(2);
const requestedRoute = routeArg.replace(/^\/+|\/+$/g, '');
const route = requestedRoute === 'home' ? '' : requestedRoute;
const routeFolder = route || 'home';
const allowNotFound = mode === '--allow-404';
const output = path.resolve('docs', 'master-review', routeFolder, sectionSelector ? sectionSelector.replace(/[^a-z0-9_-]/gi, '_') : '');
const origin = 'http://127.0.0.1:4176';
const widths = [1440, 1024, 768, 390];
const locales = ['en', 'fa'];
const results = [];

const chromePath = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(candidate => candidate);

const urlFor = (locale) => `${origin}/${locale}-af/${route ? `${route}/` : ''}`;

async function waitForImages(page) {
  await page.evaluate(() => {
    document.querySelectorAll('img').forEach(image => {
      image.loading = 'eager';
      image.decoding = 'sync';
    });
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.complete
      ? Promise.resolve()
      : new Promise(resolve => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      })));
  });
}

async function revealPage(page) {
  await page.evaluate(async () => {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += Math.max(innerHeight * 0.8, 400)) {
      scrollTo(0, y);
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    scrollTo(0, 0);
  });
  await waitForImages(page);
}

async function checkHeaderInteractions(page, locale, width) {
  const applicationsPath = new RegExp(`/${locale}-af/applications/?$`);
  const languagePath = new RegExp(`/${locale === 'en' ? 'fa' : 'en'}-af/applications/?$`);
  if (width >= 1280) {
    await page.locator('header nav a[href$="/applications/"]').click();
  } else {
    const menu = page.locator('[data-header-menu]');
    await menu.click();
    await page.locator('dialog.menu-dialog').waitFor();
    await page.keyboard.press('Escape');
    await assert.rejects(page.locator('dialog.menu-dialog').waitFor({ state: 'visible', timeout: 250 }));
    await menu.click();
    await page.locator('dialog.menu-dialog a[href$="/applications/"]').click();
  }
  await page.waitForURL(applicationsPath);
  await page.locator('[data-header-language]').click();
  await page.waitForURL(languagePath);
  assert.ok(languagePath.test(new URL(page.url()).pathname), 'language switch did not preserve the applications route');
}

async function checkPage(page, locale, width, screenshotPath) {
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto(urlFor(locale), { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  await page.locator('main h1').waitFor();
  const heading = (await page.locator('main h1').innerText()).replace(/\s+/g, ' ').trim();
  const notFoundHeading = pageCopy[locale].notFoundTitle.replace(/\s+/g, ' ').trim();
  assert.ok(allowNotFound || heading !== notFoundHeading,
    `unexpected 404 page at ${urlFor(locale)}; pass --allow-404 only for deliberate invalid-route checks`);
  await revealPage(page);

  const imageFailures = await page.locator('img').evaluateAll(images => images
    .filter(image => !image.naturalWidth)
    .map(image => image.currentSrc || image.src));
  const dimensions = await page.evaluate(() => ({
    viewport: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }));

  assert.equal(await page.locator('h1').count(), 1, 'expected exactly one H1');
  assert.ok(dimensions.scrollWidth <= dimensions.viewport + 1,
    `horizontal overflow: ${JSON.stringify(dimensions)}`);
  assert.deepEqual(imageFailures, [], `missing images: ${imageFailures.join(', ')}`);
  assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join(' | ')}`);
  assert.deepEqual(pageErrors, [], `page errors: ${pageErrors.join(' | ')}`);

  if (sectionSelector) {
    const section = page.locator(sectionSelector).first();
    await section.waitFor();
    await section.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    const sectionBox = await section.boundingBox();
    if (sectionBox) {
      await page.setViewportSize({ width, height: Math.max(900, Math.ceil(sectionBox.height) + 250) });
      await section.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    }
    await section.screenshot({ path: screenshotPath, animations: 'disabled', style: sectionSelector === 'header' ? '' : '.site-header, .mobile-action-bar { visibility: hidden !important; }' });
  } else {
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  if (sectionSelector === 'header') await checkHeaderInteractions(page, locale, width);

  return { passed: true, locale, width, screenshot: path.relative(process.cwd(), screenshotPath), dimensions };
}

await fs.mkdir(output, { recursive: true });
const server = await createServer({ server: { host: '127.0.0.1', port: 4176, strictPort: true } });
await server.listen();
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

try {
  for (const locale of locales) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: 'reduce',
        isMobile: width < 640,
      });
      const page = await context.newPage();
      const screenshotPath = path.join(output, `${locale}-${width}.png`);
      const startedAt = new Date().toISOString();
      try {
        results.push(await checkPage(page, locale, width, screenshotPath));
        console.log(`PASS ${locale} ${width}px ${urlFor(locale)}`);
      } catch (error) {
        results.push({ passed: false, locale, width, error: error.message, screenshot: path.relative(process.cwd(), screenshotPath) });
        console.error(`FAIL ${locale} ${width}px ${urlFor(locale)}: ${error.message}`);
      } finally {
        results[results.length - 1].startedAt = startedAt;
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  await server.close();
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({
    checkedAt: new Date().toISOString(),
    route: route || '/',
    section: sectionSelector || null,
    origin,
    locales,
    widths,
    results,
  }, null, 2));
}

const failures = results.filter(result => !result.passed);
if (failures.length) process.exitCode = 1;
else console.log(`All ${results.length} checks passed for ${route || 'home'}.`);
