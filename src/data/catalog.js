// Preview fixtures. Replace through the content provider once local data is approved.
// Model names are examples, not a statement of Afghanistan stock or assortment.
export const categories = [
  { id: 'bulldozers', image: 'bulldozer', label: { en: 'Bulldozers', fa: 'بلدوزرها' }, source: 'https://www.shantui-eu.com/product/bulldozer.htm' },
  { id: 'excavators', image: 'excavator', label: { en: 'Excavators', fa: 'اکسکاواتورها' }, source: 'https://www.shantui-eu.com/product/excavator.htm' },
  { id: 'loaders', image: 'loader', label: { en: 'Wheel loaders', fa: 'لودرهای چرخ‌دار' }, source: 'https://www.shantui-eu.com/product/wheel-loader.htm' },
  { id: 'compactors', image: 'compactor', label: { en: 'Compactors', fa: 'رولرها و کمپکتورها' }, source: 'https://www.shantui-eu.com/product/compactor.htm' },
  { id: 'graders', image: 'grader', label: { en: 'Motor graders', fa: 'گریدرها' }, source: 'https://www.shantui-eu.com/product/motor-grader.htm' },
  { id: 'trucks', image: 'truck', label: { en: 'Mining trucks', fa: 'موترهای معدنی' }, source: 'https://en.shantui-africa.com/product/mining-truck.htm' },
];
export const products = [
  { id: 'sd22', model: 'SD22', category: 'bulldozers', application: 'earth', image: 'bulldozer' },
  { id: 'se220lc', model: 'SE220LC', category: 'excavators', application: 'excavation', image: 'excavator' },
  { id: 'l55-b5', model: 'L55-B5', category: 'loaders', application: 'loading', image: 'loader' },
  { id: 'sr22', model: 'SR22', category: 'compactors', application: 'compaction', image: 'compactor' },
  { id: 'sg21', model: 'SG21', category: 'graders', application: 'grading', image: 'grader' },
  { id: 'mining-range', model: null, category: 'trucks', application: 'hauling', image: 'truck' },
].map(product => ({ ...product, provenance: 'sample', availability: 'contact', specifications: [], brochure: null }));

export const contentProvider = {
  categories,
  products,
  getCategory: id => categories.find(category => category.id === id),
  getProducts: category => category === 'all' ? products : products.filter(product => product.category === category),
};

export const imagePath = (name, size = '') => `/images/${name}${size ? `-${size}` : ''}.webp`;
