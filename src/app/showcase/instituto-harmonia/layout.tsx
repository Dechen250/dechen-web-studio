import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./instituto-harmonia.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instituto Harmonia | Clínica Multidisciplinar — Showcase DWS",
  description:
    "Clínica moderna com cuidado humanizado, especialidades integradas e agendamento simples. Showcase da Dechen Web Studio.",
  openGraph: {
    title: "Instituto Harmonia | Clínica Moderna",
    description:
      "Saúde com atenção de verdade. Showcase de clínica multidisciplinar pela Dechen Web Studio.",
    type: "website",
    locale: "pt_BR",
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Instituto Harmonia",
  description:
    "Clínica multidisciplinar com foco em cuidado humanizado e prevenção.",
  telephone: "+55-11-3088-4410",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Oscar Freire, 742",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01426-000",
    addressCountry: "BR",
  },
};

export default function InstitutoHarmoniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`showcase-harmonia min-h-full ${fraunces.variable} ${outfit.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      {children}
    </div>
  );
}
