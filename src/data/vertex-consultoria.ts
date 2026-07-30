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
  { href: "#depoimentos", label: "Prova" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;

export const methodSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Mapeamos operação, números e gargalos com clareza — sem slides vazios.",
    detail:
      "Entrevistas com liderança, leitura de indicadores e priorização do que move caixa.",
  },
  {
    step: "02",
    title: "Arquitetura",
    description:
      "Definimos prioridade, metas e o sistema de execução para os próximos ciclos.",
    detail:
      "Roadmap de 90 dias, rituais de gestão e donos claros por frente.",
  },
  {
    step: "03",
    title: "Execução",
    description:
      "Acompanhamos a implementação com rituais, indicadores e ajustes semanais.",
    detail:
      "Cadência semanal, bloqueio de desvios e foco no que gera resultado cedo.",
  },
  {
    step: "04",
    title: "Escala",
    description:
      "Consolidamos o que funciona e preparamos a operação para crescer com controle.",
    detail:
      "Padronização, handoff interno e indicadores de saúde da operação.",
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

export const testimonials = [
  {
    quote: "Pela primeira vez o time decide com o mesmo mapa.",
    name: "Fernanda Alves",
    detail: "CEO · Operação B2B",
  },
  {
    quote: "Saiu de slide e virou ritual. Margem acompanhou.",
    name: "Diego Prado",
    detail: "CFO · Indústria",
  },
  {
    quote: "Diagnóstico duro, execução clara. Sem teatro.",
    name: "Marina Costa",
    detail: "COO · Serviços",
  },
];

export const aboutPoints = [
  {
    title: "Lado a lado",
    text: "Atuação com liderança — não relatório e sumiço.",
  },
  {
    title: "Prioridade real",
    text: "Foco no que move caixa, operação e crescimento.",
  },
  {
    title: "Linguagem clara",
    text: "Para quem decide — não jargão para impressionar.",
  },
];

export const resultImages = [
  {
    src: "/showcase/vertex-consultoria/resultados/escritorio.jpg",
    alt: "Escritório Vertex Consultoria",
    title: "Espaço de trabalho",
    subtitle: "Ambiente para decisão",
  },
  {
    src: "/showcase/vertex-consultoria/resultados/reuniao.jpg",
    alt: "Reunião estratégica com equipe",
    title: "Rituais de gestão",
    subtitle: "Cadência semanal",
  },
  {
    src: "/showcase/vertex-consultoria/resultados/analise.jpg",
    alt: "Análise de indicadores de crescimento",
    title: "Indicadores",
    subtitle: "Leitura que orienta",
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
