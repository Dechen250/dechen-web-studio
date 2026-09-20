import Image from "next/image";
import { hero } from "@/data/barbearia-royal";
import { IconArrowRight } from "./icons";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden lg:flex">
      <div className="relative z-10 flex min-h-[70vh] w-full flex-col justify-end px-5 pt-28 pb-12 sm:px-10 lg:w-1/2 lg:justify-center lg:px-16 lg:pt-32 lg:pb-16">
        <div className="mb-8 inline-flex items-center gap-4">
          <span className="h-px w-10 bg-[#C8A97E]" />
          <span className="text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase">
            {hero.tag}
          </span>
        </div>
        <h1 className="font-bebas mb-8 text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[0.04em] text-[#FAFAF9]">
          <span className="block">{hero.lines[0]}</span>
          <span className="block">{hero.lines[1]}</span>
          <span className="title-stroke block">{hero.lines[2]}</span>
        </h1>
        <p className="mb-10 max-w-md text-base leading-8 text-[#999]">
          {hero.description}
        </p>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <a
            href="#agendar"
            className="inline-flex items-center gap-4 bg-[#C8A97E] px-8 py-4 text-[11px] font-semibold tracking-[0.25em] text-[#0A0A0A] uppercase transition-colors hover:bg-[#A8885E]"
          >
            <span>{hero.primaryCta}</span>
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center gap-3 text-xs tracking-[0.18em] text-[#E8E6E1] uppercase transition-colors hover:text-[#C8A97E]"
          >
            <span>{hero.secondaryCta}</span>
            <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0A0A0A] lg:via-[#0A0A0A]/25 lg:to-transparent" />
      </div>
    </section>
  );
}
