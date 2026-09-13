export const siteInfo = {
  name: "NN Estética e Beleza",
  shortName: "NN Estética",
  tagline: "Cuidado estético com naturalidade e acompanhamento.",
  city: "São Bernardo do Campo",
  instagramHandle: "nnestetica.beleza",
  instagramUrl: "https://www.instagram.com/nnestetica.beleza/",
  whatsappChatUrl: "https://wa.me/message/4PRGSKHBVASSF1",
  whatsappDisplay: "[WhatsApp — confirmar]",
  email: "[e-mail — confirmar]",
  address: {
    line: "[rua, número, sala — confirmar]",
    neighborhood: "[bairro — confirmar]",
    city: "São Bernardo do Campo",
    state: "SP",
    full: "[endereço completo — confirmar], São Bernardo do Campo — SP",
  },
  hours: "[horários — confirmar]",
} as const;

export const navLinks = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#local", label: "Local" },
] as const;

export const treatments = [
  {
    id: "emagrecimento",
    title: "Emagrecimento",
    description:
      "Cuidado corporal focado em contorno e bem-estar, com indicação alinhada à sua rotina e ao que faz sentido para o seu caso.",
  },
  {
    id: "harmonizacao",
    title: "Harmonização facial e corporal",
    description:
      "Procedimentos para equilibrar proporções com aparência natural — sempre a partir de uma conversa sobre o que você busca e o que é possível.",
  },
  {
    id: "estrias",
    title: "Estrias",
    description:
      "Protocolos para melhorar o aspecto da pele, com expectativa honesta e acompanhamento.",
  },
] as const;

export const team = [
  {
    name: "Natany Nascimento",
    honorific: "Dra.",
    initials: "NN",
    role: "[papel — confirmar]",
    registry: "[conselho e número — confirmar]",
    bio: "[Uma frase da profissional — placeholder]",
  },
  {
    name: "Haiana Nascimento",
    honorific: "Dra.",
    initials: "HN",
    role: "[papel — confirmar]",
    registry: "[conselho e número — confirmar]",
    bio: "[Uma frase da profissional — placeholder]",
  },
] as const;

export const steps = [
  {
    step: "01",
    title: "Agende a avaliação",
    description: "Chame no WhatsApp e diga o que te incomoda.",
  },
  {
    step: "02",
    title: "Escuta e indicação",
    description:
      "Conversamos sobre histórico, objetivo e o que é adequado para você.",
  },
  {
    step: "03",
    title: "Acompanhamento",
    description:
      "O protocolo segue com retorno e orientação, sem pressa de resultado milagroso.",
  },
] as const;

export const faqs = [
  {
    question: "Preciso passar por avaliação?",
    answer:
      "Sim. Nenhum protocolo é indicado sem conversa prévia sobre o seu caso.",
  },
  {
    question: "Os tratamentos são iguais para todo mundo?",
    answer:
      "Não. A indicação depende de avaliação. O que funciona para uma pessoa pode não ser o caminho para outra.",
  },
  {
    question: "Como faço para agendar?",
    answer:
      "Pelo WhatsApp. Você pode escrever pelo site — a mensagem já sai pronta — ou pelo link da bio no Instagram.",
  },
  {
    question: "Onde vocês atendem?",
    answer:
      "Em São Bernardo do Campo. Endereço completo: [confirmar na descoberta].",
  },
] as const;

export const spaceSlots = [
  "Recepção",
  "Sala de procedimento",
  "Ambiente",
] as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da NN Estética e Beleza e gostaria de agendar uma avaliação.";

export function whatsappUrl() {
  return siteInfo.whatsappChatUrl;
}

export function buildAppointmentMessage(input: {
  name: string;
  phone: string;
  treatment: string;
  message: string;
}) {
  return [
    DEFAULT_WHATSAPP_MESSAGE,
    "",
    `Nome: ${input.name}`,
    `WhatsApp: ${input.phone}`,
    `Tratamento: ${input.treatment}`,
    `Mensagem: ${input.message}`,
  ].join("\n");
}
