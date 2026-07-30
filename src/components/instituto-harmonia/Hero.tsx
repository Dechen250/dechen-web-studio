import Image from "next/image";
import { heroImage, siteInfo, trustPoints } from "@/data/instituto-harmonia";
import { Button, FadeIn } from "./ui";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F8F7] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 py-32 md:px-8">
        <FadeIn>
          <p className="mb-3 font-display text-2xl font-medium tracking-tight text-[#2A7A6E] md:text-3xl">
            {siteInfo.name}
          </p>
          <h1 className="max-w-xl font-display text-4xl leading-[1.12] font-medium tracking-tight text-[#1A2E2B] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-[#5A6F6A] md:text-lg">
            Cuidado multidisciplinar com acolhimento real — do primeiro contato
            ao acompanhamento contínuo.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#agendar">Agendar consulta</Button>
            <Button href="#especialidades" variant="secondary">
              Ver especialidades
            </Button>
          </div>
          <ul className="mt-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 font-sans text-sm text-[#5A6F6A]"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2A7A6E]"
                />
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
