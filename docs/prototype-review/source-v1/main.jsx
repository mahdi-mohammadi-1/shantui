import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { contentProvider as catalog, imagePath } from './data/catalog';
import { translations } from './data/translations';
import './styles.css';

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
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${name === 'arrow' || name === 'diagonal' ? 'directional ' : ''}${className}`}>{paths[name] || paths.arrow}</svg>;
}

function MachineImage({ name, label, small = false }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="image-fallback"><Icon name="machine" size={48} /><span>{label}</span></span> :
    <img src={imagePath(name, small ? 'small' : '')} srcSet={`${imagePath(name, 'small')} 320w, ${imagePath(name)} 640w`} sizes={small ? '(max-width: 639px) 42vw, (max-width: 1000px) 28vw, 190px' : '(max-width: 639px) 90vw, (max-width: 1000px) 45vw, 400px'} alt={label} width="640" height="340" loading="lazy" onError={() => setFailed(true)} />;
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

function RequestForm({ kind, model, message = '', locale, t, onClose }) {
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
  return <Dialog onClose={onClose} t={t} titleId="request-title" className="request-dialog">
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
  </Dialog>;
}

function App() {
  const [locale, setLocale] = useState(startingLocale);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(null);
  const t = translations[locale];
  const visibleProducts = catalog.getProducts(filter).slice(0, filter === 'all' && !expanded ? 3 : undefined);
  useLayoutEffect(() => {
    document.documentElement.lang = locale === 'fa' ? 'fa-AF' : 'en-AF';
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    document.title = locale === 'fa' ? 'SHANTUI افغانستان — ماشین‌آلات و خدمات تخنیکی' : 'SHANTUI Afghanistan — Equipment, Parts & Service';
    if (!location.pathname.startsWith(`/${locale}-af/`)) history.replaceState({}, '', `/${locale}-af/${location.hash}`);
    try { localStorage.setItem('shantui-locale', locale); } catch { /* Memory-only language choice remains usable. */ }
  }, [locale]);
  useEffect(() => { const onPop = () => setLocale(initialLocale()); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const close = () => setModal(null);
  const request = (kind = 'quote', model = '', message = '') => setModal({ type: 'request', kind, model, message });
  const changeLocale = () => { setLocale(current => current === 'en' ? 'fa' : 'en'); if (modal?.type === 'menu') close(); };
  function selectCategory(id) { setFilter(id); setExpanded(true); document.getElementById('models')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  const nav = [['equipment', t.equipment], ['availability', t.availability], ['parts', t.parts], ['service', t.service], ['company', t.company]];
  const nameOf = p => p.model || catalog.getCategory(p.category).label[locale];
  return <>
    <a href="#main" className="skip-link">{t.skip}</a>
    <div className="preview-bar"><div className="container"><span className="preview-tag">{t.preview}</span><span>{t.previewNote}</span><span className="preview-region"><Icon name="pin" size={13} />{t.country}</span></div></div>
    <header className="site-header" id="top"><div className="container header-inner">
      <a href="#top" className="brand" aria-label={`SHANTUI ${t.country}`}><img src="/images/shantui-logo.png" width="180" height="39" alt="SHANTUI" /><span>{t.country}</span></a>
      <nav className="desktop-nav" aria-label={t.menu}>{nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="header-actions"><button className="language-button" onClick={changeLocale} aria-label={locale === 'en' ? 'تغییر زبان به دری' : 'Switch to English'}><Icon name="globe" size={17} /><span lang={locale === 'en' ? 'fa-AF' : 'en'}>{locale === 'en' ? 'دری' : 'EN'}</span></button><button className="button primary header-quote" onClick={() => request()}>{t.quote}<Icon size={17} /></button><button className="icon-button menu-button" onClick={() => setModal({ type: 'menu' })} aria-label={t.menu}><Icon name="menu" /></button></div>
    </div></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-visual"><picture><source media="(max-width: 639px)" srcSet="/images/hero-mobile.webp" /><img src="/images/hero.webp" alt={locale === 'en' ? 'SHANTUI excavator moving earth in manufacturer reference imagery' : 'اکسکاواتور SHANTUI در حال خاک‌برداری در تصویر مرجع تولیدکننده'} width="1920" height="664" fetchPriority="high" /></picture><div className="hero-image-caption">{t.heroCaption}</div></div>
        <div className="container hero-inner"><div className="hero-copy"><div className="eyebrow light"><span />{t.heroEyebrow}</div><h1 id="hero-title">{t.heroLine1}<br /><em>{t.heroLine2}</em></h1><p>{t.heroDescription}</p><div className="hero-buttons"><button className="button primary" onClick={() => request()}>{t.quote}<Icon /></button><a className="hero-secondary" href="#equipment">{t.viewEquipment}<Icon name="diagonal" size={18} /></a></div><div className="hero-index"><span className="index-line" />{t.heroIndex}</div></div></div>
      </section>
      <div className="quick-links"><div className="container quick-grid">{[
        { icon: 'machine', title: t.quickEquipment, text: t.quickEquipmentText, href: '#equipment' },
        { icon: 'parts', title: t.quickParts, text: t.quickPartsText, action: () => request('parts') },
        { icon: 'tool', title: t.quickService, text: t.quickServiceText, action: () => request('service') },
      ].map((item, i) => { const Tag = item.href ? 'a' : 'button'; return <Tag key={item.icon} href={item.href} onClick={item.action} className="quick-item"><span className="quick-icon"><Icon name={item.icon} size={29} /></span><span className="quick-copy"><strong>{item.title}</strong><small>{item.text}</small></span><Icon className="quick-arrow" size={20} /></Tag>; })}</div></div>

      <section className="section equipment-section" id="equipment" aria-labelledby="equipment-title"><div className="container">
        <div className="section-heading"><div><div className="eyebrow"><span />{t.equipmentEyebrow}</div><h2 id="equipment-title">{t.equipmentTitle}</h2><p>{t.equipmentDescription}</p></div><button className="text-button" onClick={() => selectCategory('all')}>{t.allEquipment}<Icon /></button></div>
        <div className="category-grid">{catalog.categories.map((category, i) => <button key={category.id} className={`category-tile ${filter === category.id ? 'selected' : ''}`} onClick={() => selectCategory(category.id)} aria-pressed={filter === category.id}><span className="category-number" aria-hidden="true">0{i + 1}</span><MachineImage name={category.image} label={category.label[locale]} small /><span className="category-label">{category.label[locale]}<Icon name="diagonal" size={18} /></span></button>)}</div>
      </div></section>

      <section className="section range-section" id="models" aria-labelledby="range-title"><div className="container">
        <div className="section-heading range-heading"><div><div className="eyebrow"><span />{t.rangeEyebrow}</div><h2 id="range-title">{t.rangeTitle}</h2></div><p>{t.rangeDescription}</p></div>
        <div className="range-toolbar"><div className="filter-list" aria-label={t.equipment}>{[{ id: 'all', label: { en: t.all, fa: t.all } }, ...catalog.categories].map(category => <button key={category.id} aria-pressed={filter === category.id} className={filter === category.id ? 'active' : ''} onClick={() => { setFilter(category.id); setExpanded(category.id !== 'all'); }}>{category.label[locale]}</button>)}</div><span className="sample-label"><span />{t.sample}</span></div>
        <span className="sr-only" aria-live="polite">{visibleProducts.length} {t.rangeCount}</span>
        <div className="product-grid">{visibleProducts.map(product => <article className="product-card" key={product.id}><button className="product-image" onClick={() => setModal({ type: 'product', product })} aria-label={`${t.viewModel} ${nameOf(product)}`}><span className="product-label">SHANTUI</span><MachineImage name={product.image} label={`${nameOf(product)} — ${t.sampleCard}`} /></button><div className="product-body"><div className="product-category">{catalog.getCategory(product.category).label[locale]}</div><h3><button onClick={() => setModal({ type: 'product', product })}><bdi>{nameOf(product)}</bdi><Icon name="diagonal" /></button></h3><p>{t.apps[product.application]}</p><div className="product-card-bottom"><span className="availability-label"><span />{t.available}</span><button className="product-link" onClick={() => setModal({ type: 'product', product })} aria-label={`${t.viewModel} ${nameOf(product)}`}><Icon /></button></div></div></article>)}</div>
        {filter === 'all' && <div className="range-more"><button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? t.showLess : t.showAll}<Icon /></button></div>}
        <div className="stock-callout" id="availability"><Icon name="pin" size={27} /><div><h3>{t.stockTitle}</h3><p>{t.stockText}</p></div><button className="button outline" onClick={() => request('quote', filter === 'all' ? '' : catalog.getCategory(filter).label[locale])}>{t.checkStock}<Icon size={18} /></button></div>
      </div></section>

      <section className="section support-section" id="parts" aria-labelledby="support-title"><div className="container">
        <div className="support-heading"><div className="eyebrow light"><span />{t.supportEyebrow}</div><h2 id="support-title">{t.supportTitle1}<br /><span>{t.supportTitle2}</span></h2><p>{t.supportDescription}</p></div>
        <div className="support-grid"><figure className="support-photo"><img src="/images/parts.webp" alt={locale === 'en' ? 'Close-up of machinery gears and bearings, manufacturer reference image' : 'نمای نزدیک چرخ‌دنده‌ها و بلبرینگ ماشین‌آلات، تصویر مرجع تولیدکننده'} loading="lazy" width="800" height="671" /><figcaption>{t.partsImageCaption}</figcaption><span className="photo-corner" aria-hidden="true" /></figure><div className="support-options"><article><span className="support-icon"><Icon name="parts" size={28} /></span><div><h3>{t.partsTitle}</h3><p>{t.partsText}</p><button className="support-link" onClick={() => request('parts')}>{t.requestParts}<Icon /></button></div></article><article id="service"><span className="support-icon"><Icon name="tool" size={28} /></span><div><h3>{t.serviceTitle}</h3><p>{t.serviceText}</p><button className="support-link" onClick={() => request('service')}>{t.requestService}<Icon /></button></div></article><p className="support-note"><Icon name="info" size={16} />{t.supportNote}</p></div></div>
      </div></section>

      <section className="section applications-section" aria-labelledby="applications-title"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span />{t.applicationsEyebrow}</div><h2 id="applications-title">{t.applicationsTitle}</h2></div><p>{t.applicationsDescription}</p></div><div className="application-grid">{[
        { title: t.mining, text: t.miningText, image: 'work-mine', category: 'trucks' },
        { title: t.roads, text: t.roadsText, image: 'work-road', category: 'graders' },
        { title: t.infrastructure, text: t.infrastructureText, image: 'work-earth', category: 'bulldozers' },
      ].map((application, i) => <button className="application-card" key={application.image} onClick={() => selectCategory(application.category)}><div className="application-image"><img src={imagePath(application.image)} alt={`${application.title} — ${t.referencePhotos}`} loading="lazy" width="800" height="488" /><span aria-hidden="true">0{i + 1}</span></div><div className="application-copy"><h3>{application.title}</h3><p>{application.text}</p><span className="application-action">{t.exploreApplication}<Icon size={20} /></span></div></button>)}</div><p className="image-note">{t.referencePhotos}</p></div></section>

      <section className="section company-section" id="company" aria-labelledby="company-title"><div className="container company-grid"><div className="company-copy"><div className="eyebrow"><span />{t.companyEyebrow}</div><h2 id="company-title">{t.companyTitle}</h2><p>{t.companyDescription}</p><a className="text-button" href="https://www.shantui-global.com/" target="_blank" rel="noreferrer">{t.global}<Icon name="diagonal" size={18} /></a><p className="company-note">{t.companyNote}</p></div><div className="company-process"><h3>{t.companyPanelTitle}</h3>{t.companySteps.map(([title, text], i) => <div className="process-step" key={i}><span aria-hidden="true">0{i + 1}</span><div><h4>{title}</h4><p>{text}</p></div></div>)}</div></div></section>

      <section className="quote-section" id="contact" aria-labelledby="quote-title"><div className="container quote-inner"><div><div className="eyebrow"><span />{t.quoteEyebrow}</div><h2 id="quote-title">{t.quoteTitle}</h2><p>{t.quoteDescription}</p></div><div className="quote-actions"><button className="button primary" onClick={() => request()}>{t.quote}<Icon /></button><button className="text-button" onClick={() => setModal({ type: 'documents' })}><Icon name="document" size={18} />{t.downloads}</button><small>{t.quoteNote}</small></div></div></section>
    </main>

    <footer className="site-footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><a className="brand-plate" href="#top" aria-label={`SHANTUI ${t.country}`}><img src="/images/shantui-logo.png" alt="SHANTUI" width="180" height="39" /></a><span className="footer-country">{t.country}</span><p>{t.footerDescription}</p><button className="footer-contact" onClick={() => request()}>{t.contactSales}<Icon size={18} /></button></div><div><h3>{t.footerEquipment}</h3>{catalog.categories.slice(0, 5).map(c => <button key={c.id} onClick={() => selectCategory(c.id)}>{c.label[locale]}</button>)}</div><div><h3>{t.footerSupport}</h3><button onClick={() => request('parts')}>{t.requestParts}</button><button onClick={() => request('service')}>{t.requestService}</button><button onClick={() => setModal({ type: 'documents' })}>{t.downloads}</button><button onClick={() => request()}>{t.checkStock}</button></div><div><h3>{t.footerCompany}</h3><a href="#company">{t.about}</a><a href="https://www.shantui-global.com/" target="_blank" rel="noreferrer">{t.globalSite}<Icon name="diagonal" size={13} /></a><a href="#contact">{t.contact}</a><button onClick={() => setModal({ type: 'privacy' })}>{t.privacy}</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SHANTUI Afghanistan <span className="footer-separator">/</span> {t.footerNote}</span><a href="#top">{t.backTop}<Icon name="up" size={17} /></a></div></div></footer>
    <div className="mobile-action-bar"><button onClick={() => request()}>{t.quote}<Icon size={18} /></button><button onClick={() => request('service')}><Icon name="tool" size={18} />{t.service}</button></div>

    {modal?.type === 'menu' && <Dialog onClose={close} t={t} titleId="menu-title" className="menu-dialog"><h2 id="menu-title">{t.country}</h2><nav>{nav.map(([id, label], i) => <a key={id} href={`#${id}`} onClick={close}><span>0{i + 1}</span>{label}<Icon /></a>)}</nav><button className="button primary" onClick={() => request()}>{t.quote}<Icon /></button><button className="language-button" onClick={changeLocale}><Icon name="globe" />{locale === 'en' ? 'دری' : 'English'}</button></Dialog>}
    {modal?.type === 'request' && <RequestForm key={`${modal.kind}-${modal.model}`} {...modal} locale={locale} t={t} onClose={close} />}
    {modal?.type === 'product' && <Dialog onClose={close} t={t} titleId="product-title" className="model-dialog"><div className="eyebrow"><span />{t.modelPreview}</div><div className="model-grid"><div className="model-photo"><MachineImage name={modal.product.image} label={`${nameOf(modal.product)} — ${t.sampleCard}`} /><p>{t.sampleCard}</p></div><div><p className="product-category">{catalog.getCategory(modal.product.category).label[locale]}</p><h2 id="product-title" tabIndex="-1" data-initial-focus><bdi>{nameOf(modal.product)}</bdi></h2><span className="availability-label"><span />{t.available}</span><p className="model-description">{t.apps[modal.product.application]}</p><dl className="model-facts"><div><dt>{t.category}</dt><dd>{catalog.getCategory(modal.product.category).label[locale]}</dd></div><div><dt>{t.specs}</dt><dd>{t.specsPending}</dd></div></dl><button className="button primary" onClick={() => request('quote', nameOf(modal.product))}>{t.quote}<Icon /></button><button className="text-button model-document" onClick={() => request('quote', nameOf(modal.product), t.requestSubject)}><Icon name="document" size={18} />{t.brochure}</button></div></div><p className="model-disclaimer"><Icon name="info" size={18} />{t.modelDisclaimer}</p><div className="model-bottom"><a href={catalog.getCategory(modal.product.category).source} target="_blank" rel="noreferrer">{t.manufacturerSource}<Icon name="diagonal" size={16} /></a><button onClick={() => request('parts', nameOf(modal.product))}>{t.requestParts}<Icon size={16} /></button></div></Dialog>}
    {(modal?.type === 'documents' || modal?.type === 'privacy') && <Dialog onClose={close} t={t} titleId="info-title" className="information-dialog"><span className="information-icon"><Icon name={modal.type === 'documents' ? 'document' : 'info'} size={36} /></span><h2 id="info-title" tabIndex="-1" data-initial-focus>{modal.type === 'documents' ? t.documentsTitle : t.privacyTitle}</h2><p>{modal.type === 'documents' ? t.documentsText : t.privacyText}</p>{modal.type === 'documents' && <button className="button primary" onClick={() => request('quote', '', t.requestSubject)}>{t.brochure}<Icon /></button>}</Dialog>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
