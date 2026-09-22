import React, { useState } from 'react';
import { contentProvider as catalog } from '../data/catalog';

export function FlagshipHero({ locale, t, href, onQuote, MachineImage, Icon }) {
  const [index, setIndex] = useState(0);
  const categories = catalog.categories.slice(0, 3);
  const category = categories[index];
  return <section className="relative overflow-hidden bg-paper text-industrial" aria-labelledby="hero-title" data-hero>
    <div className="mx-auto max-w-site px-5 pt-10 sm:px-10 lg:pt-14">
      <div className="flex items-center justify-between border-b border-industrial/20 pb-4 text-[10px] font-bold tracking-widest">
        <span className="flex items-center gap-3"><span className="h-0.5 w-7 bg-brand" />{t.heroEyebrow}</span>
        <span className="hidden text-steel sm:block">{t.showroom}</span>
      </div>
      <div className="grid gap-6 pt-7 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
        <h1 id="hero-title" className={`font-bold tracking-tight ${locale === 'fa' ? 'text-4xl leading-[1.65] md:text-5xl' : 'text-5xl leading-[.95] sm:text-7xl lg:text-8xl'}`}>
          {t.heroLine1}<br /><span className="text-steel">{t.heroLine2}</span>
        </h1>
        <div className="max-w-md lg:pb-1"><p className="text-sm leading-relaxed text-steel sm:text-base">{t.heroDescription}</p><a href={href('equipment')} className="mt-5 inline-flex min-h-11 items-center gap-6 border-b-2 border-brand text-sm font-bold">{t.viewEquipment}<Icon /></a></div>
      </div>
      <div className="relative mt-4 flex h-64 items-center justify-center sm:h-96 lg:h-[400px]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-8 text-center font-display text-7xl font-bold leading-none tracking-tighter text-industrial/[.055] sm:text-[140px] lg:text-[180px]">{category.id === 'bulldozers' ? 'EARTHMOVING' : category.id === 'excavators' ? 'EXCAVATION' : 'LOADING'}</span>
        <div key={category.id} className="relative z-10 w-full max-w-[830px] [&_img]:h-64 [&_img]:w-full [&_img]:object-contain sm:[&_img]:h-96 lg:[&_img]:h-[420px] motion-safe:transition-transform motion-safe:duration-500"><MachineImage name={category.image} label={`${category.label[locale]} — ${t.heroImageNote}`} priority /></div>
        <span className="absolute bottom-2 start-0 hidden text-[10px] tracking-wide text-steel lg:block">{t.heroImageNote}</span>
        <a href={href(`equipment/${category.id}`)} aria-label={`${t.heroExplore}: ${category.label[locale]}`} className="absolute bottom-3 end-0 z-20 grid size-12 place-items-center border border-industrial/30 bg-paper hover:bg-brand"><Icon name="diagonal" /></a>
      </div>
      <div className="grid grid-cols-3 border-t border-industrial/20" role="group" aria-label={t.heroSelect}>
        {categories.map((item, i) => <button key={item.id} onClick={() => setIndex(i)} aria-pressed={index === i} className={`flex min-h-20 items-center justify-between gap-2 border-t-[3px] px-2 py-4 text-start sm:px-5 ${index === i ? 'border-brand bg-white/65' : 'border-transparent text-steel hover:bg-white/40'}`}><span><span className="mb-2 block font-display text-xs tabular-nums text-steel">0{i + 1}</span><span className="text-xs font-bold sm:text-sm">{item.label[locale]}</span></span><span className="hidden sm:block"><Icon name={index === i ? 'arrow' : 'plus'} size={18} /></span></button>)}
      </div>
    </div>
    <div className="bg-industrial px-5 py-4 text-white sm:px-10"><div className="mx-auto flex max-w-site items-center justify-between gap-4"><span className="text-xs leading-relaxed text-white/65">{t.heroImageNote} · {t.available}</span><button onClick={onQuote} className="inline-flex min-h-11 shrink-0 items-center gap-3 text-xs font-bold text-brand">{t.quote}<Icon size={18} /></button></div></div>
  </section>;
}
