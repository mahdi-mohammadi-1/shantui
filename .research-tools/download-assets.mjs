import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const base='https://www.shantui-eu.com/upload/images/';
const items=[
 ['bulldozer','2023/06/27/d10450c2fe314b629fb108781cfa88f5.png'],
 ['excavator','2023/06/26/3d219014fb5a4872a850b5df14473060.png'],
 ['loader','2023/06/26/a6da6a2ee84a4551b29142238018b219.png'],
 ['compactor','2023/06/27/30a2b5ac2cd5462fbe5ae708efe8d45d.png'],
 ['grader','2023/06/27/398e1741c8d94beb9a7a23b184b6c5e8.png'],
 ['truck','https://en.shantui-africa.com/upload/images/2023/06/27/b9d8ae4fabf14768be6d96c90685a306.png'],
 ['work-mine','2023/06/15/3636dbf45e1c43a98c347dff8772c781.jpg'],
 ['work-road','2023/06/15/5dc6b87902024dff9d9baddbac05cd97.jpg'],
 ['work-earth','2023/06/15/2f60b04172bd49db8c4ae60130e4a8d9.jpg'],
 ['hero-candidate','2023/07/29/4d793d72fb1c46c3bd3b564b901191a8.jpg'],
 ['hero-candidate-2','2023/07/14/10a87d8bd69245dfbb3ed0363bd0a216.jpg'],
 ['parts','2023/07/27/7aeb9178bbff4d7aa5f0b2ca0b8d0c18.jpg']
];
await fs.mkdir('docs/prototype-assets',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
let next=0;const manifest=[];
await Promise.all(Array.from({length:3},async()=>{while(next<items.length){const [id,path]=items[next++],url=path.startsWith('http')?path:base+path;const page=await browser.newPage();try{const response=await page.goto(url,{waitUntil:'load',timeout:35000});if(!response?.ok())throw Error(`HTTP ${response?.status()}`);const data=await response.body();await fs.writeFile(`docs/prototype-assets/${id}.${path.endsWith('png')?'png':'jpg'}`,data);manifest.push({id,url,bytes:data.length,rights:'Manufacturer reference image; local design preview only. Publication permission pending.'});console.log(id+' '+data.length);}catch(e){console.log(id+' '+e.message);manifest.push({id,url,error:e.message});}await page.close();}}));
await fs.writeFile('docs/prototype-assets/sources.json',JSON.stringify(manifest,null,2));await browser.close();
