import type { Metadata } from "next";
import Link from "next/link";

import { AuditoriaPublica } from "./AuditoriaPublica";

export const metadata: Metadata = {
  title: "Auditoria técnica gratuita",
  description:
    "Meça a fundação do seu site: velocidade, SEO técnico, HTTPS e canal de contato. Sem Chrome local — via PageSpeed Insights.",
};

export default function AuditoriaPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-5 py-12 md:px-8 md:py-16">
        <header className="space-y-4">
          <p className="text-[13px] tracking-[0.18em] text-[#A1A1AA] uppercase">
            Dechen Web Studio
          </p>
          <h1 className="font-sans text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Auditoria técnica do seu site
          </h1>
          <p className="max-w-2xl text-base text-[#A1A1AA] md:text-lg">
            Cole o domínio. A gente mede velocidade, SEO técnico e se o visitante consegue
            falar com você. É laboratório — uma página, um carregamento — não um orçamento.
          </p>
        </header>

        <AuditoriaPublica />

        <p className="text-sm text-[#A1A1AA]">
          <Link href="/" className="text-[#0070F3]">
            Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}
