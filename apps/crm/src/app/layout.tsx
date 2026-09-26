import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DWS CRM",
  description: "Leads da Dechen Web Studio",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
