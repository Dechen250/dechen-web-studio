import { siteInfo } from "@/data/barbearia-royal";
import { Button, FadeIn } from "./ui";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="hero-atmosphere absolute inset-0" aria-hidden />
      <div className="hero-grain absolute inset-0 opacity-60" aria-hidden />

      {/* Decorative vertical gold line */}
      <div
        className="pointer-events-none absolute top-0 right-[12%] hidden h-full w-px bg-gradient-to-b from-transparent via-[#C4A35A]/30 to-transparent lg:block"
        aria-hidden
      />

      {/* Abstract razor / geometric accent */}
      <div
        className="pointer-events-none absolute top-1/2 right-[8%] hidden h-64 w-64 -translate-y-1/2 lg:block"
        aria-hidden
      >
        <div className="absolute inset-8 rounded-full border border-[rgba(196,163,90,0.15)]" />
        <div className="absolute inset-16 rounded-full border border-[rgba(196,163,90,0.08)]" />
        <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C4A35A]/40 to-transparent" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-[#C4A35A]/25 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 py-32 md:px-8">
        <FadeIn>
          <p className="mb-5 font-sans text-xs font-medium tracking-[0.3em] text-[#C4A35A] uppercase">
            Barbearia de alto padrão
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] font-medium tracking-tight text-[#F2EBE0] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#9A9186] md:text-lg">
            Uma barbearia premium para homens que valorizam presença, estilo e
            atendimento de alto nível.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#agendar">Agendar horário</Button>
            <Button href="#servicos" variant="secondary">
              Ver serviços
            </Button>
          </div>
        </FadeIn>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0A09] to-transparent"
        aria-hidden
      />
    </section>
  );
}
