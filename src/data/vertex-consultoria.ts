export const siteInfo = {
  name: "Vertex Consultoria",
  tagline: "Decisões melhores. Resultados reais.",
  phone: "(11) 3045-8890",
  whatsapp: "551130458890",
  email: "contato@vertexconsultoria.com.br",
  linkedin: "https://linkedin.com/company/vertexconsultoria",
  address: {
    street: "Av. Brigadeiro Faria Lima, 3477",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    zip: "04538-133",
    full: "Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi, São Paulo — SP",
  },
};

export const navLinks = [
  { href: "#metodo", label: "Método" },
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;

export const methodSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Mapeamos operação, números e gargalos com clareza — sem slides vazios.",
  },
  {
    step: "02",
    title: "Arquitetura",
    description:
      "Definimos prioridade, metas e o sistema de execução para os próximos ciclos.",
  },
  {
    step: "03",
    title: "Execução",
    description:
      "Acompanhamos a implementação com rituais, indicadores e ajustes semanais.",
  },
  {
    step: "04",
    title: "Escala",
    description:
      "Consolidamos o que funciona e preparamos a operação para crescer com controle.",
  },
];

export const services = [
  {
    title: "Planejamento estratégico",
    description:
      "Diagnóstico, metas claras e roadmap de execução para 12–36 meses.",
  },
  {
    title: "Gestão financeira",
    description:
      "Fluxo de caixa, precificação e indicadores que orientam decisão.",
  },
  {
    title: "Operações & processos",
    description:
      "Mapeamento, otimização e automação para ganho real de eficiência.",
  },
  {
    title: "Mentoria executiva",
    description:
      "Acompanhamento próximo de founders e diretores em decisões críticas.",
  },
];

export const results = [
  {
    value: "38%",
    label: "aumento médio de margem",
    detail: "em operações reestruturadas em 12 meses",
  },
  {
    value: "2.4x",
    label: "mais previsibilidade",
    detail: "no forecast comercial após rituais de gestão",
  },
  {
    value: "90 dias",
    label: "para primeiros ganhos",
    detail: "com foco em gargalos de maior impacto",
  },
];

export const aboutPoints = [
  "Atuação lado a lado com liderança — não relatório e sumiço.",
  "Prioridade no que move caixa, operação e crescimento.",
  "Linguagem clara para quem decide, não jargão para impressionar.",
];

export const resultImages = [
  {
    src: "/showcase/vertex-consultoria/resultados/escritorio.jpg",
    alt: "Escritório Vertex Consultoria",
  },
  {
    src: "/showcase/vertex-consultoria/resultados/reuniao.jpg",
    alt: "Reunião estratégica com equipe",
  },
  {
    src: "/showcase/vertex-consultoria/resultados/analise.jpg",
    alt: "Análise de indicadores de crescimento",
  },
];

export const WHATSAPP_DEFAULT =
  "Olá! Vim pelo site da Vertex Consultoria e gostaria de falar com um consultor.";

export function whatsappUrl(message = WHATSAPP_DEFAULT) {
  return `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildLeadMessage(input: {
  name: string;
  company: string;
  phone: string;
  challenge: string;
}) {
  return [
    "Olá! Vim pelo site da Vertex Consultoria.",
    "",
    `Nome: ${input.name}`,
    `Empresa: ${input.company}`,
    `Telefone: ${input.phone}`,
    `Desafio: ${input.challenge}`,
  ].join("\n");
}
