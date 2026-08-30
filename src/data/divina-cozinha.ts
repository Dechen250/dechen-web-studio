export const siteInfo = {
  name: "Divina Cozinha",
  tagline: "Uma experiência gastronômica inesquecível.",
  phone: "(11) 3456-7890",
  whatsapp: "551134567890",
  email: "reservas@divinacozinha.com.br",
  instagram: "https://instagram.com/divinacozinha",
  address: {
    street: "Rua das Oliveiras, 128",
    neighborhood: "Jardins",
    city: "São Paulo",
    state: "SP",
    zip: "01415-000",
    full: "Rua das Oliveiras, 128 — Jardins, São Paulo — SP",
  },
  hours: [
    { days: "Terça a Quinta", time: "12h — 15h · 19h — 23h" },
    { days: "Sexta e Sábado", time: "12h — 00h" },
    { days: "Domingo", time: "12h — 17h" },
    { days: "Segunda", time: "Fechado" },
  ],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2!2d-46.658!3d-23.568!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM0JzA1LjAiUyA0NsKwMzknMjguOCJX!5e0!3m2!1spt-BR!2sbr!4v1",
};

export const navLinks = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#ambiente", label: "Ambiente" },
  { href: "#localizacao", label: "Local" },
] as const;

export const marqueeItems = [
  "Da fazenda à mesa",
  "Ingredientes da estação",
  "Alta gastronomia",
  "Menus sazonais",
  "Harmonização de vinhos",
];

export const chef = {
  name: "Helena Duarte",
  role: "Chef executiva",
  headline: "Magia culinária,",
  italic: "sou a Helena.",
  paragraphs: [
    "A Divina Cozinha nasceu da ideia de transformar refeições em experiências memoráveis. Cada prato é preparado com ingredientes cuidadosamente selecionados, respeitando sabores tradicionais e técnicas contemporâneas.",
    "Estou aqui para mostrar que massas artesanais, molhos lentos e uma mesa bem recebida são mais simples — e mais especiais — do que se imagina.",
  ],
  stats: [
    { value: "12+", label: "Pratos na carta" },
    { value: "4,9", label: "Avaliação" },
  ],
  liveLabel: "Abrindo massa",
  image:
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=85",
  imageAlt: "Chef Helena Duarte na cozinha da Divina Cozinha",
  avatar:
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80",
};

export const hero = {
  badge: "Escolha do Chef",
  prep: "Jardins · SP",
  headline: "Mais do que uma",
  headlineItalic: "refeição",
  description:
    "Ingredientes selecionados, ambiente acolhedor e alta gastronomia se unem para criar momentos inesquecíveis.",
  image:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80",
  imageAlt: "Prato sofisticado em mesa elegante no Divina Cozinha",
};

export const seasonalCard = {
  label: "Da estação",
  title: "Ervas essenciais da primavera",
  chefName: "Chef Helena",
  chefMeta: "Direto da horta",
  image:
    "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80",
};

export const featureCard = {
  title: "Carta de vinhos 2026",
  cta: "Leia a carta",
  href: "#cardapio",
  image:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
  imageAlt: "Taças e rótulos da adega da Divina Cozinha",
};

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt?: string;
  time?: string;
  difficulty?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  badge: string;
  description: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    title: "Entradas",
    badge: "Entrada",
    description:
      "Pequenos pratos que despertam o paladar e preparam o início da experiência.",
    items: [
      {
        name: "Bruschetta de tomate confit",
        description:
          "Pão artesanal, tomates confitados, manjericão e azeite trufado.",
        price: "R$ 48",
        time: "15 min",
        difficulty: "Fácil",
        image:
          "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=900&q=85",
        imageAlt: "Bruschetta de tomate confit com manjericão",
      },
      {
        name: "Burrata com figos",
        description:
          "Burrata cremosa, figos frescos, mel silvestre e redução balsâmica.",
        price: "R$ 62",
        time: "12 min",
        difficulty: "Fácil",
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=900&q=85",
        imageAlt: "Burrata com figos frescos e mel",
      },
      {
        name: "Carpaccio de vitela",
        description: "Lâminas finas, rúcula, parmesão e alcaparras.",
        price: "R$ 58",
        time: "20 min",
        difficulty: "Médio",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&q=85",
        imageAlt: "Carpaccio de vitela com rúcula e parmesão",
      },
    ],
  },
  {
    id: "principais",
    title: "Pratos principais",
    badge: "Jantar",
    description:
      "Receitas autorais que unem tradição, criatividade e ingredientes selecionados.",
    items: [
      {
        name: "Risoto de funghi",
        description:
          "Arborio, mix de cogumelos, parmesão e finalização com trufa.",
        price: "R$ 89",
        time: "40 min",
        difficulty: "Médio",
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=900&q=85",
        imageAlt: "Risoto de funghi finalizado com trufa",
      },
      {
        name: "Linguine ao frutos do mar",
        description:
          "Massa fresca, camarões, lulas e molho de tomate delicado.",
        price: "R$ 98",
        time: "35 min",
        difficulty: "Médio",
        image:
          "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=900&q=85",
        imageAlt: "Linguine aos frutos do mar",
      },
      {
        name: "Filé ao molho de vinho",
        description:
          "Medalhão grelhado, purê de batata trufado e legumes da estação.",
        price: "R$ 112",
        time: "45 min",
        difficulty: "Médio",
        image:
          "https://images.unsplash.com/photo-1600891964092-4316aa111d57?w=900&q=85",
        imageAlt: "Filé ao molho de vinho com purê e legumes",
      },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    badge: "Sobremesa",
    description:
      "Finalizações delicadas para tornar sua experiência ainda mais especial.",
    items: [
      {
        name: "Cheesecake de frutas vermelhas",
        description:
          "Base crocante, creme leve e calda de frutas da estação.",
        price: "R$ 38",
        time: "20 min",
        difficulty: "Fácil",
        image:
          "https://images.unsplash.com/photo-1533134242820-b4d0dacc89a5?w=900&q=85",
        imageAlt: "Cheesecake de frutas vermelhas",
      },
      {
        name: "Tiramisù clássico",
        description: "Mascarpone, café espresso e cacau amargo.",
        price: "R$ 42",
        time: "25 min",
        difficulty: "Médio",
        image:
          "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=900&q=85",
        imageAlt: "Tiramisù clássico com cacau",
      },
      {
        name: "Petit gâteau",
        description: "Chocolate belga, sorvete de baunilha e frutas frescas.",
        price: "R$ 45",
        time: "18 min",
        difficulty: "Médio",
        image:
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=900&q=85",
        imageAlt: "Petit gâteau de chocolate com sorvete",
      },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    badge: "Carta",
    description:
      "Uma seleção de vinhos, drinks e bebidas cuidadosamente escolhidas para harmonizar com cada prato.",
    items: [
      {
        name: "Seleção de vinhos",
        description:
          "Rótulos nacionais e importados — consulte nossa carta completa.",
        price: "A partir de R$ 68",
        time: "Sommelier",
        difficulty: "Harmonize",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=85",
        imageAlt: "Seleção de vinhos da casa",
      },
      {
        name: "Spritz Divina",
        description: "Drink autoral com prosecco, bitter e toque cítrico.",
        price: "R$ 36",
        time: "5 min",
        difficulty: "Fácil",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85",
        imageAlt: "Spritz Divina servido no copo",
      },
      {
        name: "Espresso & digestivos",
        description: "Café especial e seleção de licores finos.",
        price: "R$ 18",
        time: "3 min",
        difficulty: "Fácil",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=85",
        imageAlt: "Espresso e digestivos",
      },
    ],
  },
];

export const featuredDishes = [
  {
    ...menuCategories[1].items[1],
    badge: "Jantar",
  },
  {
    ...menuCategories[0].items[1],
    badge: "Entrada",
  },
  {
    ...menuCategories[2].items[2],
    badge: "Sobremesa",
  },
  {
    ...menuCategories[3].items[1],
    badge: "Carta",
  },
];

export const cuisineList = [
  { id: "01", name: "Italiana contemporânea", image: menuCategories[1].items[1].image },
  { id: "02", name: "Sabores da estação", image: seasonalCard.image },
  { id: "03", name: "Confeitaria da casa", image: menuCategories[2].items[0].image },
  { id: "04", name: "Adega e harmonização", image: featureCard.image },
];

export const ambienteGallery = [
  {
    title: "Salão principal",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
    alt: "Salão principal do restaurante com iluminação quente",
  },
  {
    title: "Mesas",
    image:
      "https://images.unsplash.com/photo-1414235073718-c05f46abe792?w=900&q=85",
    alt: "Mesa elegante preparada para jantar",
  },
  {
    title: "Cozinha aberta",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85",
    alt: "Cozinha aberta com chefs em ação",
  },
  {
    title: "Iluminação",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=85",
    alt: "Detalhes de iluminação acolhedora",
  },
  {
    title: "Decoração",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=85",
    alt: "Decoração contemporânea com plantas e madeira",
  },
  {
    title: "Adega",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=85",
    alt: "Adega com garrafas selecionadas",
  },
];

export const offerings = [
  {
    id: "cardapio",
    title: "Carta da casa",
    description:
      "Entradas, principais e sobremesas da estação — preparados na hora, com ingredientes selecionados.",
    href: "#cardapio",
    cta: "Ver cardápio",
    icon: "chef" as const,
    featured: false,
  },
  {
    id: "reservas",
    title: "Reserve sua mesa",
    description:
      "Garanta a melhor data e horário. Formulário demonstrativo — sem envio real neste showcase.",
    href: "#reservas",
    cta: "Reservar mesa",
    icon: "letter" as const,
    featured: true,
  },
  {
    id: "eventos",
    title: "Eventos privados",
    description:
      "Mesas longas, menu degustação e a adega da casa para celebrações no Jardins.",
    href: "#ambiente",
    cta: "Ver ambiente",
    icon: "shop" as const,
    featured: false,
  },
];

export const testimonials = [
  {
    name: "Ana Beatriz Lima",
    role: "Arquiteta",
    quote:
      "A linguine é o prato mais elegante que já pedi em São Paulo. Cada detalhe da mesa parece pensado para a gente.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d8d?w=200&q=80",
    featured: true,
  },
  {
    name: "Camila Rocha",
    role: "Blogueira de gastronomia",
    quote:
      "Finalmente um restaurante focado em técnica, e não só em apresentação. O empratamento e o serviço são impecáveis.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    featured: false,
  },
  {
    name: "Ricardo Mendes",
    role: "Sommelier",
    quote:
      "O filé ao vinho e a carta — um par raro. Volto sempre que quero impressionar alguém sem parecer esforço.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    featured: false,
  },
];

export const testimonialStats = {
  rating: "4,9",
  members: "12k+",
  membersDelta: "+140 esta semana",
};
