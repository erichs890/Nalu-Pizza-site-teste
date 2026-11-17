import dados from './cardapio.json';
import type { Cardapio, Item } from './tipos';
import { existeFoto } from '../../lib/fotos';

export const cardapio = dados as Cardapio;

export const itensDa = (categoria: string) => cardapio.itens.filter((i) => i.categoria === categoria);
// Favoritas da home: as que têm foto vêm primeiro (a 1ª ganha o card grande no desktop)
export const favoritas = (doce = false) =>
  cardapio.itens
    .filter((i) => i.favorita && (doce ? i.categoria === 'pizzas-doces' : i.categoria !== 'pizzas-doces'))
    .filter((i) => existeFoto(fotoDoItem(i)))
    .sort((a, b) => ordemFav.indexOf(a.id) - ordemFav.indexOf(b.id));

// Ordem na home (a 1ª é o card grande no desktop: use a foto mais nítida)
const ordemFav = ['bacon-com-alho-frito', 'vegana-especial', 'fettuccine-ao-gamberi-e-pomodoro-150g', 'lasanha-napolitana', 'mini-pastel-carne-de-sol'];

/** Caminho padrão da foto de um item, mesmo que ainda não exista. */
export const fotoDoItem = (i: Item) =>
  i.imagem ??
  `${i.categoria === 'pizzas-doces' ? 'doces' : i.categoria.startsWith('pizzas') ? 'pizzas' : i.categoria === 'massas' ? 'massas' : 'outros'}/${i.id}.jpg`;
