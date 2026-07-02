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
  image: string;
  imageAlt: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
};

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
        image:
          "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
        imageAlt: "Bruschetta elegante em prato de cerâmica",
      },
      {
        name: "Burrata com figos",
        description: "Burrata cremosa, figos frescos, mel silvestre e redução balsâmica.",
        price: "R$ 62",
        image:
          "https://images.unsplash.com/photo-1608897012199-3a34a28e1c1b?w=800&q=80",
        imageAlt: "Burrata com figos e ingredientes frescos",
      },
      {
        name: "Carpaccio de vitela",
        description: "Lâminas finas, rúcula, parmesão e alcaparras.",
        price: "R$ 58",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        imageAlt: "Carpaccio de vitela servido com elegância",
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
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
        imageAlt: "Risoto cremoso de funghi",
      },
      {
        name: "Linguine ao frutos do mar",
        description: "Massa fresca, camarões, lulas e molho de tomate delicado.",
        price: "R$ 98",
        image:
          "https://images.unsplash.com/photo-1563379926898-05f4575a58d8?w=800&q=80",
        imageAlt: "Massa com frutos do mar",
      },
      {
        name: "Filé ao molho de vinho",
        description: "Medalhão grelhado, purê de batata trufado e legumes da estação.",
        price: "R$ 112",
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        imageAlt: "Filé grelhado com acompanhamentos refinados",
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
        image:
          "https://images.unsplash.com/photo-1533134242443-10ceb503b40d?w=800&q=80",
        imageAlt: "Cheesecake com frutas vermelhas",
      },
      {
        name: "Tiramisù clássico",
        description: "Mascarpone, café espresso e cacau amargo.",
        price: "R$ 42",
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
        imageAlt: "Tiramisù em taça elegante",
      },
      {
        name: "Petit gâteau",
        description: "Chocolate belga, sorvete de baunilha e frutas frescas.",
        price: "R$ 45",
        image:
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
        imageAlt: "Petit gâteau com sorvete",
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
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        imageAlt: "Taças de vinho em ambiente elegante",
      },
      {
        name: "Spritz Divina",
        description: "Drink autoral com prosecco, bitter e toque cítrico.",
        price: "R$ 36",
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
        imageAlt: "Coquetel refrescante em copo alto",
      },
      {
        name: "Espresso & digestivos",
        description: "Café especial e seleção de licores finos.",
        price: "R$ 18",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        imageAlt: "Café espresso servido com elegância",
      },
    ],
  },
];

export const ambienteGallery = [
  {
    title: "Salão principal",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
    alt: "Salão principal do restaurante com iluminação quente",
  },
  {
    title: "Mesas",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
    alt: "Mesa elegante preparada para jantar",
  },
  {
    title: "Cozinha aberta",
    image:
      "https://images.unsplash.com/photo-1414235073718-c05f46abe792?w=900&q=80",
    alt: "Cozinha aberta com chefs em ação",
  },
  {
    title: "Iluminação",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed58?w=900&q=80",
    alt: "Detalhes de iluminação acolhedora",
  },
  {
    title: "Decoração",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80",
    alt: "Decoração contemporânea com plantas e madeira",
  },
  {
    title: "Adega",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80",
    alt: "Adega com garrafas selecionadas",
  },
];

export const heroImage = {
  src: "https://images.unsplash.com/photo-1414235073718-c05f46abe792?w=1600&q=85",
  alt: "Prato sofisticado em mesa elegante no Divina Cozinha",
};
