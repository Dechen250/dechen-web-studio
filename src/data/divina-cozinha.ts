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
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2!2d-46.658!3d-23.568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM0JzA1LjAiUyA0NsKwMzknMjguOCJX!5e0!3m2!1spt-BR!2sbr!4v1",
};

export const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#ambiente", label: "Ambiente" },
  { href: "#reservas", label: "Reservas" },
  { href: "#localizacao", label: "Localização" },
] as const;

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  /** Caminho local (.webp, .jpg, .png) — omitir até existir foto real */
  image?: string;
  imageAlt?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
};

const REAL_IMAGE_EXT = /\.(webp|jpe?g|png|avif)$/i;

/** Exibe imagem no card apenas com asset local real — nunca SVG ou URL externa */
export function hasValidMenuImage(item: MenuItem): boolean {
  if (!item.image) return false;
  if (item.image.startsWith("http") || item.image.endsWith(".svg")) return false;
  return REAL_IMAGE_EXT.test(item.image);
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    title: "Entradas",
    description:
      "Pequenos pratos que despertam o paladar e preparam o início da experiência.",
    items: [
      {
        name: "Bruschetta de tomate confit",
        description: "Pão artesanal, tomates confitados, manjericão e azeite trufado.",
        price: "R$ 48",
        image: "/showcase/divina-cozinha/cardapio/entradas/bruschetta-tomate-confit.webp",
        imageAlt: "Bruschetta de tomate confit com manjericão",
      },
      {
        name: "Burrata com figos",
        description: "Burrata cremosa, figos frescos, mel silvestre e redução balsâmica.",
        price: "R$ 62",
        image: "/showcase/divina-cozinha/cardapio/entradas/burrata-com-figos.webp",
        imageAlt: "Burrata com figos frescos e mel",
      },
      {
        name: "Carpaccio de vitela",
        description: "Lâminas finas, rúcula, parmesão e alcaparras.",
        price: "R$ 58",
        image: "/showcase/divina-cozinha/cardapio/entradas/carpaccio-de-vitela.webp",
        imageAlt: "Carpaccio de vitela com rúcula e parmesão",
      },
    ],
  },
  {
    id: "principais",
    title: "Pratos Principais",
    description:
      "Receitas autorais que unem tradição, criatividade e ingredientes selecionados.",
    items: [
      {
        name: "Risoto de funghi",
        description: "Arborio, mix de cogumelos, parmesão e finalização com trufa.",
        price: "R$ 89",
        image: "/showcase/divina-cozinha/cardapio/pratos-principais/risoto-de-funghi.webp",
        imageAlt: "Risoto de funghi finalizado com trufa",
      },
      {
        name: "Linguine ao frutos do mar",
        description: "Massa fresca, camarões, lulas e molho de tomate delicado.",
        price: "R$ 98",
        image: "/showcase/divina-cozinha/cardapio/pratos-principais/linguine-frutos-do-mar.webp",
        imageAlt: "Linguine aos frutos do mar",
      },
      {
        name: "Filé ao molho de vinho",
        description: "Medalhão grelhado, purê de batata trufado e legumes da estação.",
        price: "R$ 112",
        image: "/showcase/divina-cozinha/cardapio/pratos-principais/file-ao-molho-de-vinho.webp",
        imageAlt: "Filé ao molho de vinho com purê e legumes",
      },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    description:
      "Finalizações delicadas para tornar sua experiência ainda mais especial.",
    items: [
      {
        name: "Cheesecake de frutas vermelhas",
        description: "Base crocante, creme leve e calda de frutas da estação.",
        price: "R$ 38",
        image: "/showcase/divina-cozinha/cardapio/sobremesas/cheesecake-frutas-vermelhas.webp",
        imageAlt: "Cheesecake de frutas vermelhas",
      },
      {
        name: "Tiramisù clássico",
        description: "Mascarpone, café espresso e cacau amargo.",
        price: "R$ 42",
        image: "/showcase/divina-cozinha/cardapio/sobremesas/tiramisu-classico.webp",
        imageAlt: "Tiramisù clássico com cacau",
      },
      {
        name: "Petit gâteau",
        description: "Chocolate belga, sorvete de baunilha e frutas frescas.",
        price: "R$ 45",
        image: "/showcase/divina-cozinha/cardapio/sobremesas/petit-gateau.webp",
        imageAlt: "Petit gâteau de chocolate com sorvete",
      },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    description:
      "Uma seleção de vinhos, drinks e bebidas cuidadosamente escolhidas para harmonizar com cada prato.",
    items: [
      {
        name: "Seleção de vinhos",
        description: "Rótulos nacionais e importados — consulte nossa carta completa.",
        price: "A partir de R$ 68",
        image: "/showcase/divina-cozinha/cardapio/bebidas/selecao-de-vinhos.webp",
        imageAlt: "Seleção de vinhos da casa",
      },
      {
        name: "Spritz Divina",
        description: "Drink autoral com prosecco, bitter e toque cítrico.",
        price: "R$ 36",
        image: "/showcase/divina-cozinha/cardapio/bebidas/spritz-divina.webp",
        imageAlt: "Spritz Divina servido no copo",
      },
      {
        name: "Espresso & digestivos",
        description: "Café especial e seleção de licores finos.",
        price: "R$ 18",
        image: "/showcase/divina-cozinha/cardapio/bebidas/espresso-digestivos.webp",
        imageAlt: "Espresso e digestivos",
      },
    ],
  },
];

export const ambienteGallery = [
  {
    title: "Salão principal",
    image: "/showcase/divina-cozinha/ambiente/salao-principal.jpg",
    alt: "Salão principal do restaurante com iluminação quente",
  },
  {
    title: "Mesas",
    image: "/showcase/divina-cozinha/ambiente/mesas.jpg",
    alt: "Mesa elegante preparada para jantar",
  },
  {
    title: "Cozinha aberta",
    image: "/showcase/divina-cozinha/ambiente/cozinha-aberta.webp",
    alt: "Cozinha aberta com chefs em ação",
  },
  {
    title: "Iluminação",
    image: "/showcase/divina-cozinha/ambiente/iluminacao.jpg",
    alt: "Detalhes de iluminação acolhedora",
  },
  {
    title: "Decoração",
    image: "/showcase/divina-cozinha/ambiente/decoracao.webp",
    alt: "Decoração contemporânea com plantas e madeira",
  },
  {
    title: "Adega",
    image: "/showcase/divina-cozinha/ambiente/adega.webp",
    alt: "Adega com garrafas selecionadas",
  },
];

export const heroImage = {
  src: "https://images.unsplash.com/photo-1414235073718-c05f46abe792?w=1600&q=85",
  alt: "Prato sofisticado em mesa elegante no Divina Cozinha",
};
