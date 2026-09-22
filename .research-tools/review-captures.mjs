import fs from 'node:fs/promises';
import {createCanvas,loadImage} from '@napi-rs/canvas';
const dir='docs/research-evidence/chrome';
const ids=process.argv.slice(2);
const canvas=createCanvas(1500,ids.length*560),ctx=canvas.getContext('2d');
ctx.fillStyle='#ddd';ctx.fillRect(0,0,canvas.width,canvas.height);
for(let i=0;i<ids.length;i++){
 const id=ids[i],y=i*560;
 const record=JSON.parse(await fs.readFile(`${dir}/${id}-site.json`,'utf8'));
 ctx.fillStyle='#111';ctx.font='20px Arial';ctx.fillText(`${id} ${record.url}`,12,y+24);
 for(const [name,x,w] of [['desktop',10,740],['mobile',765,235]]){
  try{const img=await loadImage(`${dir}/${id}-${name}.jpg`);ctx.drawImage(img,x,y+35,w,Math.min(510,w*img.height/img.width));}catch{}
 }
 try{const img=await loadImage(`${dir}/${id}-full.jpg`);const w=480,h=Math.min(510,img.height*w/img.width);const srcHeight=h*img.width/w;ctx.drawImage(img,0,Math.max(0,img.height-srcHeight),img.width,srcHeight,1010,y+35,w,h);}catch{}
}
const dest=`${dir}/review-${ids.join('-')}.jpg`;
await fs.writeFile(dest,canvas.toBuffer('image/jpeg',85));console.log(dest);
