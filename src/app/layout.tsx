import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AGENCY, INSTAGRAM_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = `https://${AGENCY.domain}`;
const siteTitle = `${AGENCY.name} | Sites para negócios locais`;
const siteDescription =
  "Sites para clínicas, lojas, restaurantes e consultorias. Rápidos no celular, com um caminho claro para o WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Dechen Web Studio",
  },
  description: siteDescription,
  applicationName: AGENCY.name,
  keywords: [
    "criação de sites",
    "sites para empresas",
    "landing page",
    "site institucional",
    "web design São Paulo",
    "site para clínica",
    "site para restaurante",
  ],
  authors: [{ name: AGENCY.name, url: siteUrl }],
  creator: AGENCY.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: AGENCY.name,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: AGENCY.name,
  url: siteUrl,
  email: AGENCY.email,
  telephone: "+55-11-97450-2226",
  sameAs: [INSTAGRAM_URL],
  description: siteDescription,
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  serviceType: [
    "Landing Pages",
    "Sites Institucionais",
    "Portfólios Profissionais",
    "Manutenção de Sites",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
