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
    title: "Clínica Moderna",
    category: "Saúde",
    description:
      "Site que transmite confiança e facilita o primeiro contato com pacientes.",
    gradient: "from-[#0070F3]/20 via-cyan-900/10 to-transparent",
    accentText: "text-[#0070F3]",
    accentBorder: "border-[#0070F3]/30",
    accentGlow: "shadow-[0_0_40px_rgba(0,112,243,0.12)]",
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
        "Nossa equipe multidisciplinar oferece diagnóstico preciso, tratamentos atualizados e um ambiente acolhedor para que você se sinta seguro em cada etapa.",
    },
    services: [
      {
        title: "Clínica geral",
        description:
          "Avaliação completa, prevenção e encaminhamento para especialistas.",
      },
      {
        title: "Especialidades",
        description:
          "Cardiologia, dermatologia, ortopedia e mais em um só lugar.",
      },
      {
        title: "Exames & check-up",
        description:
          "Pacotes de exames com agendamento integrado e resultados digitais.",
      },
      {
        title: "Telemedicina",
        description:
          "Consultas online para acompanhamento e orientações à distância.",
      },
    ],
    cta: {
      title: "Cuide da sua saúde com quem entende.",
      description:
        "Agende sua consulta pelo site ou entre em contato com nossa equipe de atendimento.",
      button: "Agendar consulta",
    },
    meta: {
      title: "Instituto Harmonia | Clínica Moderna — Demonstração DWS",
      description:
        "Projeto demonstrativo de site para clínica moderna. Desenvolvido pela Dechen Web Studio.",
    },
  },
  {
    slug: "empresa",
    brand: "Vertex Consultoria",
    title: "Empresa / Consultoria",
    category: "Corporativo",
    description:
      "Presença institucional que transmite autoridade e gera leads qualificados.",
    gradient: "from-[#0070F3]/25 via-indigo-900/10 to-transparent",
    accentText: "text-[#0070F3]",
    accentBorder: "border-[#0070F3]/30",
    accentGlow: "shadow-[0_0_40px_rgba(0,112,243,0.15)]",
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
        "Atuamos lado a lado com líderes e equipes para identificar oportunidades, reduzir riscos e construir planos de crescimento sustentável.",
    },
    services: [
      {
        title: "Planejamento estratégico",
        description:
          "Diagnóstico, metas claras e roadmap de execução para os próximos 12–36 meses.",
      },
      {
        title: "Gestão financeira",
        description:
          "Estruturação de fluxo de caixa, precificação e indicadores de performance.",
      },
      {
        title: "Operações & processos",
        description:
          "Mapeamento, otimização e automação para ganho de eficiência.",
      },
      {
        title: "Mentoria executiva",
        description:
          "Acompanhamento próximo de founders e diretores em decisões críticas.",
      },
    ],
    cta: {
      title: "Pronto para acelerar seu crescimento?",
      description:
        "Agende uma conversa diagnóstica sem compromisso com nossa equipe.",
      button: "Solicitar conversa",
    },
    meta: {
      title: "Vertex Consultoria | Empresa — Demonstração DWS",
      description:
        "Projeto demonstrativo de site institucional para consultoria. Desenvolvido pela Dechen Web Studio.",
    },
  },
];

export function getPortfolioDemo(slug: string) {
  return portfolioDemos.find((demo) => demo.slug === slug);
}
