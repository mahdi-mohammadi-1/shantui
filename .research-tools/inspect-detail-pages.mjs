import {chromium,devices} from 'playwright';
import fs from 'node:fs/promises';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const dir='docs/research-evidence/chrome';
const mobileOnly=process.argv.includes('--mobile');
const targets=mobileOnly?[
 ['60','https://www.shantuidobrasil.com.br/'],
 ['61','https://www.shantui-kazakhstan.com/'],
 ['62','https://www.everstarindustries.com/'],
 ['63','https://www.shantui-eu.com/service/inquiry.htm'],
 ['64','https://bagger2go.de/Angebot_anfordern']
]:[
 ['40','https://www.shantui-eu.com/product/excavator.htm'],
 ['41','https://www.shantui-eu.com/service/service-support.htm'],
 ['42','https://www.shantui-eu.com/service/parts-support.htm'],
 ['43','https://www.shantui-eu.com/service/inquiry.htm'],
 ['44','https://bagger2go.de/Angebot_anfordern'],
 ['45','https://prescott.co.ke/products/shantui/l55-b5-wheel-loader/'],
 ['46','https://prescott.co.ke/spare-parts/'],
 ['47','https://shantui.kg/katalog-2/'],
 ['48','https://shantui.kg/zapchasti/'],
 ['49','https://www.shantuidobrasil.com.br/equipamentos'],
 ['50','https://www.shantuidobrasil.com.br/pe%C3%A7as-de-reposi%C3%A7%C3%A3o'],
 ['51','https://www.shantui-sit.ru/services/Service/'],
 ['52','https://www.shantui-sit.ru/product/buldozery-shantui/gidromekhanicheskie-sd/sd22/'],
 ['53','https://shantuiperu.pe/contactenos/'],
 ['54','https://shantuiperu.pe/lista-de-maquinarias/']
];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
async function inspect([id,url]){
 const r={id,url,checkedAt:new Date().toISOString(),browser:'Google Chrome',browserVersion:browser.version(),failedRequests:[]};
 const context=await browser.newContext(mobileOnly?{...devices['Pixel 7'],viewport:{width:390,height:844}}:{viewport:{width:1440,height:1000}}),page=await context.newPage();
 page.on('requestfailed',req=>r.failedRequests.push({url:req.url(),error:req.failure()?.errorText}));
 try{
  let response;try{response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});}catch(e){if(page.url()==='about:blank'||!e.message.includes('Timeout'))throw e;r.navigationWarning=e.message;}
  await page.waitForTimeout(3000);
  r.status=response?.status();r.title=await page.title();r.finalUrl=page.url();r.text=await page.locator('body').innerText({timeout:5000});
  r.links=await page.locator('a').evaluateAll(as=>as.map(a=>({text:a.innerText.trim(),url:a.href})).filter(a=>a.text));
  r.fields=await page.locator('input,select,textarea').evaluateAll(xs=>xs.map(x=>({tag:x.tagName,type:x.type,name:x.name,placeholder:x.getAttribute('placeholder'),required:x.required})));
  if(mobileOnly){
   r.mobile=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,viewport:document.querySelector('meta[name=viewport]')?.content,buttons:[...document.querySelectorAll('button,[role=button]')].filter(x=>x.getBoundingClientRect().width).map(x=>({text:x.innerText,label:x.getAttribute('aria-label'),class:x.className}))}));
   await page.screenshot({path:`${dir}/${id}-mobile.jpg`,type:'jpeg',quality:75,timeout:10000});
   await page.screenshot({path:`${dir}/${id}-full.jpg`,fullPage:true,type:'jpeg',quality:65,timeout:10000});
   r.mobileColdLoad=true;
   const reject=page.getByRole('button',{name:'Ablehnen',exact:true});if(await reject.count())await reject.click();
   const menu=page.getByRole('button',{name:/Menü ausklappbar|Open menu|Open navigation|Открыть меню|Abrir menu/i}).first();
   if(await menu.count()){await menu.click();await page.waitForTimeout(400);await page.screenshot({path:`${dir}/${id}-menu.jpg`,type:'jpeg',quality:75,timeout:10000});r.menuClickAttempted=true;r.menuVisualVerification='Requires screenshot review; a dispatched click is not proof that a menu opened';}
   await fs.writeFile(`${dir}/${id}-site.json`,JSON.stringify(r,null,2));console.log(JSON.stringify({id,url,status:r.status,mobile:r.mobile,menuClickAttempted:r.menuClickAttempted}));await context.close();return;
  }
  r.desktop=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,font:getComputedStyle(document.body).fontFamily,fonts:document.fonts.status,images:[...document.images].filter(i=>i.getBoundingClientRect().width>0).map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0}))}));
  for(let step=0;step<8;step++){await page.evaluate(n=>scrollTo(0,n*innerHeight),step);await page.waitForTimeout(200);}
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${dir}/${id}-desktop.jpg`,type:'jpeg',quality:70,timeout:10000});
  await page.screenshot({path:`${dir}/${id}-full.jpg`,type:'jpeg',quality:65,fullPage:true,timeout:10000});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
  r.mobile=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  await page.screenshot({path:`${dir}/${id}-mobile.jpg`,type:'jpeg',quality:70,timeout:10000});
 }catch(e){r.error=e.message;}
 await fs.writeFile(`${dir}/${id}-site.json`,JSON.stringify(r,null,2));
 console.log(JSON.stringify({id,url,status:r.status,title:r.title,error:r.error}));await context.close();
}
let next=0;await Promise.all(Array.from({length:3},async()=>{while(next<targets.length)await inspect(targets[next++]);}));
await browser.close();
