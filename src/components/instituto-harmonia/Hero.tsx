import Image from "next/image";
import { heroImage, siteInfo, trustPoints } from "@/data/instituto-harmonia";
import { Button, FadeIn } from "./ui";

export function Hero() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover object-[center_30%] scale-105"
          sizes="100vw"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F8F7] via-[#F4F8F7]/20 to-transparent" />
      </div>

      <div
        className="hero-orb pointer-events-none absolute top-[22%] left-[8%] h-56 w-56 rounded-full blur-2xl md:h-72 md:w-72"
        aria-hidden
      />
      <div
        className="hero-orb pointer-events-none absolute right-[12%] bottom-[18%] h-40 w-40 rounded-full blur-3xl opacity-70"
        aria-hidden
        style={{ animationDelay: "2.5s" }}
      />

      <div className="relative mx-auto flex min-h-[94vh] max-w-6xl flex-col justify-center px-5 py-32 md:px-8">
        <FadeIn>
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.28em] text-[#2A7A6E] uppercase">
            Clínica multidisciplinar
          </p>
        </FadeIn>
        <FadeIn delayMs={80}>
          <p className="mb-3 font-display text-xl font-medium tracking-tight text-[#2A7A6E] md:text-2xl">
            {siteInfo.name}
          </p>
        </FadeIn>
        <FadeIn delayMs={140}>
          <h1 className="max-w-xl font-display text-4xl leading-[1.1] font-medium tracking-tight text-[#1A2E2B] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
        </FadeIn>
        <FadeIn delayMs={220}>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-[#5A6F6A] md:text-lg">
            Cuidado multidisciplinar com acolhimento real — do primeiro contato
            ao acompanhamento contínuo, com plano claro em cada etapa.
          </p>
        </FadeIn>
        <FadeIn delayMs={300}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#agendar">Agendar consulta</Button>
            <Button href="#especialidades" variant="secondary">
              Ver especialidades
            </Button>
          </div>
        </FadeIn>
        <FadeIn delayMs={380}>
          <ul className="mt-12 flex max-w-xl flex-col gap-3 border-t border-[#D5E4E0]/80 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 font-sans text-sm text-[#5A6F6A]"
              >
                <span
                  aria-hidden
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2A7A6E]/12 text-[10px] text-[#2A7A6E]"
                >
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
