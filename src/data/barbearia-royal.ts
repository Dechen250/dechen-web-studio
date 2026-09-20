export const siteInfo = {
  name: "Barbearia Royal",
  wordmark: "BARBEARIA",
  wordmarkAccent: "Royal",
  tagline: "Cortes precisos. Experiência de respeito.",
  phone: "(11) 4000-2929",
  whatsapp: "551140002929",
  email: "contato@barbeariaroyal.com.br",
  instagram: "https://instagram.com/barbeariaroyal",
  instagramHandle: "@barbeariaroyal",
  address: {
    street: "Rua Augusta, 1840",
    neighborhood: "Consolação",
    city: "São Paulo",
    state: "SP",
    zip: "01412-000",
    full: "Rua Augusta, 1840 — Consolação, São Paulo — SP",
  },
  hours: [
    { days: "Terça a Sexta", time: "10h — 20h" },
    { days: "Sábado", time: "9h — 18h" },
    { days: "Domingo e Segunda", time: "Fechado" },
  ],
};

export const navLinks = [
  { href: "#historia", label: "Nossa História" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#barbeiros", label: "Barbeiros" },
  { href: "#depoimentos", label: "Avaliações" },
] as const;

export const hero = {
  tag: "Barbearia de alto padrão — Consolação",
  lines: ["CORTES", "PRECISOS", "& DE RESPEITO"],
  description:
    "Uma barbearia premium para homens que valorizam presença, estilo e atendimento de alto nível. Hora marcada, técnica precisa e um ritual pensado do início ao fim.",
  primaryCta: "Agendar horário",
  secondaryCta: "Ver serviços",
  image: "/showcase/barbearia-royal/ambiente/cadeira-premium.jpg",
  imageAlt: "Cadeira premium da Barbearia Royal",
};

export const marqueeItems = [
  "Hora marcada",
  "Cortes precisos",
  "Barba com toalha quente",
  "Ambiente premium",
  "Acabamento de alto padrão",
  "Experiência de respeito",
  "Navalha e tesoura",
  "Consolação · SP",
];

export const about = {
  tag: "Nossa História",
  titleBefore: "MAIS QUE UMA",
  titleMid: "BARBEARIA.",
  italic: "Presença.",
  paragraphs: [
    "A Barbearia Royal nasceu para quem trata o corte como parte da rotina de respeito consigo mesmo. Na Augusta, cada horário é reservado — sem fila, sem pressa, com o tempo inteiro dedicado a você.",
    "Da consultoria de estilo à última passada de navalha, o ritual é o mesmo: técnica precisa, produtos de qualidade e um ambiente pensado para relaxar. Não é só um corte. É presença impecável.",
  ],
  stats: [
    { value: "6", label: "Serviços na carta" },
    { value: "100%", label: "Hora marcada" },
    { value: "4", label: "Passos no ritual" },
  ],
  imageMain: "/showcase/barbearia-royal/ambiente/ambiente-reservado.webp",
  imageMainAlt: "Ambiente reservado da Barbearia Royal",
  imageSecondary: "/showcase/barbearia-royal/ambiente/area-de-barba.webp",
  imageSecondaryAlt: "Área de barba da Barbearia Royal",
  watermark: "BR",
};

export const differentials = [
  {
    title: "Atendimento com hora marcada",
    description:
      "Seu horário é respeitado. Sem filas, sem espera — apenas o tempo dedicado a você.",
  },
  {
    title: "Barbeiros experientes",
    description:
      "Profissionais com domínio técnico e olhar para o estilo que combina com cada cliente.",
  },
  {
    title: "Ambiente premium",
    description:
      "Espaço reservado, acabamentos sofisticados e uma atmosfera pensada para relaxar.",
  },
  {
    title: "Acabamento de alto padrão",
    description:
      "Corte, barba e detalhes finais com precisão — presença impecável do início ao fim.",
  },
];

export const services = [
  {
    name: "Corte masculino",
    description: "Corte personalizado com consultoria de estilo e finalização.",
    price: "R$ 90",
    duration: "45 min",
    icon: "scissors" as const,
  },
  {
    name: "Barba completa",
    description: "Design, toalha quente, navalha e hidratação para um visual limpo.",
    price: "R$ 70",
    duration: "40 min",
    icon: "fire" as const,
  },
  {
    name: "Corte + barba",
    description: "Experiência completa: corte, barba e acabamento em uma sessão.",
    price: "R$ 145",
    duration: "75 min",
    icon: "crown" as const,
  },
  {
    name: "Acabamento / pezinho",
    description: "Retoque preciso na nuca e contornos para manter o corte no ponto.",
    price: "R$ 45",
    duration: "20 min",
    icon: "star" as const,
  },
  {
    name: "Sobrancelha",
    description: "Alinhamento discreto e natural, sem exageros.",
    price: "R$ 35",
    duration: "15 min",
    icon: "palette" as const,
  },
  {
    name: "Dia do noivo",
    description: "Pacote premium com corte, barba, finalização e atendimento exclusivo.",
    price: "R$ 280",
    duration: "120 min",
    icon: "magic" as const,
  },
];

export const experienceSteps = [
  {
    step: "01",
    title: "Recepção",
    description:
      "Você é recebido com pontualidade, conforto e atenção desde o primeiro momento.",
  },
  {
    step: "02",
    title: "Consultoria de estilo",
    description:
      "Uma conversa rápida para alinhar formato, preferências e o resultado desejado.",
  },
  {
    step: "03",
    title: "Execução",
    description:
      "Corte e barba com técnica precisa, ritmo controlado e foco no detalhe.",
  },
  {
    step: "04",
    title: "Finalização premium",
    description:
      "Produtos de qualidade, revisão final e um visual pronto para qualquer ocasião.",
  },
];

export const galleryItems = [
  {
    title: "Cadeira premium",
    subtitle: "Conforto e precisão",
    overlay: "CADEIRA PREMIUM",
    image: "/showcase/barbearia-royal/ambiente/cadeira-premium.jpg",
    alt: "Cadeira premium da Barbearia Royal",
  },
  {
    title: "Área de barba",
    subtitle: "Ritual com navalha",
    overlay: "RITUAL DA BARBA",
    image: "/showcase/barbearia-royal/ambiente/area-de-barba.webp",
    alt: "Área de barba da Barbearia Royal",
  },
  {
    title: "Ambiente reservado",
    subtitle: "Privacidade e presença",
    overlay: "A EXPERIÊNCIA",
    image: "/showcase/barbearia-royal/ambiente/ambiente-reservado.webp",
    alt: "Ambiente reservado da Barbearia Royal",
  },
  {
    title: "Finalização",
    subtitle: "Detalhe que faz diferença",
    overlay: "TOQUES FINAIS",
    image: "/showcase/barbearia-royal/ambiente/finalizacao.webp",
    alt: "Finalização premium na Barbearia Royal",
  },
];

export const team = [
  {
    name: "Rafael Mendes",
    role: "Fundador & barbeiro chefe",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
  },
  {
    name: "Lucas Andrade",
    role: "Estilista sênior",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80",
  },
  {
    name: "Diego Costa",
    role: "Especialista em barba",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80",
  },
];

export const testimonials = [
  {
    quote:
      "Atendimento impecável do horário marcado ao último detalhe. A Royal trata o corte como ritual — e isso se vê no resultado.",
    name: "Eduardo Nunes",
    detail: "Corte + barba · Cliente demonstrativo",
  },
  {
    quote:
      "O melhor corte que já fiz em São Paulo. Consultoria rápida, execução precisa e um ambiente que realmente respeita o seu tempo.",
    name: "Marcelo Pinto",
    detail: "Corte masculino · Cliente demonstrativo",
  },
  {
    quote:
      "Ambiente diferenciado e profissional. Fui no pacote premium e saí com a presença que eu queria — sem exagero, só acabamento de alto padrão.",
    name: "Thiago Alves",
    detail: "Dia do noivo · Cliente demonstrativo",
  },
];

export const booking = {
  tag: "Reserve seu lugar",
  title: "AGENDE SUA",
  italic: "Visita",
  image: "/showcase/barbearia-royal/ambiente/finalizacao.webp",
  imageAlt: "Finalização premium na Barbearia Royal",
  slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "18:00", "19:00"],
};

export const instagramFeed = [
  "/showcase/barbearia-royal/ambiente/cadeira-premium.jpg",
  "/showcase/barbearia-royal/ambiente/area-de-barba.webp",
  "/showcase/barbearia-royal/ambiente/ambiente-reservado.webp",
  "/showcase/barbearia-royal/ambiente/finalizacao.webp",
  "/showcase/barbearia-royal/ambiente/cadeira-premium.jpg",
  "/showcase/barbearia-royal/ambiente/area-de-barba.webp",
];
