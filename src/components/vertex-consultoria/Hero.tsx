import { siteInfo } from "@/data/vertex-consultoria";
import { Button, FadeIn } from "./ui";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="hero-glow absolute inset-0" aria-hidden />
      <div className="hero-grid absolute inset-0" aria-hidden />

      <div
        className="pointer-events-none absolute top-[18%] right-[8%] hidden h-72 w-72 border border-[rgba(34,211,238,0.18)] lg:block"
        aria-hidden
      >
        <div className="absolute inset-6 border border-[rgba(34,211,238,0.1)]" />
        <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-[#22D3EE]/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 py-32 md:px-8">
        <FadeIn>
          <p className="mb-4 font-display text-sm font-semibold tracking-[0.35em] text-[#22D3EE] uppercase">
            {siteInfo.name}
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-[#E8EEF4] md:text-6xl lg:text-7xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#8B9AAB] md:text-lg">
            Estruturamos operação, números e crescimento para empresas que
            precisam decidir com método — não com achismo.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#contato">Falar com consultor</Button>
            <Button href="#metodo" variant="secondary">
              Ver o método
            </Button>
          </div>
        </FadeIn>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1118] to-transparent"
        aria-hidden
      />
    </section>
  );
}
