# Fotos necessárias: Nalu Pizzas

Salve cada foto com **exatamente o nome abaixo** dentro de `src/assets/fotos/`. O site troca o marcador pela foto sozinho: é só rodar `npm run build`.
Formato: JPG ou PNG, o maior possível (mínimo indicado). O site gera as versões leves (AVIF/WebP) para cada tela.

**Regra:** só fotos reais da Nalu. Nada de banco de imagem nem imagem gerada por IA.

## Já no site (provisórias, recortadas do "Cardápio - NALU 2026.pdf")
Ficam OK no celular, mas perdem nitidez quando ficam grandes no desktop. Troque pelos arquivos originais **com o mesmo nome** assim que o cliente mandar:
`pizzas/especial-nalu.jpg` (primeira tela), `pizzas/bacon-com-alho-frito.jpg`, `pizzas/vegana-especial.jpg`, `massas/fettuccine-ao-gamberi-e-pomodoro-150g.jpg`, `massas/lasanha-napolitana.jpg`, `outros/couvert.jpg`, `outros/mini-pastel-carne-de-sol.jpg`, `outros/batata-frita-250g.jpg`, `outros/salada-especial-de-carne-do-sol.jpg`, `outros/brownie-com-sorvete.jpg`, `instagram/03.jpg`.

## Já no site (do Instagram oficial @nalu_pizzas)
Recortadas de posts da própria Nalu (sem o texto do post). Boa resolução, mas confirme com o cliente:
| Arquivo | Post de origem | Observação |
|---|---|---|
| `familia/mesa-familia.jpg`, `instagram/02.jpg` | instagram.com/p/DfVXc40hI3f | Cliente à mesa, **não é família com crianças**. Trocar quando houver a foto da família. |
| `doces/pizza-chocolate-morango.jpg`, `instagram/05.jpg` | instagram.com/p/DfKvctABae0 | Fatia de chocolate com morango, fundo âmbar. |
| `vinhos/taca-pizza.jpg` | instagram.com/p/Deh_XJcsEYE | Taça de tinto + massa (não pizza). |
| `instagram/01.jpg` | instagram.com/p/DfQTEIyMTLp | Pizza inteira de cima, fundo verde. Sabor a confirmar. |
| `equipe/pizzaiolos.jpg` | instagram.com/p/DeumBUhBvJT | Três chefs (post do Dia do Chef). Tem "20 de Outubro" pequeno no fundo. |
| `unidades/eusebio/ambiente.jpg` | instagram.com/p/Dba8SqDjvac | **[CONFIRMAR]** Post "A família cresceu" com o logo Nalu Garden: assumi que é o Eusébio. Resolução baixa (825px). |

Fotos de pratos do cardápio: o nome do arquivo é o `id` do item (`pizzas/<id>.jpg`, `doces/<id>.jpg`, `massas/<id>.jpg`, `outros/<id>.jpg`). Assim que existir, a miniatura aparece no cardápio e o item pode entrar em "As favoritas" (ordem em `src/data/cardapio/index.ts`).

## Logo (urgente)
| Arquivo | O que é |
|---|---|
| `src/assets/brand/logo-nalu.svg` | Logo original, versão **branca/clara** (para fundo petróleo). SVG de preferência. |
| `src/assets/brand/logo-nalu-escuro.svg` | Logo original, versão **petróleo/escura** (para fundo claro). |

## Home
| Arquivo | Proporção / mínimo | Enquadramento | Onde aparece |
|---|---|---|---|
| `pizzas/hero-fatia.jpg` | 1:1 · 1600px | **Fatia sendo puxada com o queijo esticando**, close, fundo escuro esverdeado. A foto mais importante do site. | Primeira tela (recortada em forma orgânica) |
| `pizzas/<id-do-item>.jpg` | 4:5 · 1200px | Pizza inteira vista de cima, fundo escuro esverdeado, sousplat verde se tiver. Uma por pizza favorita. | "As favoritas da casa" e miniatura no cardápio |
| `doces/pizza-chocolate-morango.jpg` | 1:1 · 1600px | Close da pizza de chocolate com morango e bombom derretendo, **fundo âmbar/amarelo** (como no feed). | Bloco "Pra fechar a noite" |
| `familia/mesa-familia.jpg` | 5:4 · 1800px | Família real à mesa com crianças, sorrisos verdadeiros, luz quente do salão. | "Mesa pra família toda" |
| `vinhos/taca-pizza.jpg` | 3:4 · 1000px | Taça de vinho tinto em close, pizza desfocada atrás, luz baixa. | Nalu Harmoniza (recortada em arco) |
| `equipe/pizzaiolos.jpg` | 21:9 · 2400px (horizontal larga) | Pizzaiolos e chefs de dólmã e touca, de preferência perto do forno. No celular é recortada em 4:3, então deixe as pessoas no centro. | "Gente que faz" |
| `instagram/01.jpg` … `05.jpg` | 1:1 · 1200px a 01, 800px as demais | 01 pizza inteira de cima (a grande) · 02 família rindo · 03 taça + pizza · 04 letreiro neon verde · 05 fatia de chocolate com morango | Mosaico #vocenanalu |

## Unidades (uma pasta por casa: `coco`, `sul`, `north`, `eusebio`)
| Arquivo | Proporção / mínimo | Enquadramento |
|---|---|---|
| `unidades/<casa>/ambiente.jpg` | 16:10 · 1200px | O ambiente que define a casa. Cocó: salão com plantas e luz quente. North: quintal sob coqueiros com cordões de luz. Sul: fachada/balcão de retirada. Eusébio: fachada ou salão. |
| `unidades/<casa>/capa.jpg` | 16:9 · 2400px | Mesma ideia, mais aberta, para o topo da página da unidade. No desktop é recortada na vertical à direita: deixe o assunto no centro. |

## Aniversários
| Arquivo | Proporção / mínimo | Enquadramento |
|---|---|---|
| `familia/aniversario-mesa.jpg` | 16:9 · 2000px | Mesa de aniversário real na Nalu, crianças em volta, pizza no centro. |
| `doces/pizza-suflair.jpg` | 1:1 · 1200px | A Pizza Suflair em close, de cima. |

## Cardápio
Uma foto por item é opcional. O nome é o `id` do item no JSON: `pizzas/<id>.jpg`, `doces/<id>.jpg`, `massas/<id>.jpg` (ou defina `"imagem"` no item). Quadrada, 600px, de cima.
