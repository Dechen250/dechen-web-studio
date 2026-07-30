export const siteInfo = {
  name: "Instituto Harmonia",
  tagline: "Saúde com atenção de verdade.",
  phone: "(11) 3088-4410",
  whatsapp: "551130884410",
  email: "contato@institutoharmonia.com.br",
  instagram: "https://instagram.com/institutoharmonia",
  address: {
    street: "Rua Oscar Freire, 742",
    neighborhood: "Jardins",
    city: "São Paulo",
    state: "SP",
    zip: "01426-000",
    full: "Rua Oscar Freire, 742 — Jardins, São Paulo — SP",
  },
  hours: [
    { days: "Segunda a Sexta", time: "8h — 19h" },
    { days: "Sábado", time: "8h — 13h" },
    { days: "Domingo", time: "Fechado" },
  ],
};

export const navLinks = [
  { href: "#especialidades", label: "Especialidades" },
  { href: "#equipe", label: "Equipe" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#agendar", label: "Agendar" },
  { href: "#local", label: "Local" },
] as const;

export const specialties = [
  {
    title: "Clínica geral",
    description:
      "Avaliação completa, prevenção e acompanhamento contínuo do seu bem-estar.",
  },
  {
    title: "Cardiologia",
    description:
      "Cuidado cardiovascular com exames, orientação e plano personalizado.",
  },
  {
    title: "Dermatologia",
    description:
      "Saúde e equilíbrio da pele com abordagem clínica e estética responsável.",
  },
  {
    title: "Ortopedia",
    description:
      "Diagnóstico e tratamento de dores, lesões e mobilidade no dia a dia.",
  },
  {
    title: "Nutrição",
    description:
      "Planos alimentares alinhados à sua rotina, metas e histórico de saúde.",
  },
  {
    title: "Telemedicina",
    description:
      "Consultas online para retorno, orientação e acompanhamento à distância.",
  },
];

export const team = [
  {
    name: "Dra. Helena Vasconcelos",
    role: "Clínica geral · Diretora médica",
    bio: "15 anos de experiência em medicina preventiva e cuidado integrado.",
    image: "/showcase/instituto-harmonia/equipe/dra-helena.jpg",
  },
  {
    name: "Dr. Marcus Oliveira",
    role: "Cardiologista",
    bio: "Foco em prevenção cardiovascular e acompanhamento de longo prazo.",
    image: "/showcase/instituto-harmonia/equipe/dr-marcus.jpg",
  },
  {
    name: "Dra. Sofia Mendes",
    role: "Dermatologista",
    bio: "Cuidado clínico e estético com ênfase em naturalidade e segurança.",
    image: "/showcase/instituto-harmonia/equipe/dra-sofia.jpg",
  },
];

export const steps = [
  {
    step: "01",
    title: "Escolha a especialidade",
    description: "Diga o que você precisa — ou peça orientação no primeiro contato.",
  },
  {
    step: "02",
    title: "Agende pelo site",
    description: "Preencha o formulário e confirme o horário pelo WhatsApp.",
  },
  {
    step: "03",
    title: "Receba o cuidado",
    description: "Atendimento humanizado, plano claro e próximos passos definidos.",
  },
];

export const trustPoints = [
  "Equipe multidisciplinar no mesmo endereço",
  "Horários respeitados, sem espera longa",
  "Plano de cuidado explicado com clareza",
];

export const ambientImages = [
  {
    src: "/showcase/instituto-harmonia/ambiente/consultorio.jpg",
    alt: "Consultório acolhedor do Instituto Harmonia",
  },
  {
    src: "/showcase/instituto-harmonia/ambiente/recepcao.jpg",
    alt: "Recepção do Instituto Harmonia",
  },
  {
    src: "/showcase/instituto-harmonia/ambiente/sala-espera.jpg",
    alt: "Sala de espera do Instituto Harmonia",
  },
];

export const heroImage = {
  src: "/showcase/instituto-harmonia/capa/capa.jpg",
  alt: "Ambiente clínico acolhedor do Instituto Harmonia",
};

export const WHATSAPP_DEFAULT =
  "Olá! Vim pelo site do Instituto Harmonia e gostaria de agendar uma consulta.";

export function whatsappUrl(message = WHATSAPP_DEFAULT) {
  return `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildAppointmentMessage(input: {
  name: string;
  phone: string;
  specialty: string;
  message: string;
}) {
  return [
    "Olá! Vim pelo site do Instituto Harmonia.",
    "",
    `Nome: ${input.name}`,
    `Telefone: ${input.phone}`,
    `Especialidade: ${input.specialty}`,
    `Mensagem: ${input.message}`,
  ].join("\n");
}
