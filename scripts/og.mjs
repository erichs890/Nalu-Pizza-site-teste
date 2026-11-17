// Gera as imagens de compartilhamento (1200x630) e os ícones a partir de HTML na identidade.
// Uso: node scripts/og.mjs  (troque pelo logo original quando chegar em src/assets/brand/)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { unidades } from './unidades-dados.mjs';

const fonte = (p) => `data:font/woff2;base64,${readFileSync(p).toString('base64')}`;
const fredoka = fonte('node_modules/@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2');
const fraunces = fonte('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2');

const base = (corpo) => `<!doctype html><html><head><style>
@font-face{font-family:F;src:url(${fredoka})}@font-face{font-family:R;font-style:italic;src:url(${fraunces})}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#0F4C4C;color:#F6EEDD;font-family:F;position:relative;overflow:hidden}
.p{position:absolute;inset:0;opacity:.12;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cg fill='none' stroke='%23F5A823' stroke-width='2'%3E%3Cpath d='M20 30 L60 40 Q55 65 38 78 Z'/%3E%3Ccircle cx='120' cy='60' r='22'/%3E%3Ccircle cx='120' cy='60' r='16'/%3E%3C/g%3E%3C/svg%3E")}
.logo{position:absolute;left:72px;top:64px;line-height:1;text-align:center}.logo b{display:block;font-size:84px;font-weight:600;letter-spacing:-2px}.logo i{font-style:normal;font-size:20px;letter-spacing:9px;font-weight:600}
h1{position:absolute;left:72px;bottom:150px;font-size:96px;line-height:.95;font-weight:650;text-transform:uppercase;color:#F5A823;max-width:900px}
p{position:absolute;left:74px;bottom:76px;font-family:R;font-style:italic;font-size:38px}
.selo{position:absolute;right:70px;top:60px;width:190px;height:190px;border-radius:50%;background:#F5A823;color:#0A2E2E;display:grid;place-content:center;text-align:center;line-height:.9}
.selo b{font-size:80px;font-weight:650}.selo i{font-style:normal;font-size:22px;letter-spacing:3px;font-weight:600}
.gota{position:absolute;right:-60px;bottom:-140px;width:520px;height:520px;border-radius:48% 52% 46% 54%/55% 48% 52% 45%;background:#E9D3AE;opacity:.95}
</style></head><body><div class="p"></div>${corpo}</body></html>`;

const logo = '<div class="logo"><b>nalu</b><i>PIZZAS</i></div>';
const selo = '<div class="selo"><b>17</b><i>ANOS</i></div>';
const pecas = [
  ['public/og/nalu.png', base(`${logo}${selo}<div class="gota"></div><h1>Massa leve.<br>Borda crocante.</h1><p>4 casas em Fortaleza e no Eusébio</p>`)],
  ...unidades.map((u) => [`public/og/${u.slug}.png`, base(`${logo}${selo}<div class="gota"></div><h1>Nalu<br>${u.nome}</h1><p>${u.endereco} · ${u.bairro}</p>`)]),
];

const icone = (t) => `<!doctype html><html><head><style>*{margin:0}body{width:${t}px;height:${t}px;background:#0F4C4C;display:grid;place-items:center}</style></head><body>
<svg width="${t * 0.62}" height="${t * 0.62}" viewBox="0 0 64 64"><path d="M14 54V32a18 18 0 0 1 36 0v22" fill="none" stroke="#F6EEDD" stroke-width="11" stroke-linecap="round"/></svg></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [arq, html] of pecas) {
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: arq });
}
for (const [arq, t] of [['public/apple-touch-icon.png', 180], ['public/icon-192.png', 192], ['public/icon-512.png', 512]]) {
  await page.setViewportSize({ width: t, height: t });
  await page.setContent(icone(t));
  await page.screenshot({ path: arq });
}
await browser.close();
console.log('OG e ícones gerados');
