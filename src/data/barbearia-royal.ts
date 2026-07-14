export const siteInfo = {
  name: "Barbearia Royal",
  tagline: "Cortes precisos. Experiência de respeito.",
  phone: "(11) 4000-2929",
  whatsapp: "551140002929",
  email: "contato@barbeariaroyal.com.br",
  instagram: "https://instagram.com/barbeariaroyal",
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
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#servicos", label: "Serviços" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#ambiente", label: "Ambiente" },
] as const;

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
  },
  {
    name: "Barba completa",
    description: "Design, toalha quente, navalha e hidratação para um visual limpo.",
    price: "R$ 70",
  },
  {
    name: "Corte + barba",
    description: "Experiência completa: corte, barba e acabamento em uma sessão.",
    price: "R$ 145",
  },
  {
    name: "Acabamento / pezinho",
    description: "Retoque preciso na nuca e contornos para manter o corte no ponto.",
    price: "R$ 45",
  },
  {
    name: "Sobrancelha",
    description: "Alinhamento discreto e natural, sem exageros.",
    price: "R$ 35",
  },
  {
    name: "Dia do noivo",
    description: "Pacote premium com corte, barba, finalização e atendimento exclusivo.",
    price: "R$ 280",
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

export const testimonials = [
  {
    quote: "Atendimento impecável.",
    name: "Cliente demonstrativo",
    detail: "Corte + barba",
  },
  {
    quote: "O melhor corte que já fiz.",
    name: "Cliente demonstrativo",
    detail: "Corte masculino",
  },
  {
    quote: "Ambiente diferenciado e profissional.",
    name: "Cliente demonstrativo",
    detail: "Pacote premium",
  },
];

export const galleryItems = [
  {
    title: "Cadeira premium",
    subtitle: "Conforto e precisão",
    image: "/showcase/barbearia-royal/ambiente/cadeira-premium.jpg",
    alt: "Cadeira premium da Barbearia Royal",
  },
  {
    title: "Área de barba",
    subtitle: "Ritual com navalha",
    image: "/showcase/barbearia-royal/ambiente/area-de-barba.webp",
    alt: "Área de barba da Barbearia Royal",
  },
  {
    title: "Ambiente reservado",
    subtitle: "Privacidade e presença",
    image: "/showcase/barbearia-royal/ambiente/ambiente-reservado.webp",
    alt: "Ambiente reservado da Barbearia Royal",
  },
  {
    title: "Finalização",
    subtitle: "Detalhe que faz diferença",
    image: "/showcase/barbearia-royal/ambiente/finalizacao.webp",
    alt: "Finalização premium na Barbearia Royal",
  },
];
