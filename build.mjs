// TW Wealth - logo PNG transparente, papel timbrado e cartao de visitas (PDF).
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = path.resolve(here, '../../scratchpad_build/tw/tmp');
fs.mkdirSync(tmp, { recursive: true });
const CHROME = 'C:/Users/ServerRG/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe';
const BRAND = '#091235', LILAC = '#F2B84B', GREY = '#5b6280';
const FONT = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;800&display=swap" rel="stylesheet">`;
const banker = { slug: 'tiago-westarb', nome: 'Tiago Westarb', email: 'contato@tiagowestarb.com.br', tel: '+55 (47) 99146-4198' };

// icone: "T" que e farol (travessa = horizonte, haste afilada = torre) com a luz (ambar) no topo = um so plano que guia
const mark = (a = BRAND, b = LILAC) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="mark">
<rect x="12" y="26" width="76" height="14" rx="7" fill="${a}"/>
<path d="M43 40 H57 L65 92 H35 Z" fill="${a}"/>
<circle cx="50" cy="11" r="7" fill="${b}"/>
<path d="M33 11 H40 M60 11 H67" stroke="${b}" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;
const lockupCss = (ink, sub) => `.lockup{display:inline-flex;align-items:center;gap:.3em;font-family:'Plus Jakarta Sans',sans-serif}
.lockup .mark{height:1em;width:1em;flex:none}.lockup .t{display:flex;flex-direction:column;line-height:1;align-items:flex-start}
.lockup .n{font-weight:800;letter-spacing:.1em;color:${ink};font-size:.64em;margin-right:-.1em}
.lockup .w{font-weight:400;color:${sub};font-size:.27em;letter-spacing:.42em;margin-top:.42em;text-transform:lowercase}`;
const lockup = (a, b) => `<div class="lockup">${mark(a, b)}<div class="t"><span class="n">TW</span><span class="w">wealth</span></div></div>`;

const browser = await puppeteer.launch({ headless: true, executablePath: CHROME });
const open = async (html, name, vp) => {
  const f = path.join(tmp, name); fs.writeFileSync(f, html);
  const p = await browser.newPage(); if (vp) await p.setViewport(vp);
  await p.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 400)); return p;
};
async function logoPng(file, a, b, ink, sub) {
  const html = `<!doctype html><meta charset="utf-8">${FONT}<style>html,body{margin:0;background:transparent}#stage{display:inline-block;padding:44px 56px 40px;font-size:300px}${lockupCss(ink, sub)}</style><div id="stage">${lockup(a, b)}</div>`;
  const p = await open(html, 'logo.html', { width: 2800, height: 1000, deviceScaleFactor: 2 });
  await (await p.$('#stage')).screenshot({ path: path.join(here, file), omitBackground: true }); await p.close();
}
await logoPng('tw-wealth-logo.png', BRAND, LILAC, BRAND, GREY);
await logoPng('tw-wealth-logo-branco.png', '#ffffff', LILAC, '#ffffff', '#c3c9e4');
{
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent}#s{display:inline-block;width:512px;height:512px}.mark{width:100%;height:100%}</style><div id="s">${mark('#ffffff', LILAC)}</div>`;
  const p = await open(html, 'icon.html', { width: 600, height: 600 });
  await (await p.$('#s')).screenshot({ path: path.join(here, 'tw-wealth-icone.png'), omitBackground: true }); await p.close();
}
const icoPhone = `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="12" fill="${BRAND}"/><path d="M8.2 6.6c.4-.4 1-.4 1.3.1l1 1.6c.2.4.2.8-.1 1.1l-.7.7c.6 1.2 1.6 2.2 2.8 2.8l.7-.7c.3-.3.8-.3 1.1-.1l1.6 1c.5.3.5.9.1 1.3l-.8.8c-.6.6-1.5.8-2.3.5-3-1.1-5.1-3.2-6.2-6.2-.3-.8-.1-1.7.5-2.3z" fill="#fff"/></svg>`;
const icoMail = `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect x="1" y="5" width="22" height="14" rx="1.5" fill="${BRAND}"/><path d="M2 6.5l10 7 10-7" fill="none" stroke="#fff" stroke-width="1.6"/></svg>`;
{
  const b = banker;
  const html = `<!doctype html><meta charset="utf-8">${FONT}<style>@page{size:210mm 297mm;margin:0}*{box-sizing:border-box}html,body{margin:0}
.pg{position:relative;width:210mm;height:297mm;overflow:hidden;background:#fff;font-family:'Plus Jakarta Sans',sans-serif}
.logo{position:absolute;left:16mm;top:11mm;font-size:24mm}${lockupCss(BRAND, GREY)}
svg.bg{position:absolute;inset:0;width:100%;height:100%}
.ct{position:absolute;left:17.5mm;bottom:15.8mm;color:#3a3a3a;font-size:4.1mm;font-weight:300;line-height:1}
.ct div{display:flex;align-items:center;gap:2.2mm;margin-top:2.4mm}.ct i{display:block;width:5.4mm;height:5.4mm}</style>
<div class="pg"><svg class="bg" viewBox="0 0 1414 2000" preserveAspectRatio="none">
<rect x="975" y="235" width="554" height="3.4" fill="${BRAND}"/>
<path d="M0 1917 H870 Q955 1917 955 1832 H1414 V2000 H0 Z" fill="${BRAND}"/>
<path d="M955 1832 H1414 V1850 H963 Q960 1840 955 1832 Z" fill="${LILAC}"/></svg>
<div class="logo">${lockup(BRAND, LILAC)}</div>
<div class="ct"><div><i>${icoPhone}</i>${b.tel}</div><div><i>${icoMail}</i>${b.email}</div></div></div>`;
  const p = await open(html, 'pt.html');
  await p.pdf({ path: path.join(here, `tw-wealth-papel-timbrado-${b.slug}.pdf`), printBackground: true, preferCSSPageSize: true }); await p.close();
}
{
  const b = banker;
  const html = `<!doctype html><meta charset="utf-8">${FONT}<style>@page{size:90mm 50mm;margin:0}*{box-sizing:border-box}html,body{margin:0}
.c{position:relative;width:90mm;height:50mm;overflow:hidden;page-break-after:always;font-family:'Plus Jakarta Sans',sans-serif}
.f{background:${BRAND};display:flex;align-items:center;justify-content:center}.f::before{content:'';position:absolute;inset:4.2mm;border:.3mm solid ${LILAC}}
.f .lockup{font-size:12.5mm}${lockupCss('#fff', '#c3c9e4')}
.v{background:#fff;color:${BRAND};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.v::before{content:'';position:absolute;inset:4.2mm;border:.3mm solid ${BRAND}}
.v .brand{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:4.9mm;letter-spacing:.12em;margin-right:-.12em;line-height:1}
.v .brand2{font-family:'Plus Jakarta Sans',sans-serif;font-weight:400;font-size:2.5mm;letter-spacing:.5em;margin:.9mm -.5em 0 0;color:#8a93bd}
.v .nome{font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;font-size:4.7mm;margin-top:3.4mm;line-height:1}
.v .cargo{font-weight:500;font-size:1.9mm;letter-spacing:.14em;text-transform:uppercase;color:#8a93bd;margin-top:1.4mm}
.v .l{font-weight:300;font-size:2.9mm;margin-top:1.1mm;color:#3a3a3a}.v .l:first-of-type{margin-top:3mm}</style>
<div class="c f">${lockup('#ffffff', LILAC)}</div>
<div class="c v"><span class="brand">TW</span><span class="brand2">wealth</span><span class="nome">${b.nome}</span><span class="cargo">Planejamento patrimonial</span><span class="l">${b.tel}</span><span class="l">${b.email}</span></div>`;
  const p = await open(html, 'cv.html');
  await p.pdf({ path: path.join(here, `tw-wealth-cartao-visita-${b.slug}.pdf`), printBackground: true, preferCSSPageSize: true }); await p.close();
}
await browser.close(); console.log('ok');
