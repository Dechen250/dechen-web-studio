import { siteInfo, whatsappUrl } from "@/data/nn-estetica-beleza";
import { Button, FadeIn } from "./ui";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-[94vh] overflow-hidden pt-[5.5rem] md:pt-24"
    >
      <div className="hero-atmosphere absolute inset-0" />
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="hero-orb pointer-events-none absolute top-[18%] right-[8%] h-64 w-64 rounded-full blur-2xl md:h-80 md:w-80"
        aria-hidden
      />
      <div
        className="hero-orb pointer-events-none absolute bottom-[12%] left-[6%] h-40 w-40 rounded-full blur-3xl opacity-70"
        aria-hidden
        style={{ animationDelay: "2.8s" }}
      />
      <p
        className="pointer-events-none absolute right-[-4%] bottom-[8%] hidden select-none font-display text-[11rem] leading-none font-medium text-[#9A6B5A]/[0.07] md:block"
        aria-hidden
      >
        NN
      </p>

      <div className="relative mx-auto flex min-h-[94vh] max-w-6xl flex-col justify-center px-5 py-24 md:px-8 md:py-32">
        <FadeIn immediate>
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.28em] text-[#9A6B5A] uppercase">
            Estética em {siteInfo.city}
          </p>
        </FadeIn>
        <FadeIn immediate delayMs={80}>
          <p className="mb-3 font-display text-xl font-medium tracking-tight text-[#9A6B5A] md:text-2xl">
            {siteInfo.name}
          </p>
        </FadeIn>
        <FadeIn immediate delayMs={140}>
          <h1 className="max-w-xl font-display text-4xl leading-[1.12] font-medium tracking-tight text-[#2B2420] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
        </FadeIn>
        <FadeIn immediate delayMs={220}>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-[#7A716A] md:text-lg">
            Emagrecimento, harmonização facial e corporal e estrias — com
            avaliação individual antes de qualquer protocolo.
          </p>
        </FadeIn>
        <FadeIn immediate delayMs={300}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Agendar avaliação no WhatsApp
            </Button>
            <Button href="#tratamentos" variant="secondary">
              Ver tratamentos
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
