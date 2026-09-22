import { contentProvider as catalog } from './data/catalog.js';
import { pageCopy } from './data/pages.js';
import { showroomCopy } from './data/showroom.js';
import { translations } from './data/translations.js';

const DEFAULT_LOCALE = 'fa';
const imageFor = route => {
  const product = route?.page === 'models' && catalog.products.find(item => item.id === route?.slug);
  const category = route?.page === 'equipment' && route?.slug && catalog.getCategory(route.slug);
  const industry = route?.page === 'applications' && pageCopy[route?.locale]?.industries?.[route?.slug];
  return product?.image || category?.image || industry?.image || catalog.categories[0]?.image;
};

function siteOrigin(value) {
  try {
    const url = new URL(value || '');
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || (url.pathname !== '/' && url.pathname !== '')) return null;
    return url.origin;
  } catch { return null; }
}

function routePath(route) {
  if (!route || route.page === 'home') return '';
  return [route.page, route.slug].filter(Boolean).join('/');
}

export function isValidSeoRoute(route = {}) {
  const page = route.page || 'home';
  const slug = route.slug || '';
  const expectedSegments = [page, slug].filter(Boolean);
  if (!['en', 'fa'].includes(route.locale || DEFAULT_LOCALE)) return false;
  if (Array.isArray(route.segments) && route.segments.join('/') !== expectedSegments.join('/')) return false;
  if (page === 'home') return !slug;
  if (page === 'equipment') return !slug || !!catalog.getCategory(slug);
  if (page === 'models') return !!catalog.products.find(item => item.id === slug);
  if (page === 'applications') return !slug || !!pageCopy[route.locale || DEFAULT_LOCALE]?.industries?.[slug];
  return ['availability', 'parts', 'service', 'company', 'contact', 'quote', 'downloads', 'privacy'].includes(page) && !slug;
}

function routeUrl(origin, locale, route) {
  const suffix = routePath(route);
  return `${origin}/${locale}-af/${suffix}${suffix ? '/' : ''}`;
}

function labelsFor(route) {
  const locale = route?.locale || DEFAULT_LOCALE;
  const copy = pageCopy[locale] || pageCopy[DEFAULT_LOCALE];
  const product = route?.page === 'models' && catalog.products.find(item => item.id === route?.slug);
  const category = route?.page === 'equipment' && route?.slug && catalog.getCategory(route.slug);
  const industry = route?.page === 'applications' && copy.industries?.[route?.slug];
  const t = translations[locale] || translations[DEFAULT_LOCALE];
  const showroom = showroomCopy[locale] || showroomCopy[DEFAULT_LOCALE];
  const title = product?.model || category?.label?.[locale] || industry?.title || (route?.page === 'home' ? showroom.heroEyebrow : copy[`${route?.page}Title`] || copy[route?.page]) || copy.notFoundTitle;
  let description = industry?.text || copy[`${route?.page}Text`];
  if (route?.page === 'home') description = showroom.heroDescription;
  if (route?.page === 'equipment' && route?.slug) description = copy.categoryText;
  if (route?.page === 'models' && product) description = copy.modelOverview;
  return { title, description: description || t.companyDescription, locale };
}

export function createSeoMetadata({ route = {}, title, description } = {}) {
  const normalizedRoute = { locale: route.locale || DEFAULT_LOCALE, page: route.page || 'home', slug: route.slug || '' };
  const labels = labelsFor(normalizedRoute);
  const origin = siteOrigin(typeof import.meta.env !== 'undefined' ? import.meta.env.VITE_SITE_URL : '');
  const publishReady = typeof import.meta.env !== 'undefined' && import.meta.env.VITE_PUBLISH_READY === 'true';
  const validRoute = isValidSeoRoute({ ...normalizedRoute, segments: route.segments });
  const canonical = origin && publishReady && validRoute && !['quote', 'privacy'].includes(normalizedRoute.page) ? routeUrl(origin, normalizedRoute.locale, normalizedRoute) : null;
  const image = imageFor(normalizedRoute);
  return {
    title: `${title || labels.title} | SHANTUI Afghanistan`,
    description: description || labels.description,
    image: image ? `${origin || ''}/images/${image}.webp` : null,
    canonical,
    hreflang: origin ? { 'en-AF': routeUrl(origin, 'en', normalizedRoute), 'fa-AF': routeUrl(origin, 'fa', normalizedRoute) } : null,
    route: normalizedRoute,
  };
}

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) { element = document.createElement('meta'); document.head.appendChild(element); }
  element.setAttribute(attribute, value);
}

function setLink(rel, href, hreflang) {
  const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`;
  let element = document.head.querySelector(selector);
  if (!element) { element = document.createElement('link'); element.rel = rel; if (hreflang) element.hreflang = hreflang; document.head.appendChild(element); }
  element.href = href;
}

export function updateSeo({ route = {}, title, description } = {}) {
  const metadata = createSeoMetadata({ route, title, description });
  if (typeof document === 'undefined') return metadata;
  document.title = metadata.title;
  setMeta('meta[name="description"]', 'name', 'description');
  document.head.querySelector('meta[name="description"]').content = metadata.description;
  setMeta('meta[property="og:title"]', 'property', 'og:title');
  document.head.querySelector('meta[property="og:title"]').content = metadata.title;
  setMeta('meta[property="og:description"]', 'property', 'og:description');
  document.head.querySelector('meta[property="og:description"]').content = metadata.description;
  if (metadata.image) { setMeta('meta[property="og:image"]', 'property', 'og:image'); document.head.querySelector('meta[property="og:image"]').content = metadata.image; }
  setMeta('meta[name="robots"]', 'name', 'robots');
  document.head.querySelector('meta[name="robots"]').content = metadata.canonical ? 'index, follow' : 'noindex, nofollow';

  document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][data-seo]').forEach(element => element.remove());
  if (metadata.canonical) {
    setLink('canonical', metadata.canonical);
    Object.entries(metadata.hreflang).forEach(([locale, href]) => {
      const element = document.createElement('link');
      element.rel = 'alternate'; element.hreflang = locale; element.href = href; element.dataset.seo = 'true';
      document.head.appendChild(element);
    });
  }

  document.head.querySelectorAll('script[data-seo-jsonld]').forEach(element => element.remove());
  const origin = metadata.canonical ? new URL(metadata.canonical).origin : null;
  if (origin) {
    const homeUrl = routeUrl(origin, metadata.route.locale, { page: 'home' });
    const items = [{ '@type': 'ListItem', position: 1, name: 'SHANTUI Afghanistan', item: homeUrl }];
    if (metadata.route.page !== 'home') items.push({ '@type': 'ListItem', position: 2, name: metadata.title.split(' | ')[0], item: metadata.canonical });
    const script = document.createElement('script');
    script.type = 'application/ld+json'; script.dataset.seoJsonld = 'true';
    script.textContent = JSON.stringify([{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'SHANTUI Afghanistan', url: origin }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }]);
    document.head.appendChild(script);
  }
  return metadata;
}
