import Link from "next/link";
import type { PortfolioDemo } from "@/data/portfolio-demos";

const TRANSITION = "transition-all duration-[250ms] ease-out";

function DemoBadge() {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-widest text-[#A1A1AA] uppercase backdrop-blur-sm">
      Projeto demonstrativo
    </span>
  );
}

export default function PortfolioDemoPage({ demo }: { demo: PortfolioDemo }) {
  return (
    <div className="min-h-full bg-[#050505] font-sans text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#262626]/80 bg-[#050505]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <span className="text-sm font-semibold tracking-tight">
            {demo.brand}
          </span>
          <div className="flex items-center gap-4">
            <DemoBadge />
            <Link
              href="/#portfolio"
              className={`hidden text-sm text-[#A1A1AA] hover:text-white sm:inline ${TRANSITION}`}
            >
              ← Voltar ao portfólio
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className={`absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b ${demo.gradient} blur-3xl`}
            />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <p
              className={`mb-4 text-sm font-medium tracking-[0.15em] uppercase ${demo.accentText}`}
            >
              {demo.hero.eyebrow}
            </p>
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {demo.hero.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#A1A1AA]">
              {demo.hero.subheadline}
            </p>
            <button
              type="button"
              className={`mt-10 inline-flex h-14 items-center justify-center rounded-full border px-8 text-sm font-semibold backdrop-blur-md ${TRANSITION} hover:-translate-y-0.5 ${demo.accentBorder} bg-white/5 hover:bg-white/10 ${demo.accentGlow}`}
            >
              {demo.hero.cta}
            </button>
          </div>
        </section>

        {/* Proposta de valor */}
        <section className="border-t border-[#262626]/80 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {demo.valueProposition.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#A1A1AA]">
              {demo.valueProposition.description}
            </p>
          </div>
        </section>

        {/* Serviços / Benefícios */}
        <section className="border-t border-[#262626]/80 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight md:text-3xl">
              O que oferecemos
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {demo.services.map((service) => (
                <div
                  key={service.title}
                  className={`rounded-3xl border border-[#262626] bg-[#101010]/75 p-8 backdrop-blur-md ${TRANSITION} hover:border-[#404040]`}
                >
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#262626]/80 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className={`rounded-3xl border bg-[#101010]/80 p-12 backdrop-blur-md ${demo.accentBorder}`}
            >
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {demo.cta.title}
              </h2>
              <p className="mt-4 text-[#A1A1AA]">{demo.cta.description}</p>
              <button
                type="button"
                className={`mt-8 inline-flex h-14 items-center justify-center rounded-full border px-8 text-sm font-semibold backdrop-blur-md ${TRANSITION} hover:-translate-y-0.5 ${demo.accentBorder} bg-white/5 hover:bg-white/10`}
              >
                {demo.cta.button}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626]/80 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-[#A1A1AA]">
            &copy; {new Date().getFullYear()} {demo.brand}. Projeto demonstrativo
            —{" "}
            <Link href="/" className="hover:text-white">
              Dechen Web Studio
            </Link>
          </p>
          <Link
            href="/#portfolio"
            className={`inline-flex h-11 items-center justify-center rounded-full border border-[#262626] bg-[#101010]/60 px-6 text-sm text-[#A1A1AA] backdrop-blur-md ${TRANSITION} hover:border-[#404040] hover:text-white`}
          >
            ← Voltar ao portfólio
          </Link>
        </div>
      </footer>
    </div>
  );
}
