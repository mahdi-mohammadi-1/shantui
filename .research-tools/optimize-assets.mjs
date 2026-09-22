import fs from 'node:fs/promises';
import {createCanvas,loadImage} from '@napi-rs/canvas';
await fs.mkdir('public/images',{recursive:true});
const items=[...['bulldozer','excavator','loader','compactor','grader','truck'].flatMap(id=>[{id,file:`${id}.png`,width:640},{id:`${id}-small`,file:`${id}.png`,width:320}]),...['work-mine','work-road','work-earth','parts'].map(id=>({id,file:`${id}.jpg`,width:800})),{id:'hero',file:'hero-candidate.jpg',width:1920},{id:'hero-mobile',file:'hero-candidate.jpg',width:1000}];
const sizes=[];
for(const item of items){const img=await loadImage(`docs/prototype-assets/${item.file}`);const width=Math.min(item.width,img.width),height=Math.round(img.height*width/img.width);const canvas=createCanvas(width,height);canvas.getContext('2d').drawImage(img,0,0,width,height);const data=canvas.toBuffer('image/webp',82);await fs.writeFile(`public/images/${item.id}.webp`,data);sizes.push({id:item.id,width,height,bytes:data.length});}
await fs.writeFile('docs/prototype-assets/optimized.json',JSON.stringify(sizes,null,2));console.log(sizes);
