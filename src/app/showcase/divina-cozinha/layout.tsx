import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./divina-cozinha.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
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
  title: "Divina Cozinha | Restaurante Contemporâneo em São Paulo",
  description:
    "Ingredientes selecionados, ambiente acolhedor e alta gastronomia. Reserve sua mesa na Divina Cozinha. Showcase pela Dechen Web Studio.",
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
      className={`showcase-divina relative min-h-full antialiased ${plusJakarta.variable} ${playfair.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      {children}
    </div>
  );
}
