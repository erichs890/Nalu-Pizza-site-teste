// As 4 casas da Nalu. Tudo que depende de unidade sai daqui.
// Campos `null` aparecem no site como "a confirmar" e somem do SEO.

export type Servico = 'salao' | 'delivery' | 'retirada' | 'ar-livre' | 'kids';
export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo
export type Horario = { dias: DiaSemana[]; abre: string; fecha: string }; // 'HH:MM', fecha pode passar da meia-noite

export type Unidade = {
  slug: 'coco' | 'sul' | 'north' | 'eusebio';
  nome: string;
  bairro: string;
  cidade: 'Fortaleza' | 'Eusébio';
  endereco: string;
  cep: string | null;
  coords: { lat: number; lng: number };
  coordsAproximadas: boolean;
  telefone: string | null; // formato livre para exibir, ex.: '(85) 3333-3333'
  whatsapp: string | null; // só dígitos com DDI, ex.: '5585999999999'
  pedido: string | null; // link Anota AI
  horarios: Horario[] | null;
  servicos: Servico[];
  frase: string;
  apelido?: string; // nome alternativo da casa (ex.: 'Nalu Pizzas Garden')
  instagram?: string; // perfil próprio da unidade, se houver
  seo: { titulo: string; descricao: string };
};

export const unidades: Unidade[] = [
  {
    slug: 'coco',
    nome: 'Cocó',
    bairro: 'Cocó',
    cidade: 'Fortaleza',
    endereco: 'Rua Andrade Furtado, 1631',
    cep: null, // TODO
    coords: { lat: -3.7435, lng: -38.4905 }, // TODO: aproximado, confirmar no Google Maps
    coordsAproximadas: true,
    telefone: '(85) 3017-1111', // cardápio 2026
    whatsapp: '5585996982054', // cardápio 2026
    pedido: 'https://pedido.anota.ai/loja/nalupizzas?from=site',
    horarios: null, // TODO
    servicos: ['salao', 'kids', 'delivery', 'retirada'], // [CONFIRMAR] delivery/retirada
    frase: 'A nossa unidade pioneira é o lugar perfeito para reunir a família!',
    seo: {
      titulo: 'Nalu Pizzas Cocó · Pizzaria artesanal com espaço kids em Fortaleza',
      descricao:
        'A Nalu pioneira, na Rua Andrade Furtado, 1631, no Cocó. Salão para a família, espaço kids e pedido online com entrega grátis e cashback.',
    },
  },
  {
    slug: 'sul',
    nome: 'Sul',
    bairro: 'Cidade dos Funcionários',
    cidade: 'Fortaleza',
    endereco: 'Rua Alice, 612 A',
    cep: null,
    coords: { lat: -3.7905, lng: -38.4985 }, // TODO: aproximado
    coordsAproximadas: true,
    telefone: '(85) 3025-7486', // cardápio 2026
    whatsapp: '5585996874810', // cardápio 2026
    pedido: 'https://pedido.anota.ai/loja/nalupizzas1?from=site',
    horarios: null,
    servicos: ['delivery', 'retirada'], // [CONFIRMAR] sem salão
    frase: 'Delivery e retirada na Cidade dos Funcionários.',
    seo: {
      titulo: 'Nalu Pizzas Sul · Delivery de pizza na Cidade dos Funcionários, Fortaleza',
      descricao:
        'Nalu Sul, na Rua Alice, 612 A. Pizza artesanal de massa leve e crocante com delivery e retirada. Peça online com entrega grátis e cashback.',
    },
  },
  {
    slug: 'north',
    nome: 'North',
    bairro: 'Presidente Kennedy', // cardápio 2026; fica no Quintal do Nortão
    cidade: 'Fortaleza',
    endereco: 'Av. Bezerra de Menezes, 2450',
    cep: null,
    coords: { lat: -3.7365, lng: -38.5655 }, // TODO: aproximado
    coordsAproximadas: true,
    telefone: null, // o cardápio só traz WhatsApp
    whatsapp: '5585992897539', // cardápio 2026
    pedido: 'https://app.anota.ai/p/nalu-pizzas-north',
    horarios: null,
    servicos: ['ar-livre', 'delivery', 'retirada'], // [CONFIRMAR]
    frase: 'No Quintal do Nortão: ao ar livre, debaixo dos coqueiros, com as luzes acesas à noite.',
    instagram: 'https://www.instagram.com/nalupizzas.north/',
    seo: {
      titulo: 'Nalu Pizzas North · Pizzaria ao ar livre na Bezerra de Menezes, Fortaleza',
      descricao:
        'Nalu North, no Quintal do Nortão, Av. Bezerra de Menezes, 2450, Presidente Kennedy. Pizza artesanal ao ar livre, entre coqueiros e luzes. Peça online com entrega grátis.',
    },
  },
  {
    slug: 'eusebio',
    nome: 'Eusébio',
    bairro: 'Mangabeira',
    cidade: 'Eusébio',
    endereco: 'Rua Maria Zuleide Rocha, 695',
    cep: null,
    coords: { lat: -3.8735, lng: -38.4555 }, // TODO: aproximado
    coordsAproximadas: true,
    telefone: '(85) 99174-4640', // cardápio 2026 (ícone de telefone; [CONFIRMAR] se também é WhatsApp)
    whatsapp: null,
    pedido: null, // TODO: link Anota AI do Eusébio
    horarios: null,
    servicos: [], // TODO
    frase: 'A família cresceu! A casa mais nova do Grupo Nalu.',
    apelido: 'Nalu Pizzas Garden', // cardápio 2026
    seo: {
      titulo: 'Nalu Pizzas Garden · Pizzaria artesanal no Eusébio',
      descricao:
        'Nalu Pizzas Garden, no Eusébio: Rua Maria Zuleide Rocha, 695, Mangabeira. Pizza artesanal de massa leve e crocante, há 17 anos.',
    },
  },
];

export const servicoNome: Record<Servico, string> = {
  salao: 'Salão',
  delivery: 'Delivery',
  retirada: 'Retirada',
  'ar-livre': 'Ao ar livre',
  kids: 'Espaço kids',
};

export const porSlug = (slug: string) => unidades.find((u) => u.slug === slug);

/** Número para o botão Ligar: fixo, se houver; senão o celular do WhatsApp. */
export const telLink = (u: Unidade) =>
  u.telefone ? `tel:+55${u.telefone.replace(/\D/g, '')}` : u.whatsapp ? `tel:+${u.whatsapp}` : null;

export const whatsFmt = (w: string) => `(${w.slice(2, 4)}) ${w.slice(4, 9)}-${w.slice(9)}`;

export const rotaUrl = (u: Unidade) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${u.endereco}, ${u.bairro}, ${u.cidade} - CE`,
  )}`;
