import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./divina-cozinha.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divina Cozinha | Restaurante Contemporâneo em São Paulo",
  description:
    "Ingredientes selecionados, ambiente acolhedor e alta gastronomia. Reserve sua mesa na Divina Cozinha.",
  openGraph: {
    title: "Divina Cozinha | Restaurante Contemporâneo",
    description:
      "Uma experiência gastronômica inesquecível no coração dos Jardins, São Paulo.",
    type: "website",
    locale: "pt_BR",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Divina Cozinha",
  description:
    "Restaurante de culinária contemporânea com ingredientes selecionados e ambiente acolhedor.",
  servesCuisine: "Contemporânea",
  priceRange: "$$$",
  telephone: "+55-11-3456-7890",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua das Oliveiras, 128",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01415-000",
    addressCountry: "BR",
  },
};

export default function DivinaCozinhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`showcase-divina min-h-full ${cormorant.variable} ${sourceSans.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      {children}
    </div>
  );
}
