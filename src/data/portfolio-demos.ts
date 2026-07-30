export type PortfolioDemo = {
  slug: string;
  brand: string;
  title: string;
  category: string;
  description: string;
  href?: string;
  cover?: string;
  gradient: string;
  accentText: string;
  accentBorder: string;
  accentGlow: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
  };
  valueProposition: {
    title: string;
    description: string;
  };
  services: { title: string; description: string }[];
  cta: {
    title: string;
    description: string;
    button: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

export const portfolioDemos: PortfolioDemo[] = [
  {
    slug: "restaurante",
    brand: "Divina Cozinha",
    title: "Divina Cozinha",
    category: "Gastronomia",
    description:
      "Showcase completo com cardápio animado, reservas e experiência premium para restaurante contemporâneo.",
    href: "/showcase/divina-cozinha",
    cover: "/showcase/divina-cozinha/capa/capa.png",
    gradient: "from-amber-500/25 via-amber-900/10 to-transparent",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/30",
    accentGlow: "shadow-[0_0_40px_rgba(245,158,11,0.12)]",
    hero: {
      eyebrow: "Culinária contemporânea",
      headline: "Mais do que uma refeição.",
      subheadline:
        "Ingredientes selecionados, ambiente acolhedor e alta gastronomia em uma experiência digital completa.",
      cta: "Reservar mesa",
    },
    valueProposition: {
      title: "Uma experiência para ser lembrada.",
      description:
        "Showcase oficial da Dechen Web Studio para o segmento gastronômico.",
    },
    services: [],
    cta: {
      title: "Conheça o showcase",
      description: "Experiência completa desenvolvida para Divina Cozinha.",
      button: "Ver demonstração",
    },
    meta: {
      title: "Divina Cozinha — Showcase DWS",
      description:
        "Showcase completo de restaurante contemporâneo. Desenvolvido pela Dechen Web Studio.",
    },
  },
  {
    slug: "barbearia",
    brand: "Barbearia Royal",
    title: "Barbearia Royal",
    category: "Beleza masculina",
    description:
      "Showcase completo de barbearia premium: estética masculina sofisticada, serviços com preços e CTA de agendamento.",
    href: "/showcase/barbearia-royal",
    cover: "/showcase/barbearia-royal/capa/capa.png",
    gradient: "from-amber-600/20 via-stone-900/30 to-transparent",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/25",
    accentGlow: "shadow-[0_0_40px_rgba(196,163,90,0.12)]",
    hero: {
      eyebrow: "Barbearia de alto padrão",
      headline: "Cortes precisos. Experiência de respeito.",
      subheadline:
        "Uma barbearia premium para homens que valorizam presença, estilo e atendimento de alto nível.",
      cta: "Agendar horário",
    },
    valueProposition: {
      title: "O padrão que define a experiência.",
      description:
        "Showcase oficial da Dechen Web Studio para o segmento de barbearia premium.",
    },
    services: [],
    cta: {
      title: "Conheça o showcase",
      description: "Experiência completa desenvolvida para Barbearia Royal.",
      button: "Ver demonstração",
    },
    meta: {
      title: "Barbearia Royal — Showcase DWS",
      description:
        "Showcase completo de barbearia premium. Desenvolvido pela Dechen Web Studio.",
    },
  },
  {
    slug: "clinica",
    brand: "Instituto Harmonia",
    title: "Instituto Harmonia",
    category: "Saúde",
    description:
      "Showcase completo de clínica multidisciplinar: especialidades, equipe, depoimentos e agendamento via WhatsApp.",
    href: "/showcase/instituto-harmonia",
    cover: "/showcase/instituto-harmonia/capa/capa.jpg",
    gradient: "from-teal-500/20 via-emerald-900/10 to-transparent",
    accentText: "text-teal-400",
    accentBorder: "border-teal-500/30",
    accentGlow: "shadow-[0_0_40px_rgba(42,122,110,0.14)]",
    hero: {
      eyebrow: "Cuidado humanizado",
      headline: "Saúde com atenção de verdade.",
      subheadline:
        "No Instituto Harmonia, cada paciente é acompanhado com rigor técnico, empatia e um plano de cuidado personalizado.",
      cta: "Agendar consulta",
    },
    valueProposition: {
      title: "Medicina moderna com foco em você.",
      description:
        "Showcase oficial da Dechen Web Studio para o segmento de saúde.",
    },
    services: [],
    cta: {
      title: "Conheça o showcase",
      description: "Experiência completa desenvolvida para Instituto Harmonia.",
      button: "Ver demonstração",
    },
    meta: {
      title: "Instituto Harmonia — Showcase DWS",
      description:
        "Showcase completo de clínica multidisciplinar. Desenvolvido pela Dechen Web Studio.",
    },
  },
  {
    slug: "empresa",
    brand: "Vertex Consultoria",
    title: "Vertex Consultoria",
    category: "Corporativo",
    description:
      "Showcase institucional completo: método, serviços, resultados, prova social e conversão via WhatsApp.",
    href: "/showcase/vertex-consultoria",
    cover: "/showcase/vertex-consultoria/capa/capa.jpg",
    gradient: "from-cyan-500/20 via-slate-900/40 to-transparent",
    accentText: "text-cyan-400",
    accentBorder: "border-cyan-500/30",
    accentGlow: "shadow-[0_0_40px_rgba(34,211,238,0.12)]",
    hero: {
      eyebrow: "Estratégia & crescimento",
      headline: "Decisões melhores. Resultados reais.",
      subheadline:
        "A Vertex Consultoria apoia empresas na estruturação de processos, expansão de mercado e tomada de decisão baseada em dados.",
      cta: "Falar com consultor",
    },
    valueProposition: {
      title: "Consultoria que entende o seu negócio.",
      description:
        "Showcase oficial da Dechen Web Studio para o segmento corporativo.",
    },
    services: [],
    cta: {
      title: "Conheça o showcase",
      description: "Experiência completa desenvolvida para Vertex Consultoria.",
      button: "Ver demonstração",
    },
    meta: {
      title: "Vertex Consultoria — Showcase DWS",
      description:
        "Showcase completo de consultoria institucional. Desenvolvido pela Dechen Web Studio.",
    },
  },
];

export function getPortfolioDemo(slug: string) {
  return portfolioDemos.find((demo) => demo.slug === slug);
}
