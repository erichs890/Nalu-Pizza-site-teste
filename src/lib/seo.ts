import { site } from '../config/site';
import { unidades, type Unidade } from '../config/unidades';
import { cardapio } from '../data/cardapio';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const abs = (p: string) => new URL(p, site.url).href;

export const jsonldOrg = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': abs('/#org'),
  name: 'Grupo Nalu · Nalu Pizzas & Massas',
  url: site.url,
  logo: abs('/apple-touch-icon.png'),
  sameAs: [site.instagram],
  subOrganization: unidades.map((u) => ({ '@id': abs(`/unidades/${u.slug}#restaurante`) })),
});

export const jsonldRestaurante = (u: Unidade) => {
  const r: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': abs(`/unidades/${u.slug}#restaurante`),
    name: `Nalu Pizzas ${u.nome}`,
    url: abs(`/unidades/${u.slug}`),
    image: abs(`/og/${u.slug}.png`),
    parentOrganization: { '@id': abs('/#org') },
    address: {
      '@type': 'PostalAddress',
      streetAddress: u.endereco,
      addressLocality: u.cidade,
      addressRegion: 'CE',
      addressCountry: 'BR',
      ...(u.cep ? { postalCode: u.cep } : {}),
    },
    servesCuisine: ['Pizza', 'Italian'],
    hasMenu: abs('/cardapio'),
    acceptsReservations: u.servicos.includes('salao') ? 'True' : 'False',
    sameAs: [site.instagram],
  };
  if (!u.coordsAproximadas) r.geo = { '@type': 'GeoCoordinates', latitude: u.coords.lat, longitude: u.coords.lng };
  if (u.telefone) r.telephone = `+55 ${u.telefone}`;
  if (u.horarios?.length)
    r.openingHoursSpecification = u.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias.map((d) => dayMap[d]),
      opens: h.abre,
      closes: h.fecha,
    }));
  if (u.pedido) r.potentialAction = { '@type': 'OrderAction', target: u.pedido };
  return r;
};

export const jsonldMenu = () => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Cardápio Nalu Pizzas & Massas',
  url: abs('/cardapio'),
  hasMenuSection: cardapio.categorias.map((c) => ({
    '@type': 'MenuSection',
    name: c.nome,
    hasMenuItem: cardapio.itens
      .filter((i) => i.categoria === c.id && !i.exemplo)
      .map((i) => ({
        '@type': 'MenuItem',
        name: i.nome,
        ...(i.descricao ? { description: i.descricao } : {}),
        offers: i.precos
          .filter((p) => p.valor !== null)
          .map((p) => ({ '@type': 'Offer', price: p.valor!.toFixed(2), priceCurrency: 'BRL', ...(p.tamanho ? { name: p.tamanho } : {}) })),
      })),
  })),
});

export const breadcrumb = (itens: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: itens.map(([name, path], n) => ({ '@type': 'ListItem', position: n + 1, name, item: abs(path) })),
});
