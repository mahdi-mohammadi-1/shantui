import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { contentProvider as catalog, imagePath } from './data/catalog';
import { translations } from './data/translations';
import { showroomCopy } from './data/showroom';
import { pageCopy } from './data/pages';
import { updateSeo } from './seo';
import { useSiteNavigation } from './navigation';
import { InteriorPages } from './pages/InteriorPages';
import { ProductCard } from './components/ProductCard';
import { FlagshipHero as EditorialHero } from './components/FlagshipHero';
import { QuickLinks } from './components/QuickLinks';
import { SiteHeader } from './components/SiteHeader';
import './tailwind.css';

function initialLocale() {
  if (location.pathname.startsWith('/en-af')) return 'en';
  if (location.pathname.startsWith('/fa-af')) return 'fa';
  try { return localStorage.getItem('shantui-locale') === 'en' ? 'en' : 'fa'; } catch { return 'fa'; }
}
const startingLocale = initialLocale();
document.documentElement.lang = startingLocale === 'fa' ? 'fa-AF' : 'en-AF';
document.documentElement.dir = startingLocale === 'fa' ? 'rtl' : 'ltr';

function Icon({ name = 'arrow', className = '', size = 22 }) {
  const paths = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    diagonal: <><path d="M5 19 19 5M5 5h14v14" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    close: <><path d="m6 6 12 12M6 18 18 6" /></>,
    parts: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5l8 5 8-5M12 12.5V21M8 5.5l8 5v4" /></>,
    tool: <><path d="M14 6a5 5 0 0 0-6 6L3 17a2.8 2.8 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4 3-3Z" /></>,
    machine: <><path d="M3 15h11l5 3H3v-3ZM8 15V8h6v7M14 9l3-5 4 8-3 2M3 21h16M7 11h3" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    document: <><path d="M6 3h8l4 4v14H6V3ZM14 3v5h4M9 12h6M9 16h6" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    up: <><path d="M12 20V4M5 11l7-7 7 7" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    compare: <><path d="M5 4v16M12 4v16M19 4v16M2 8h6M9 16h6M16 10h6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    zoom: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M7 10.5h7M10.5 7v7" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${name === 'arrow' || name === 'diagonal' ? 'directional ' : ''}${className}`}>{paths[name] || paths.arrow}</svg>;
}

function MachineImage({ name, label, small = false, priority = false }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [name]);
  return failed ? <span className="image-fallback"><Icon name="machine" size={48} /><span>{label}</span></span> :
    <img src={imagePath(name, priority ? 'showroom' : small ? 'small' : '')} srcSet={`${imagePath(name, 'small')} 320w, ${imagePath(name)} 640w${priority ? `, ${imagePath(name, 'showroom')} 940w` : ''}`} sizes={priority ? '(max-width: 767px) 95vw, 65vw' : small ? '(max-width: 639px) 42vw, (max-width: 1000px) 28vw, 190px' : '(max-width: 639px) 90vw, (max-width: 1000px) 45vw, 400px'} alt={label} width="640" height="340" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onError={() => setFailed(true)} />;
}

function useShowroomMotion(routeKey) {
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const initialize = () => {
      observer?.disconnect();
      document.documentElement.classList.toggle('motion-ready', !motion.matches && 'IntersectionObserver' in window);
      if (motion.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.08 });
      document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    };
    initialize();
    motion.addEventListener('change', initialize);
    return () => { observer?.disconnect(); motion.removeEventListener('change', initialize); document.documentElement.classList.remove('motion-ready'); };
  }, [routeKey]);
}

function FlagshipHero({ locale, t, onExplore, onQuote, href }) {
  const [index, setIndex] = useState(0);
  const categories = catalog.categories.slice(0, 3);
  const category = categories[index];
  return <section className="hero flagship-hero" aria-labelledby="hero-title">
    <div className="hero-grid-lines" aria-hidden="true" />
    <div className="container flagship-inner">
      <div className="flagship-copy">
        <div className="eyebrow light"><span />{t.heroEyebrow}</div>
        <h1 id="hero-title"><span>{t.heroLine1}</span><em>{t.heroLine2}</em></h1>
        <p>{t.heroDescription}</p>
        <div className="hero-buttons"><a className="button primary" href={href('equipment')}>{t.viewEquipment}<Icon /></a><button className="hero-secondary" onClick={onQuote}>{t.quote}<Icon name="diagonal" size={18} /></button></div>
        <div className="hero-location"><Icon name="pin" size={16} /><span>{t.country}</span><span className="index-line" />{t.heroCategory}</div>
      </div>
      <div className="flagship-stage">
        <span className="stage-word" aria-hidden="true" key={`word-${index}`}>{t.heroWords[index]}</span>
        <div className="stage-orbit" aria-hidden="true" />
        <div className="hero-machine" key={category.id}><MachineImage name={category.image} label={`${category.label[locale]} — ${t.heroImageNote}`} priority /></div>
        <div className="stage-caption"><span className="stage-marker" aria-hidden="true" /><div aria-live="polite"><small>{t.heroCategory}</small><strong>{category.label[locale]}</strong></div><button onClick={() => onExplore(category.id)} className="stage-explore" aria-label={`${t.heroExplore}: ${category.label[locale]}`}><Icon name="diagonal" size={27} /></button></div>
        <span className="stage-image-note">{t.heroImageNote}</span>
      </div>
      <div className="flagship-bottom"><a href="#equipment" className="scroll-cue"><span aria-hidden="true">↓</span>{t.scrollExplore}</a><div className="hero-selector" role="group" aria-label={t.heroSelect}>{categories.map((item, i) => <button key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}><span className="selector-index">0{i + 1}</span><span>{item.label[locale]}</span><span className="selector-line" /></button>)}</div><div className="hero-step"><bdi>0{index + 1}<span> / 0{categories.length}</span></bdi><button className="icon-button" onClick={() => setIndex((index + 1) % categories.length)} aria-label={t.heroNext}><Icon /></button></div></div>
    </div>
  </section>;
}

function ModelPhoto({ product, t, name }) {
  const [zoomed, setZoomed] = useState(false);
  return <div className={`model-photo ${zoomed ? 'is-zoomed' : ''}`}><button className="model-zoom" onClick={() => setZoomed(!zoomed)} aria-label={zoomed ? t.unzoom : t.zoom} aria-pressed={zoomed}><MachineImage name={product.image} label={`${name} — ${t.sampleCard}`} /><span className="zoom-indicator"><Icon name="zoom" /></span></button><p>{t.sampleCard}</p></div>;
}

function Comparison({ products, locale, t, onClose, onQuote }) {
  const nameOf = p => p.model || catalog.getCategory(p.category).label[locale];
  return <Dialog onClose={onClose} t={t} titleId="compare-title" className="compare-dialog"><div className="eyebrow"><span />{t.shortlist}</div><h2 id="compare-title" tabIndex="-1" data-initial-focus>{t.compareTitle}</h2><p className="dialog-intro">{t.compareIntro}</p><div className="comparison-scroll" tabIndex="0" role="region" aria-label={t.compareTitle}><table className="comparison-table"><caption className="sr-only">{t.compareTitle}</caption><thead><tr><th scope="col">{t.machine}</th>{products.map(p => <th key={p.id} scope="col"><MachineImage name={p.image} label={nameOf(p)} small /><bdi>{nameOf(p)}</bdi></th>)}</tr></thead><tbody>{[
    [t.category, p => catalog.getCategory(p.category).label[locale]],
    [t.application, p => t.apps[p.application]],
    [t.availability, () => t.available],
    [t.specs, () => t.technicalNote],
  ].map(([label, value]) => <tr key={label}><th scope="row">{label}</th>{products.map(p => <td key={p.id}>{value(p)}</td>)}</tr>)}<tr><th scope="row">{t.quote}</th>{products.map(p => <td key={p.id}><button className="button primary" onClick={() => onQuote('quote', nameOf(p))}>{t.quote}<Icon size={17} /></button></td>)}</tr></tbody></table></div><p className="model-disclaimer"><Icon name="info" size={18} />{t.modelDisclaimer}</p></Dialog>;
}

function Dialog({ children, onClose, titleId, t, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.querySelector('[data-initial-focus]')?.focus();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} className={`dialog ${className}`} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === ref.current) { const r = ref.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); } }}>
    <button className="dialog-close icon-button" onClick={onClose} aria-label={t.close}><Icon name="close" /></button>
    {children}
  </dialog>;
}

function RequestForm({ kind, model, message = '', locale, t, onClose, inline = false }) {
  const [values, setValues] = useState({ name: '', phone: '', province: '', machine: model || '', message, identifier: '', stopped: 'unknown' });
  const [errors, setErrors] = useState({});
  const [reviewed, setReviewed] = useState(false);
  const resultRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => { if (reviewed) resultRef.current?.focus(); }, [reviewed]);
  function update(event) { const { name, value } = event.target; setValues(prev => ({ ...prev, [name]: value })); setErrors(prev => ({ ...prev, [name]: null })); }
  function submit(event) {
    event.preventDefault();
    const next = {};
    for (const field of ['name', 'phone', 'province', ...(kind === 'quote' ? [] : ['message'])]) if (!values[field].trim()) next[field] = t.required;
    const digits = values.phone.replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/\D/g, '');
    if (values.phone.trim() && digits.length < 7) next.phone = t.phoneError;
    setErrors(next);
    if (Object.keys(next).length) requestAnimationFrame(() => formRef.current?.elements.namedItem(Object.keys(next)[0])?.focus());
    else setReviewed(true);
  }
  function field(name, label, placeholder, optional = false, type = 'text') {
    return <div className="field"><label htmlFor={`request-${name}`}>{label}{optional && <span> ({t.optional})</span>}</label><input id={`request-${name}`} name={name} type={type} dir={type === 'tel' || name === 'identifier' ? 'ltr' : undefined} value={values[name]} onChange={update} placeholder={placeholder} autoComplete={name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'off'} aria-required={!optional} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]}</p>}</div>;
  }
  const Wrapper = inline ? 'section' : Dialog;
  return <Wrapper {...(inline ? { 'aria-labelledby': 'request-title' } : { onClose, t, titleId: 'request-title' })} className={inline ? 'inline-request request-dialog' : 'request-dialog'}>
    <div className="eyebrow"><span />{kind === 'quote' ? t.quote : kind === 'parts' ? t.requestParts : t.requestService}</div>
    <h2 id="request-title" tabIndex="-1" data-initial-focus>{t.requestTitles[kind]}</h2>
    {reviewed ? <div className="request-result" ref={resultRef} tabIndex="-1"><span className="result-icon"><Icon name="document" size={32} /></span><h3>{t.reviewed}</h3><p>{t.reviewedText}</p>{values.machine && <div className="request-context"><span>{t.selectedMachine}</span><bdi>{values.machine}</bdi></div>}<div className="button-row"><button className="button primary" onClick={onClose}>{t.done}<Icon name="check" /></button><button className="text-button" onClick={() => setReviewed(false)}>{t.editRequest}</button></div></div> : <>
      <p className="dialog-intro">{t.requestIntros[kind]}</p>
      <form ref={formRef} noValidate onSubmit={submit}>
        {Object.values(errors).some(Boolean) && <p className="error-summary" role="alert">{t.errors}</p>}
        <div className="form-grid">{field('name', t.name, t.namePlaceholder)}{field('phone', t.phone, t.phonePlaceholder, false, 'tel')}{field('province', t.province, t.locationPlaceholder)}
          <div className="field"><label htmlFor="request-machine">{t.machine}</label><select id="request-machine" name="machine" value={values.machine} onChange={update}><option value="">{t.helpChoose}</option>{model && !catalog.products.some(p => p.model === model) && <option value={model}>{model}</option>}{catalog.products.filter(p => p.model).map(p => <option key={p.id} value={p.model}>{p.model}</option>)}{catalog.categories.map(c => <option key={c.id} value={c.label[locale]}>{c.label[locale]}</option>)}</select></div>
          {kind === 'parts' && field('identifier', t.identifier, '', true)}
          {kind === 'service' && <div className="field"><label htmlFor="request-stopped">{t.stopped}</label><select id="request-stopped" name="stopped" value={values.stopped} onChange={update}><option value="unknown">{t.unknown}</option><option value="yes">{t.yes}</option><option value="no">{t.no}</option></select></div>}
          <div className="field full"><label htmlFor="request-message">{kind === 'parts' ? t.partDescription : kind === 'service' ? t.issue : t.message}{kind === 'quote' && <span> ({t.optional})</span>}</label><textarea id="request-message" name="message" rows="3" value={values.message} onChange={update} placeholder={t.messagePlaceholder} aria-required={kind !== 'quote'} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
        </div>
        <p className="form-notice"><Icon name="info" size={18} />{t.formNotice}</p>
        <button className="button primary form-submit" type="submit">{t.previewRequest}<Icon /></button>
      </form>
    </>}
  </Wrapper>;
}

function App() {
  const { route, navigate, href } = useSiteNavigation(startingLocale);
  const locale = route.locale;
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(null);
  const [query, setQuery] = useState('');
  const [comparison, setComparison] = useState([]);
  const t = { ...translations[locale], ...showroomCopy[locale] };
  useShowroomMotion(route.pathname);
  const matchingProducts = catalog.getProducts(filter).filter(p => {
    const category = catalog.getCategory(p.category);
    return [p.model, category.label.en, category.label.fa, t.apps[p.application]].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
  });
  const visibleProducts = matchingProducts.slice(0, filter === 'all' && !expanded && !query.trim() ? 3 : undefined);
  const comparedProducts = comparison.map(id => catalog.products.find(p => p.id === id));
  function toggleCompare(id) { setComparison(current => current.includes(id) ? current.filter(item => item !== id) : current.length < 3 ? [...current, id] : current); }
  useLayoutEffect(() => {
    document.documentElement.lang = locale === 'fa' ? 'fa-AF' : 'en-AF';
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    updateSeo({ route });
    try { localStorage.setItem('shantui-locale', locale); } catch { /* Optional preference only. */ }
  }, [locale, route.pathname]);
  useEffect(() => setModal(null), [route.pathname, route.search]);
  const close = () => setModal(null);
  const request = (kind = 'quote', model = '', message = '') => { close(); navigate(href('quote', { kind, ...(model ? { model } : {}), ...(message ? { message } : {}) })); };
  const changeLocale = () => { close(); navigate('/' + (locale === 'en' ? 'fa' : 'en') + '-af/' + route.segments.join('/') + (route.segments.length ? '/' : '') + route.search + route.hash); };
  function selectCategory(id) { navigate(href(id === 'all' ? 'equipment' : 'equipment/' + id)); }
  const nav = [['equipment', t.equipment], ['parts', t.parts], ['service', t.service], ['applications', pageCopy[locale].applications], ['company', t.company], ['contact', t.contact]];
  const ui = { Icon, MachineImage, ModelPhoto, RequestForm };
  const nameOf = p => p.model || catalog.getCategory(p.category).label[locale];
  return <>
    <a href="#main" className="skip-link">{t.skip}</a>
    <SiteHeader href={href} route={route} locale={locale} t={t} applicationsLabel={pageCopy[locale].applications} menuOpen={modal?.type === 'menu'} onChangeLocale={changeLocale} onRequestQuote={() => request()} onOpenMenu={() => setModal({ type: 'menu' })} />
    <main id="main" tabIndex="-1">{route.page === 'home' ? <>
      <EditorialHero href={href} locale={locale} t={t} onQuote={() => request()} MachineImage={MachineImage} Icon={Icon} />
      <QuickLinks href={href} t={t} Icon={Icon} />

      <section className="section equipment-section" id="equipment" aria-labelledby="equipment-title"><div className="container" data-reveal>
        <div className="section-heading"><div><div className="eyebrow"><span />{t.equipmentEyebrow}</div><h2 id="equipment-title">{t.equipmentTitle}</h2><p>{t.equipmentDescription}</p></div><button className="text-button" onClick={() => selectCategory('all')}>{t.allEquipment}<Icon /></button></div>
        <div className="category-grid">{catalog.categories.map((category, i) => <a key={category.id} className="category-tile" href={href(`equipment/${category.id}`)}><span className="category-number" aria-hidden="true">0{i + 1}</span><MachineImage name={category.image} label={category.label[locale]} small /><span className="category-label">{category.label[locale]}<Icon name="diagonal" size={18} /></span></a>)}</div>
      </div></section>

      <section className="section range-section" id="models" aria-labelledby="range-title"><div className="container">
        <div className="section-heading range-heading"><div><div className="eyebrow"><span />{t.rangeEyebrow}</div><h2 id="range-title">{t.rangeTitle}</h2></div><p>{t.rangeDescription}</p></div>
        <div className="range-toolbar"><div className="filter-list" role="group" aria-label={t.equipment}>{[{ id: 'all', label: { en: t.all, fa: t.all } }, ...catalog.categories].map(category => <button key={category.id} aria-pressed={filter === category.id} className={filter === category.id ? 'active' : ''} onClick={() => { setFilter(category.id); setExpanded(category.id !== 'all'); }}>{category.label[locale]}</button>)}</div></div>
        <div className="catalog-tools"><div className="catalog-search"><Icon name="search" size={20} /><label className="sr-only" htmlFor="catalog-search">{t.search}</label><input id="catalog-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.searchPlaceholder} />{query && <button onClick={() => { setQuery(''); document.getElementById('catalog-search').focus(); }} aria-label={t.clearSearch}><Icon name="close" size={18} /></button>}</div><span className="catalog-count" role="status"><bdi>{String(visibleProducts.length).padStart(2, '0')}</bdi> {t.browseCount}</span><span className="sample-label"><span />{t.sample}</span></div>
        <div className="product-grid" key={filter}>{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} locale={locale} t={t} href={href} comparison={comparison} toggleCompare={toggleCompare} onQuote={request} ui={ui} />)}</div>
        {!visibleProducts.length && <div className="catalog-empty"><Icon name="search" size={32} /><h3>{t.noResults}</h3><button className="button outline" onClick={() => { setQuery(''); setFilter('all'); setExpanded(true); }}>{t.reset}<Icon /></button></div>}
        {filter === 'all' && !query.trim() && <div className="range-more"><button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? t.showLess : t.showAll}<Icon name="plus" /></button></div>}
        <div className="stock-callout" id="availability"><Icon name="pin" size={27} /><div><h3>{t.stockTitle}</h3><p>{t.stockText}</p></div><button className="button outline" onClick={() => request('quote', filter === 'all' ? '' : catalog.getCategory(filter).label[locale])}>{t.checkStock}<Icon size={18} /></button></div>
      </div></section>

      <div className="brand-ribbon" aria-hidden="true">{t.brandWords.map(word => <React.Fragment key={word}><span>{word}</span><Icon name="plus" size={30} /></React.Fragment>)}</div>
      <section className="section support-section" id="parts" aria-labelledby="support-title"><div className="container" data-reveal>
        <div className="support-heading"><div className="eyebrow light"><span />{t.supportEyebrow}</div><h2 id="support-title">{t.supportTitle1}<br /><span>{t.supportTitle2}</span></h2><p>{t.supportDescription}</p></div>
        <div className="support-grid"><figure className="support-photo"><img src="/images/parts.webp" alt={locale === 'en' ? 'Close-up of machinery gears and bearings, manufacturer reference image' : 'نمای نزدیک چرخ‌دنده‌ها و بلبرینگ ماشین‌آلات، تصویر مرجع تولیدکننده'} loading="lazy" width="800" height="671" /><figcaption>{t.partsImageCaption}</figcaption><span className="photo-corner" aria-hidden="true" /></figure><div className="support-options"><article><span className="support-panel-label">{t.supportPartsLabel}</span><span className="support-icon"><Icon name="parts" size={28} /></span><div><h3>{t.partsTitle}</h3><p>{t.partsText}</p><button className="support-link" onClick={() => request('parts')}>{t.requestParts}<Icon /></button></div></article><article id="service"><span className="support-panel-label">{t.supportServiceLabel}</span><span className="support-icon"><Icon name="tool" size={28} /></span><div><h3>{t.serviceTitle}</h3><p>{t.serviceText}</p><button className="support-link" onClick={() => request('service')}>{t.requestService}<Icon /></button></div></article><p className="support-note"><Icon name="info" size={16} />{t.supportNote}</p></div></div>
      </div></section>

      <section className="section applications-section" aria-labelledby="applications-title"><div className="container" data-reveal><div className="section-heading"><div><div className="eyebrow"><span />{t.applicationsEyebrow}</div><h2 id="applications-title">{t.applicationsTitle}</h2></div><p>{t.applicationsDescription}</p></div><div className="application-grid">{[
        { title: t.mining, text: t.miningText, image: 'work-mine', category: 'trucks' },
        { title: t.roads, text: t.roadsText, image: 'work-road', category: 'graders' },
        { title: t.infrastructure, text: t.infrastructureText, image: 'work-earth', category: 'bulldozers' },
      ].map((application, i) => <a className="application-card" key={application.image} href={href(`applications/${['mining', 'roads', 'infrastructure'][i]}`)}><div className="application-image"><img src={imagePath(application.image)} alt={`${application.title} — ${t.referencePhotos}`} loading="lazy" width="800" height="488" /><span aria-hidden="true">0{i + 1}</span></div><div className="application-copy"><h3>{application.title}</h3><p>{application.text}</p><span className="application-action">{t.exploreApplication}<Icon size={20} /></span></div></a>)}</div><p className="image-note">{t.referencePhotos}</p></div></section>

      <section className="section company-section" id="company" aria-labelledby="company-title"><div className="company-backdrop" aria-hidden="true"><img src="/images/work-earth.webp" alt="" loading="lazy" width="800" height="488" /></div><div className="container company-grid" data-reveal><div className="company-copy"><div className="eyebrow"><span />{t.companyEyebrow}</div><h2 id="company-title">{t.companyTitle}</h2><p>{t.companyDescription}</p><a className="text-button" href="https://www.shantui-global.com/" target="_blank" rel="noreferrer">{t.global}<Icon name="diagonal" size={18} /></a><p className="company-note">{t.companyNote}</p></div><div className="company-process"><h3>{t.companyPanelTitle}</h3>{t.companySteps.map(([title, text], i) => <div className="process-step" key={i}><span aria-hidden="true">0{i + 1}</span><div><h4>{title}</h4><p>{text}</p></div></div>)}</div></div><div className="container company-caption">{t.referencePhotos}</div></section>

      <section className="quote-section" id="contact" aria-labelledby="quote-title"><div className="container quote-inner" data-reveal><div><div className="eyebrow"><span />{t.quoteEyebrow}</div><h2 id="quote-title">{t.quoteTitle}</h2><p>{t.quoteDescription}</p></div><div className="quote-actions"><button className="button primary" onClick={() => request()}>{t.quote}<Icon /></button><button className="text-button" onClick={() => navigate(href('downloads'))}><Icon name="document" size={18} />{t.downloads}</button><small>{t.quoteNote}</small></div></div></section>
    </> : <InteriorPages key={route.segments.join('/')} route={route} locale={locale} t={t} href={href} request={request} comparison={comparison} toggleCompare={toggleCompare} ui={ui} navigate={navigate} />}</main>

    <footer className="site-footer"><div className="container"><div className="footer-statement">{t.footerStatement}<Icon name="diagonal" size={70} /></div><div className="footer-grid"><div className="footer-brand"><a className="brand-plate" href={href()} aria-label={`SHANTUI ${t.country}`}><img src="/images/shantui-logo.png" alt="SHANTUI" width="180" height="39" /></a><span className="footer-country">{t.country}</span><p>{t.footerDescription}</p><a className="footer-contact" href={href('contact')}>{t.contactSales}<Icon size={18} /></a></div><div><h3>{t.footerEquipment}</h3>{catalog.categories.map(c => <a key={c.id} href={href(`equipment/${c.id}`)}>{c.label[locale]}</a>)}</div><div><h3>{t.footerSupport}</h3><a href={href('parts')}>{t.parts}</a><a href={href('service')}>{t.service}</a><a href={href('downloads')}>{t.downloads}</a><a href={href('availability')}>{t.checkStock}</a></div><div><h3>{t.footerCompany}</h3><a href={href('company')}>{t.about}</a><a href="https://www.shantui-global.com/" target="_blank" rel="noreferrer">{t.globalSite}<Icon name="diagonal" size={13} /></a><a href={href('contact')}>{t.contact}</a><a href={href('applications')}>{pageCopy[locale].applications}</a><a href={href('privacy')}>{t.privacy}</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SHANTUI Afghanistan <span className="footer-separator">/</span> {t.footerNote}</span><a href="#top">{t.backTop}<Icon name="up" size={17} /></a></div></div></footer>
    <div className="mobile-action-bar"><button onClick={() => request()}>{t.quote}<Icon size={18} /></button><button onClick={() => request('service')}><Icon name="tool" size={18} />{t.service}</button></div>

    {comparison.length > 0 && <aside className="compare-tray" aria-label={t.shortlist}><div className="tray-intro"><Icon name="compare" /><div><strong>{t.shortlist}</strong><span role="status">{comparison.length} / 3 {t.selected}</span></div></div><div className="tray-models">{comparedProducts.map(p => <button key={p.id} onClick={() => toggleCompare(p.id)} aria-label={`${t.removeCompare}: ${nameOf(p)}`}><img src={imagePath(p.image, 'small')} width="64" height="34" alt="" /><bdi>{nameOf(p)}</bdi><Icon name="close" size={14} /></button>)}</div><span className="tray-help" id="compare-help">{comparison.length < 2 ? t.compareNeed : comparison.length === 3 ? t.compareLimit : ''}</span><button className="button primary" disabled={comparison.length < 2} aria-describedby="compare-help" onClick={() => setModal({ type: 'compare' })}>{t.compare}<span>({comparison.length})</span><Icon /></button><button className="icon-button tray-clear" onClick={() => setComparison([])} aria-label={t.clearCompare}><Icon name="close" /></button></aside>}

    {modal?.type === 'menu' && <Dialog onClose={close} t={t} titleId="menu-title" className="menu-dialog"><h2 id="menu-title">{t.country}</h2><nav>{nav.map(([id, label], i) => <a key={id} href={href(id)} onClick={close}><span>0{i + 1}</span>{label}<Icon /></a>)}</nav><button className="button primary" onClick={() => request()}>{t.quote}<Icon /></button><button className="language-button" onClick={changeLocale}><Icon name="globe" />{locale === 'en' ? 'دری' : 'English'}</button></Dialog>}
    {modal?.type === 'request' && <RequestForm key={`${modal.kind}-${modal.model}`} {...modal} locale={locale} t={t} onClose={close} />}
    {modal?.type === 'compare' && <Comparison products={comparedProducts} locale={locale} t={t} onClose={close} onQuote={request} />}
    {modal?.type === 'product' && <Dialog onClose={close} t={t} titleId="product-title" className="model-dialog"><div className="eyebrow"><span />{t.modelPreview}</div><div className="model-grid"><ModelPhoto product={modal.product} t={t} name={nameOf(modal.product)} /><div><p className="product-category">{catalog.getCategory(modal.product.category).label[locale]}</p><h2 id="product-title" tabIndex="-1" data-initial-focus><bdi>{nameOf(modal.product)}</bdi></h2><span className="availability-label"><span />{t.available}</span><p className="model-description">{t.apps[modal.product.application]}</p><dl className="model-facts"><div><dt>{t.category}</dt><dd>{catalog.getCategory(modal.product.category).label[locale]}</dd></div><div><dt>{t.specs}</dt><dd>{t.specsPending}</dd></div></dl><button className="button primary" onClick={() => request('quote', nameOf(modal.product))}>{t.quote}<Icon /></button><button className="text-button model-document" onClick={() => request('quote', nameOf(modal.product), t.requestSubject)}><Icon name="document" size={18} />{t.brochure}</button></div></div><p className="model-disclaimer"><Icon name="info" size={18} />{t.modelDisclaimer}</p><div className="model-bottom"><a href={catalog.getCategory(modal.product.category).source} target="_blank" rel="noreferrer">{t.manufacturerSource}<Icon name="diagonal" size={16} /></a><button onClick={() => request('parts', nameOf(modal.product))}>{t.requestParts}<Icon size={16} /></button></div></Dialog>}
    {(modal?.type === 'documents' || modal?.type === 'privacy') && <Dialog onClose={close} t={t} titleId="info-title" className="information-dialog"><span className="information-icon"><Icon name={modal.type === 'documents' ? 'document' : 'info'} size={36} /></span><h2 id="info-title" tabIndex="-1" data-initial-focus>{modal.type === 'documents' ? t.documentsTitle : t.privacyTitle}</h2><p>{modal.type === 'documents' ? t.documentsText : t.privacyText}</p>{modal.type === 'documents' && <button className="button primary" onClick={() => request('quote', '', t.requestSubject)}>{t.brochure}<Icon /></button>}</Dialog>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
