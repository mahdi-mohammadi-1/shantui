import React from 'react';
import { contentProvider as catalog } from '../data/catalog';

export function ProductCard({ product, locale, t, href, comparison, toggleCompare, onQuote, ui, index = 0 }) {
  const { Icon, MachineImage } = ui;
  const name = product.model || catalog.getCategory(product.category).label[locale];
  const selected = comparison.includes(product.id);
  return <article className={`product-card ${selected ? 'is-compared' : ''}`} style={{ '--card-index': index }}>
    <div className="product-topline"><span className="product-category">{catalog.getCategory(product.category).label[locale]}</span><button className="compare-toggle" aria-label={`${selected ? t.removeCompare : t.addCompare}: ${name}`} aria-pressed={selected} disabled={comparison.length === 3 && !selected} onClick={() => toggleCompare(product.id)}><Icon name={selected ? 'check' : 'plus'} size={16} /><span>{t.compare}</span></button></div>
    <a className="product-image" href={href(`models/${product.id}`)} aria-label={`${t.viewModel} ${name}`}><span className="product-stage-code" aria-hidden="true">{product.model || 'MINING'}</span><MachineImage name={product.image} label={`${name} — ${t.sampleCard}`} /><span className="product-image-action"><Icon name="diagonal" /></span></a>
    <div className="product-body"><span className="availability-label"><span />{t.available}</span><h3><a href={href(`models/${product.id}`)}><bdi>{name}</bdi><Icon name="diagonal" /></a></h3><p>{t.apps[product.application]}</p><div className="product-card-bottom"><a className="product-view" href={href(`models/${product.id}`)}>{t.modelDetails}<Icon size={17} /></a><button className="product-quote" onClick={() => onQuote('quote', name)}>{t.quote}<Icon size={17} /></button></div></div>
  </article>;
}
