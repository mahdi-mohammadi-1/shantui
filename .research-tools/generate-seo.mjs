import fs from 'node:fs/promises';
import path from 'node:path';

const publicDir = path.resolve('public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const robotsPath = path.join(publicDir, 'robots.txt');

function originFrom(value) {
  try {
    const url = new URL(value || '');
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || (url.pathname !== '/' && url.pathname !== '')) return null;
    return url.origin;
  } catch { return null; }
}

const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const site = originFrom(process.env.VITE_SITE_URL);
const publishReady = process.env.VITE_PUBLISH_READY === 'true';

await fs.mkdir(publicDir, { recursive: true });
if (!site || !publishReady) {
  await fs.rm(sitemapPath, { force: true });
  await fs.writeFile(robotsPath, 'User-agent: *\nDisallow: /\n');
  console.log('VITE_SITE_URL is absent or invalid, or VITE_PUBLISH_READY is not true; wrote disallowing robots.txt and removed sitemap.xml.');
} else {
  const routes = ['', 'equipment', 'availability', 'parts', 'service', 'applications', 'company', 'contact', 'downloads', 'applications/mining', 'applications/roads', 'applications/infrastructure', 'equipment/bulldozers', 'equipment/excavators', 'equipment/loaders', 'equipment/compactors', 'equipment/graders', 'equipment/trucks', 'models/sd22', 'models/se220lc', 'models/l55-b5', 'models/sr22', 'models/sg21', 'models/mining-range'];
  const urls = routes.flatMap(route => ['en', 'fa'].map(locale => `${site}/${locale}-af/${route ? `${route}/` : ''}`));
  const body = urls.map(url => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n');
  await fs.writeFile(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  await fs.writeFile(robotsPath, `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
  console.log(`Generated sitemap.xml with ${urls.length} URLs and robots.txt for ${site}.`);
}
