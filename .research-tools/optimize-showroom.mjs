import fs from 'node:fs/promises';
import { createCanvas, loadImage } from '@napi-rs/canvas';

// Re-encode existing manufacturer sources at their native size for the large hero.
// No new imagery, geometry changes or upscaling.
const result = [];
for (const name of ['bulldozer', 'excavator', 'loader']) {
  const source = `docs/prototype-assets/${name}.png`;
  const img = await loadImage(source);
  const canvas = createCanvas(img.width, img.height);
  canvas.getContext('2d').drawImage(img, 0, 0);
  const buffer = canvas.toBuffer('image/webp', 90);
  const output = `public/images/${name}-showroom.webp`;
  await fs.writeFile(output, buffer);
  result.push({ source, output, width: img.width, height: img.height, bytes: buffer.length });
}
await fs.writeFile('docs/prototype-assets/showroom-optimized.json', JSON.stringify(result, null, 2));
console.log(result);
