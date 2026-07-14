import { Button, FadeIn } from "./ui";

export function FinalCTA() {
  return (
    <section
      id="agendar"
      className="relative overflow-hidden border-t border-[rgba(196,163,90,0.12)] px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#14110E] via-[#100E0C] to-[#0C0A09]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(196,163,90,0.14), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.28em] text-[#C4A35A] uppercase">
            Agendamento
          </p>
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-[#F2EBE0] md:text-4xl lg:text-5xl">
            Pronto para elevar sua presença?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-[#9A9186] md:text-lg">
            Agende seu horário e viva uma experiência de barbearia feita para
            homens exigentes.
          </p>
          <div className="mt-10">
            <Button href="#agendar" className="min-w-[200px]">
              Agendar agora
            </Button>
          </div>
          <p className="mt-6 font-sans text-xs tracking-wide text-[#9A9186]/70">
            Demonstração — agendamento ilustrativo, sem envio real.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
