import React from 'react';

function GlobeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c-2.6 2.45-3.9 5.28-3.9 8.5s1.3 6.05 3.9 8.5c2.6-2.45 3.9-5.28 3.9-8.5S14.6 5.95 12 3.5Z" /></svg>;
}

function MenuIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="size-5"><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 directional"><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
}

export function SiteHeader({ href, route, locale, t, applicationsLabel, menuOpen, onChangeLocale, onRequestQuote, onOpenMenu }) {
  const navItems = [
    ['equipment', t.equipment],
    ['parts', t.parts],
    ['service', t.service],
    ['applications', applicationsLabel],
    ['company', t.company],
    ['contact', t.contact],
  ];
  const isCurrent = id => route.page === id || (id === 'equipment' && route.page === 'models');

  return <>
    <div className="bg-industrial px-gutter text-[9px] leading-none tracking-[0.08em] text-white/70 sm:text-[10px]">
      <div className="mx-auto flex min-h-7 max-w-site items-center gap-3">
        <span className="border-e border-white/20 pe-3 font-bold tracking-[0.15em] text-white">{t.preview}</span>
        <span className="truncate">{t.previewNote}</span>
      </div>
    </div>
    <header className="site-header !sticky !top-0 !z-30 !border-b !border-rule !bg-white/95 !backdrop-blur" id="top">
      <div className="mx-auto flex min-h-[76px] max-w-site items-center gap-3 px-5 sm:px-10 xl:min-h-[84px] xl:gap-7">
        <a href={href()} aria-label={`SHANTUI ${t.country}`} className="flex min-h-11 shrink-0 flex-col justify-center">
          <img src="/images/shantui-logo.png" width="180" height="39" alt="SHANTUI" className="h-auto w-[144px] sm:w-[160px]" />
          <span className="mt-1 text-[8px] font-semibold tracking-[0.2em] text-steel">{t.country}</span>
        </a>
        <nav aria-label={t.menu} className="ms-auto hidden items-stretch self-stretch xl:flex">
          {navItems.map(([id, label]) => <a key={id} href={href(id)} aria-current={isCurrent(id) ? 'page' : undefined} className="relative flex min-h-11 items-center px-3 text-[12px] font-semibold text-industrial transition-colors hover:text-brand after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100 aria-[current=page]:text-brand aria-[current=page]:after:scale-x-100 2xl:px-4">{label}</a>)}
        </nav>
        <div className="ms-auto flex items-center gap-1.5 sm:gap-2 xl:ms-0">
          <button type="button" onClick={onChangeLocale} aria-label={locale === 'en' ? 'تغییر زبان به دری' : 'Switch to English'} data-header-language className="inline-flex min-h-11 items-center gap-2 px-2 text-[12px] font-bold text-industrial transition-colors hover:text-brand"><GlobeIcon /><span lang={locale === 'en' ? 'fa-AF' : 'en'}>{locale === 'en' ? 'دری' : 'EN'}</span></button>
          <button type="button" onClick={onRequestQuote} className="hidden min-h-11 items-center gap-3 bg-brand px-4 text-[12px] font-bold text-industrial transition-colors hover:bg-[#ff8b3d] sm:inline-flex"><span>{t.quote}</span><ArrowIcon /></button>
          <button type="button" onClick={onOpenMenu} aria-label={t.menu} aria-haspopup="dialog" aria-expanded={menuOpen} data-header-menu className="inline-grid size-11 place-items-center border border-rule text-industrial transition-colors hover:border-industrial hover:bg-paper xl:hidden"><MenuIcon /></button>
        </div>
      </div>
    </header>
  </>;
}
