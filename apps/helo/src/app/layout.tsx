import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helo",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#050505",
          color: "#f5f5f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
