import { Button, FadeIn } from "./ui";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-[rgba(34,211,238,0.14)] px-5 py-24 md:px-8 md:py-32">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#121A24] via-[#0E1520] to-[#0B1118]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,211,238,0.14), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="section-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-4 font-sans text-xs font-semibold tracking-[0.32em] text-[#22D3EE] uppercase">
            Próximo ciclo
          </p>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-[#E8EEF4] md:text-4xl lg:text-5xl">
            Pronto para estruturar o próximo ciclo?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-[#8B9AAB] md:text-lg">
            Fale com um consultor e receba um diagnóstico claro do que trava —
            e do que acelera — a operação.
          </p>
          <div className="mt-10">
            <Button href="#contato" className="min-w-[220px]">
              Falar com consultor
            </Button>
          </div>
          <p className="mt-6 font-sans text-xs tracking-wide text-[#8B9AAB]/70">
            Demonstração — contato ilustrativo, sem envio real de backend.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
