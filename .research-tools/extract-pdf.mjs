import fs from 'node:fs/promises';
import {getDocument} from 'pdfjs-dist/legacy/build/pdf.mjs';
const path='docs/Shantui_Afghanistan_Website_Strategy_2026.pdf';
const pdf=await getDocument({data:new Uint8Array(await fs.readFile(path)),useSystemFonts:true}).promise;
const pages=[], urls=new Set();
for(let i=1;i<=pdf.numPages;i++){
 const page=await pdf.getPage(i);
 const content=await page.getTextContent();
 const text=content.items.map(x=>x.str+(x.hasEOL?'\n':' ')).join('');
 for(const a of await page.getAnnotations()) if(a.url) urls.add(a.url);
 for(const u of text.match(/https?:\/\/[^\s<>]+/g)||[]) urls.add(u);
 pages.push({page:i,text});
}
await fs.mkdir('docs/research-evidence',{recursive:true});
await fs.writeFile('docs/research-evidence/strategy-extracted.txt',pages.map(p=>`\n=== PAGE ${p.page} ===\n${p.text}`).join('\n'));
await fs.writeFile('docs/research-evidence/strategy-urls.json',JSON.stringify([...urls],null,2));
console.log(JSON.stringify({pages:pdf.numPages,urls:[...urls]}));
