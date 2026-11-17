# Site Nalu Pizzas & Massas

Astro estático, sem framework de JS. ~11 KB de JavaScript no total (seletor de unidade, cardápio, formulário).

## Rodar
```bash
npm install
npm run dev        # http://localhost:4321 (desenvolvimento)
npm run build      # gera dist/
npm run preview    # serve dist/ em http://localhost:4390
```

## Onde editar
| O quê | Arquivo |
|---|---|
| Telefones, WhatsApp, horários, links de pedido, serviços de cada casa | `src/config/unidades.ts` |
| Nalu Mania, regra do aniversário, Instagram, domínio | `src/config/site.ts` |
| Cardápio | `src/data/cardapio/cardapio.json` (guia: `README-CARDAPIO.md`) |
| Fotos | `src/assets/fotos/…` (lista exata: `FOTOS-NECESSARIAS.md`) |
| Logo | `src/assets/brand/logo-nalu.svg` e `logo-nalu-escuro.svg` |
| Cores e fontes | `src/styles/global.css` (topo do arquivo) |

**Horários** (`unidades.ts`): `horarios: [{ dias: [2,3,4,5,6,0], abre: '18:00', fecha: '23:30' }]` (0 = domingo). Se fecha depois da meia-noite, escreva `fecha: '00:30'`: o site entende. O "Aberto agora" é calculado no fuso de Fortaleza.

**WhatsApp**: só dígitos com 55 + DDD: `'5585999999999'`.

Tudo que ainda não foi confirmado aparece no site marcado como `[CONFIRMAR: …]`. Busque por `CONFIRMAR` e `TODO` no código para achar cada ponto.

## Verificação
```bash
npm run preview
```
```bash
npm run check:visual
```
```bash
node scripts/interacoes.mjs
```
- `check:visual` tira screenshots de todas as páginas em 12 tamanhos (360 → 2560) em `screenshots/` e falha se houver overflow horizontal ou erro de console. `TELAS=1` tira uma imagem por tela rolada.
- `interacoes.mjs` testa o pedido em 2 toques, o seletor, o Esc e a busca do cardápio.
- `node scripts/og.mjs` regera as imagens de compartilhamento (`public/og/`) e os ícones. Rode de novo quando o logo original chegar.

## Publicar (Vercel)
1. Suba a pasta para um repositório no GitHub.
2. Na Vercel: New Project → importe o repositório. Ela detecta o Astro sozinha (build `npm run build`, saída `dist`).
3. Ligue o domínio e atualize `site` em `astro.config.mjs`, `url` em `src/config/site.ts` e a linha `Sitemap:` de `public/robots.txt`.
"# Nalu-Pizza-site-teste" 
