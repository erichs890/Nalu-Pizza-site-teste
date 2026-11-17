// Tira screenshots de todas as páginas em vários tamanhos e checa overflow horizontal.
// Uso: npm run build && npx astro preview --port 4321 (em outro terminal) && npm run check:visual
// Opções: BASE=http://localhost:4321  PAGINAS=/,/cardapio  VIEWPORTS=390x844,1440x900  FULL=0
import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://localhost:4390';
const paginas = (process.env.PAGINAS ?? '/,/cardapio,/unidades,/unidades/coco,/aniversarios,/nalu-mania,/404').split(',');
const vps = (process.env.VIEWPORTS ??
  '360x740,375x667,390x844,412x915,430x932,844x390,768x1024,1024x1366,1280x800,1440x900,1920x1080,2560x1440')
  .split(',').map((s) => s.split('x').map(Number));
const FULL = process.env.FULL !== '0';
const OUT = process.env.OUT ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const problemas = [];
for (const [w, h] of vps) {
  const mobile = w < 768 || (w === 844 && h === 390);
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    userAgent: mobile ? devices['Pixel 7'].userAgent : undefined,
    locale: 'pt-BR',
    timezoneId: 'America/Fortaleza',
  });
  const page = await ctx.newPage();
  const erros = [];
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  page.on('pageerror', (e) => erros.push(String(e)));
  for (const p of paginas) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
    if (ov.sw > ov.iw) problemas.push(`${w}x${h} ${p}: overflow horizontal (${ov.sw} > ${ov.iw})`);
    const nome = `${OUT}/${w}x${h}${p === '/' ? '_home' : p.replace(/\//g, '_')}.png`;
    if (FULL) {
      // rola até o fim para disparar observers, volta ao topo
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
      await page.waitForTimeout(250);
    }
    if (process.env.TELAS) {
      // uma imagem por "tela" rolada, para revisar seção a seção
      const alt = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0, n = 0; y < alt && n < 40; y += Math.round(h * 0.9), n++) {
        await page.evaluate((yy) => scrollTo({ top: yy, behavior: 'instant' }), y);
        await page.waitForTimeout(350);
        await page.screenshot({ path: nome.replace('.png', `_t${String(n).padStart(2, '0')}.png`) });
      }
      continue;
    }
    await page.screenshot({ path: nome, fullPage: FULL });
  }
  if (erros.length) problemas.push(`${w}x${h}: erros de console: ${[...new Set(erros)].join(' | ')}`);
  await ctx.close();
}
await browser.close();
console.log(problemas.length ? 'PROBLEMAS:\n' + problemas.join('\n') : 'OK: nenhum overflow nem erro de console');
