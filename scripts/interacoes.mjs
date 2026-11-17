// Testa o fluxo principal: escolher unidade e pedir. Uso: npm run preview (outro terminal) && node scripts/interacoes.mjs
import { chromium, devices } from 'playwright';
const BASE = process.env.BASE ?? 'http://localhost:4390';
const OUT = process.env.OUT ?? 'screenshots';
const browser = await chromium.launch();
const falhas = [];
const ok = (cond, msg) => { if (!cond) falhas.push(msg); };

for (const [nome, opts] of [
  ['mobile', { ...devices['iPhone 13'], defaultBrowserType: undefined }],
  ['desktop', { viewport: { width: 1440, height: 900 } }],
]) {
  const { defaultBrowserType, ...ctxOpts } = opts;
  const ctx = await browser.newContext({ ...ctxOpts, locale: 'pt-BR', timezoneId: 'America/Fortaleza' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/');
  // 1º toque: Pedir agora (sem unidade) abre o seletor
  await page.locator('.hero a[data-u-pedido]').click();
  await page.waitForTimeout(400);
  ok(await page.locator('#seletor-unidade').evaluate((d) => d.open), `${nome}: seletor não abriu ao tocar em Pedir`);
  await page.screenshot({ path: `${OUT}/${nome}_seletor.png` });
  // 2º toque: escolher Cocó abre o Anota AI
  const [popup] = await Promise.all([
    ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null),
    page.locator('[data-escolher="coco"]').click(),
  ]);
  ok(popup && popup.url().includes('anota.ai'), `${nome}: escolher a unidade não abriu o pedido (${popup?.url()})`);
  if (popup) await popup.close();
  ok((await page.locator('header [data-u-nome]').first().textContent()) === 'Cocó', `${nome}: cabeçalho não mostra Cocó`);
  ok((await page.locator('.hero a[data-u-pedido]').getAttribute('href'))?.includes('anota.ai'), `${nome}: botão Pedir não aponta para o Anota AI`);
  // Esc fecha o seletor
  await page.locator('header [data-abre-seletor]').click();
  await page.keyboard.press('Escape');
  ok(!(await page.locator('#seletor-unidade').evaluate((d) => d.open)), `${nome}: Esc não fechou o seletor`);
  // Cardápio: busca sem acento
  await page.goto(BASE + '/cardapio');
  await page.locator('[data-busca]').fill('prestigio'); // sem acento: tem que achar "Prestígio"
  const visiveis = await page.locator('[data-item]:not([hidden])').count();
  ok(visiveis === 1, `${nome}: busca "prestigio" mostrou ${visiveis} itens`);
  await page.screenshot({ path: `${OUT}/${nome}_cardapio-busca.png` });
  await ctx.close();
}
await browser.close();
console.log(falhas.length ? 'FALHAS:\n' + falhas.join('\n') : 'OK: fluxo de pedido em 2 toques, seletor, Esc e busca funcionando');
