import type { Metadata } from "next";
import { Bebas_Neue, Inter, Playfair_Display } from "next/font/google";
import "./barbearia-royal.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barbearia Royal | Cortes Premium — Showcase Dechen Web Studio",
  description:
    "Landing page demonstrativa de barbearia premium: cortes precisos, experiência sofisticada e atendimento de alto nível. Desenvolvido pela Dechen Web Studio.",
  openGraph: {
    title: "Barbearia Royal | Barbearia Premium",
    description:
      "Cortes precisos. Experiência de respeito. Showcase de barbearia de alto padrão pela Dechen Web Studio.",
    type: "website",
    locale: "pt_BR",
  },
};

const barbershopJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Barbearia Royal",
  description:
    "Barbearia premium para homens que valorizam presença, estilo e atendimento de alto nível.",
  priceRange: "$$",
  telephone: "+55-11-4000-2929",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Augusta, 1840",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01412-000",
    addressCountry: "BR",
  },
};

export default function BarbeariaRoyalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`showcase-royal min-h-full w-full bg-[#0A0A0A] text-[#FAFAF9] antialiased ${bebas.variable} ${inter.variable} ${playfair.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(barbershopJsonLd) }}
      />
      {children}
    </div>
  );
}
