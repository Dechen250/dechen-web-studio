import { ButtonLink } from "@/components/dws/ButtonLink";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { SplitHeading } from "@/components/motion/SplitHeading";

export function Hero() {
  return (
    <section className="px-5 pt-28 pb-16 md:px-6 md:pt-32 md:pb-20 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SplitHeading
            as="p"
            immediate
            className="mb-5 text-sm text-[#8A8A96]"
          >
            Studio de sites para negócios locais
          </SplitHeading>
          <SplitHeading
            as="h1"
            immediate
            delayMs={80}
            className="text-balance text-[2.125rem] leading-[1.12] font-semibold tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem] lg:leading-[1.06]"
          >
            Um site que faz o cliente falar com você.
          </SplitHeading>
          <SplitHeading
            as="p"
            immediate
            delayMs={220}
            className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-[#B4B4BE] sm:text-lg"
          >
            Trabalhamos com clínicas, lojas, restaurantes e consultorias. O
            site explica o que você faz, carrega rápido no celular e deixa o
            WhatsApp à vista.
          </SplitHeading>
          <div className="dws-hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#contato" className="w-full sm:w-auto">
              Pedir orçamento
            </ButtonLink>
            <ButtonLink
              href="#trabalhos"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Ver trabalhos
            </ButtonLink>
          </div>
          <SplitHeading
            as="p"
            immediate
            delayMs={420}
            className="mt-8 text-sm text-[#6B6B76]"
          >
            7 a 14 dias para publicar · Resposta em até 24h
          </SplitHeading>
        </div>

        <div className="dws-hero-media">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
