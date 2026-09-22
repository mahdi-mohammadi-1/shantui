import {chromium} from 'playwright';
import fs from 'node:fs/promises';
// Capture the page as currently rendered even if third-party font requests stall.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const dir='docs/research-evidence/chrome';
await fs.mkdir(dir,{recursive:true});
const urls=JSON.parse(await fs.readFile('docs/research-evidence/strategy-urls.json','utf8')).filter(u=>!['https://www.shantui','https://en.shantui','https://www.a','https://www.linkedin.com/company/shantui'].includes(u));
const start=Number(process.argv[2]||0), end=Number(process.argv[3]||24);
const selected=process.argv[4]?.split(',').map(Number);
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];
async function inspect(i){
 const url=urls[i]; const id=String(i+1).padStart(2,'0');
 if(selected&&!selected.includes(i+1))return;
 try{const old=JSON.parse(await fs.readFile(`${dir}/${id}-site.json`,'utf8'));await fs.access(`${dir}/${id}-mobile.jpg`);if(old.status===200&&!old.error){console.log(`${id}: existing successful capture retained`);return;}}catch{}
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 const r={id,url,checkedAt:new Date().toISOString(),browser:'Google Chrome',browserVersion:browser.version()};
 let bytes=0,requests=0;
 page.on('response',res=>{requests++;const size=Number(res.headers()['content-length']);if(size)bytes+=size;});
 try{
  let response;
  try{response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:25000});}
  catch(e){if(page.url()==='about:blank'||!e.message.includes('Timeout'))throw e;r.navigationWarning=e.message;}
  await page.waitForTimeout(2500);
  r.status=response?.status();r.finalUrl=page.url();r.title=await page.title();
  r.text=await page.locator('body').innerText({timeout:5000});
  r.links=await page.locator('a').evaluateAll(as=>as.map(a=>({text:a.innerText.trim(),url:a.href})).filter(a=>a.text));
  r.desktop=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,font:getComputedStyle(document.body).fontFamily}));
  r.fontStatus=await page.evaluate(()=>document.fonts.status);
  for(let step=0;step<6;step++){await page.evaluate(n=>scrollTo(0,n*innerHeight),step);await page.waitForTimeout(180);}
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${dir}/${id}-desktop.jpg`,type:'jpeg',quality:65,timeout:10000});
  await page.screenshot({path:`${dir}/${id}-full.jpg`,fullPage:true,type:'jpeg',quality:60,timeout:10000});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
  r.mobile=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('button')].filter(x=>x.getBoundingClientRect().width).map(x=>({text:x.innerText,label:x.getAttribute('aria-label')}))}));
  await page.screenshot({path:`${dir}/${id}-mobile.jpg`,type:'jpeg',quality:65,timeout:10000});
  r.requestsObserved=requests;r.declaredResponseBytes=bytes;
 }catch(e){r.error=e.message;}
 await fs.writeFile(`${dir}/${id}-site.json`,JSON.stringify(r,null,2));
 results.push(r);console.log(JSON.stringify({id,url,status:r.status,title:r.title,error:r.error,textLength:r.text?.length}));
 await context.close();
}
let next=start;
await Promise.all(Array.from({length:3},async()=>{while(next<Math.min(end,urls.length)){await inspect(next++);}}));
await browser.close();
