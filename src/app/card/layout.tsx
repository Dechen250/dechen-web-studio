import type { Metadata, Viewport } from "next";
import { SITE_URL, cardProfile } from "@/lib/site";
import "./card.css";

const title = `${cardProfile.name} · ${cardProfile.company}`;
const description = cardProfile.tagline;
const url = `${SITE_URL}/card`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/card" },
  appleWebApp: {
    capable: true,
    title: cardProfile.company,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url,
    siteName: cardProfile.company,
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
