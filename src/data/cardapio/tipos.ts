import type { Unidade } from '../../config/unidades';

export type Slug = Unidade['slug'];

export type Item = {
  id: string;
  nome: string;
  descricao?: string;
  categoria: string; // id de uma categoria em cardapio.json
  precos: { tamanho?: string; valor: number | null; codigo?: string }[]; // codigo = código do cardápio impresso
  unidades?: Slug[]; // vazio/ausente = vale para todas
  tags?: ('novo' | 'vegetariano' | 'mais-pedido' | 'meio-a-meio')[];
  imagem?: string; // caminho dentro de src/assets/fotos, ex.: 'pizzas/margherita.jpg'
  favorita?: boolean; // aparece em "As favoritas" na home
  destaque?: boolean; // ícone de troféu no cardápio impresso
  linha?: string; // linha de pizza de origem (para as doces)
  exemplo?: boolean;
};

export type Categoria = { id: string; nome: string; frase?: string };

export type Cardapio = {
  atualizadoEm: string | null;
  fonte?: string;
  tamanhos: string[];
  observacoes?: string[];
  categorias: Categoria[];
  itens: Item[];
};
