// Configuração geral do site. Edite aqui, não nos componentes.
export const site = {
  nome: 'Nalu Pizzas & Massas',
  nomeCurto: 'Nalu',
  url: 'https://nalupizzas.com.br', // TODO: domínio definitivo
  instagram: 'https://www.instagram.com/nalu_pizzas/',
  instagramHandle: '@nalu_pizzas',
  hashtag: '#vocenanalu',
  anosDeTradicao: 17,
  bio: 'Pizzas artesanais com massa leve e crocante, 17 anos levando sabor e tradição!',
  descricaoPadrao:
    'Nalu Pizzas & Massas: pizzas artesanais com massa leve e crocante há 17 anos. Quatro casas em Fortaleza e no Eusébio, com espaço kids, delivery com entrega grátis e cashback.',
  // Enquanto true, o cardápio mostra o aviso de "dados de exemplo".
  cardapioPendente: false,
  cardapioAtualizadoEm: null as string | null, // ex.: '2026-11-20'
  naluMania: {
    dias: [1, 2, 3, 4], // 0=dom … 6=sáb (segunda a quinta)
    desconto: 'até 25% de desconto',
    beneficio: 'entrega grátis',
  },
  aniversario: {
    convidadosMinimos: 10, // [CONFIRMAR] regra atual
    brinde: 'Pizza Suflair', // [CONFIRMAR] regra atual
  },
} as const;
