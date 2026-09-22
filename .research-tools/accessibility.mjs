import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from '../node_modules/vite/dist/node/index.js';
import { categories, products } from '../src/data/catalog.js';

const origin = 'http://127.0.0.1:4182';
const output = 'docs/master-review/accessibility.json';
const widths = [1440, 390];
const locales = ['en', 'fa'];
const routes = [
  '', 'equipment', ...categories.map(category => `equipment/${category.id}`),
  ...products.map(product => `models/${product.id}`),
  'availability', 'parts', 'service', 'applications', 'applications/mining',
  'applications/roads', 'applications/infrastructure', 'company', 'contact',
  'quote', 'downloads', 'privacy',
];
const urlFor = (locale, route) => `${origin}/${locale}-af/${route ? `${route}/` : ''}`;

let axe;
try { axe = (await import('@axe-core/playwright')).AxeBuilder; } catch { axe = null; }

async function fallbackChecks(page) {
  const checks = await page.evaluate(() => {
    const named = element => element.getAttribute('aria-label') || element.getAttribute('title') || element.textContent.trim() || element.getAttribute('alt');
    const unnamed = [...document.querySelectorAll('a,button,input,select,textarea')]
      .filter(element => !element.disabled && !named(element)).map(element => element.outerHTML.slice(0, 180));
    const missingAlt = [...document.images].filter(image => !image.hasAttribute('alt')).map(image => image.src);
    return {
      unnamed,
      missingAlt,
      mainCount: document.querySelectorAll('main').length,
      h1Count: document.querySelectorAll('h1').length,
      focusableCount: document.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])').length,
    };
  });
  const focusSequence = [];
  for (let index = 0; index < Math.min(checks.focusableCount, 20); index += 1) {
    await page.keyboard.press('Tab');
    focusSequence.push(await page.evaluate(() => ({
      tag: document.activeElement?.tagName || '',
      name: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 80) || '',
    })));
  }
  checks.focusSequence = focusSequence;
  const violations = [];
  if (checks.unnamed.length) violations.push({ id: 'fallback-name', impact: 'serious', description: 'Interactive controls must have accessible names.', nodes: checks.unnamed.map(selector => ({ target: [selector] })) });
  if (checks.missingAlt.length) violations.push({ id: 'fallback-alt', impact: 'serious', description: 'Images must have alternative text.', nodes: checks.missingAlt.map(selector => ({ target: [selector] })) });
  if (checks.mainCount !== 1) violations.push({ id: 'fallback-main', impact: 'serious', description: 'The page must have one main landmark.', nodes: [{ target: ['main'] }] });
  if (checks.h1Count !== 1) violations.push({ id: 'fallback-h1', impact: 'serious', description: 'The page must have one H1.', nodes: [{ target: ['h1'] }] });
  return { violations, checks };
}

const server = await preview({ configFile: false, preview: { host: '127.0.0.1', port: 4182, strictPort: true } });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const locale of locales) for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', isMobile: width < 640 });
    const page = await context.newPage();
    for (const route of routes) {
      const record = { locale, width, route: route || '/', url: urlFor(locale, route), mode: axe ? 'axe' : 'fallback', violations: [] };
      try {
        await page.goto(record.url, { waitUntil: 'networkidle' });
        await page.locator('main h1').waitFor();
        const outcome = axe
          ? await new axe({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
          : await fallbackChecks(page);
        record.violations = outcome.violations.filter(violation => ['serious', 'critical'].includes(violation.impact)).map(violation => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          help: violation.help,
          selectors: violation.nodes.map(node => node.target),
        }));
        if (!axe) record.fallbackChecks = outcome.checks;
      } catch (error) {
        record.error = error.message;
        record.violations.push({ id: 'runner-error', impact: 'critical', description: error.message, selectors: [] });
      }
      results.push(record);
      const status = record.violations.length ? 'FAIL' : 'PASS';
      console.log(`${status} ${locale} ${width}px ${route || 'home'}${axe ? '' : ' (fallback)'}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise(resolve => server.httpServer.close(resolve));
  await fs.mkdir('docs/master-review', { recursive: true });
  await fs.writeFile(output, JSON.stringify({
    checkedAt: new Date().toISOString(),
    origin,
    routes: routes.length,
    locales,
    widths,
    mode: axe ? 'axe-core/playwright' : 'fallback-keyboard-semantic',
    note: axe ? 'Only serious and critical axe violations are recorded.' : 'axe-core/playwright was unavailable; fallback checks cover accessible names, image alt text, main/H1 landmarks, and focusable controls.',
    results,
  }, null, 2));
}

const failures = results.filter(result => result.violations.length);
if (failures.length) process.exitCode = 1;
else console.log(`Accessibility checks passed: ${results.length} pages (${axe ? 'axe' : 'fallback'} mode).`);
