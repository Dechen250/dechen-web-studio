import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./vertex-consultoria.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vertex Consultoria | Estratégia & Crescimento — Showcase DWS",
  description:
    "Consultoria institucional com método, serviços e conversão de leads. Showcase da Dechen Web Studio.",
  openGraph: {
    title: "Vertex Consultoria | Decisões melhores. Resultados reais.",
    description:
      "Showcase de consultoria estratégica pela Dechen Web Studio.",
    type: "website",
    locale: "pt_BR",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vertex Consultoria",
  description:
    "Consultoria estratégica para empresas em crescimento: operação, finanças e decisão baseada em dados.",
  telephone: "+55-11-3045-8890",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Brigadeiro Faria Lima, 3477",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "04538-133",
    addressCountry: "BR",
  },
};

export default function VertexConsultoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`showcase-vertex min-h-full ${syne.variable} ${manrope.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {children}
    </div>
  );
}
