# Como editar o cardápio (sem ser programador)

Tudo fica em **um arquivo**: `src/data/cardapio/cardapio.json`. Abra no VS Code ou no Bloco de Notas.

## Um item
```json
{
  "id": "margherita",
  "nome": "Margherita",
  "descricao": "Molho de tomate, muçarela e manjericão",
  "categoria": "pizzas-salgadas",
  "precos": [
    { "tamanho": "Média", "valor": 49.9 },
    { "tamanho": "Grande", "valor": 64.9 }
  ],
  "favorita": true
}
```

- **id**: nome curto sem acento e sem espaço (use hífen). Também é o nome da foto: `src/assets/fotos/pizzas/margherita.jpg`.
- **valor**: use **ponto** para os centavos (`49.9`, não `49,90`). O site mostra "R$ 49,90" sozinho.
- **tamanho**: use os mesmos nomes da lista `"tamanhos"` no topo do arquivo, para o seletor de tamanho funcionar.
- **categoria**: um dos `id` da lista `"categorias"`.
- **favorita**: `true` faz a pizza aparecer em "As favoritas da casa" na home (use 5 salgadas e 1 doce).
- **unidades** (opcional): se o item **não** existe em todas as casas, liste onde existe: `"unidades": ["coco", "sul"]`.
- **tags** (opcional, só se o cardápio indicar): `"novo"`, `"vegetariano"`, `"mais-pedido"`, `"meio-a-meio"`.

## Depois de editar
1. Troque `"atualizadoEm"` pela data de hoje (`"2026-11-20"`). A data aparece no rodapé do cardápio.
2. Quando o cardápio real estiver completo, apague os itens com `"exemplo": true` e, em `src/config/site.ts`, mude `cardapioPendente` para `false` (some o aviso amarelo).
3. Rode `npm run build`. Se tiver vírgula sobrando ou faltando, o build avisa a linha.
