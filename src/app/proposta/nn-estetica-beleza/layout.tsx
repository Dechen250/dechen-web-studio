import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./nn-estetica.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NN Estética e Beleza | Proposta visual — Dechen Web Studio",
  description:
    "Esboço do site institucional da NN Estética e Beleza: emagrecimento, harmonização e estrias em São Bernardo do Campo. Preview com placeholders, ainda não é o site publicado.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "NN Estética e Beleza | Proposta visual DWS",
    description:
      "Preview interno da Dechen Web Studio para a lead NN Estética e Beleza. Dados comerciais ainda não confirmados.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function NnEsteticaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`proposta-nn min-h-full ${cormorant.variable} ${outfit.variable}`}
    >
      {children}
    </div>
  );
}
