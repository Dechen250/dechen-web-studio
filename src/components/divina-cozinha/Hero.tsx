import Image from "next/image";
import { chef, featureCard, hero, seasonalCard } from "@/data/divina-cozinha";
import { IconApple, IconArrowRight, IconArrowUpRight } from "./icons";
import { FadeIn } from "./ui";

export function Hero() {
  return (
    <section className="grid min-h-[600px] grid-cols-1 gap-4 md:h-[85vh] md:grid-cols-12">
      <FadeIn
        immediate
        className="group relative min-h-[480px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm md:col-span-8 md:h-full"
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-md bg-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-black uppercase">
              {hero.badge}
            </span>
            <span className="font-mono text-xs text-white/80">{hero.prep}</span>
          </div>
          <h1 className="mb-6 font-serif text-4xl leading-[0.9] text-balance text-white md:text-6xl lg:text-7xl">
            {hero.headline}{" "}
            <span className="text-brand-rose italic">{hero.headlineItalic}</span>
          </h1>
          <div className="flex items-center justify-between border-t border-white/20 pt-6">
            <p className="line-clamp-2 max-w-md text-sm text-white/80 md:text-base">
              {hero.description}
            </p>
            <a
              href="#cardapio"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
              aria-label="Ver cardápio"
            >
              <IconArrowUpRight className="h-6 w-6" />
            </a>
          </div>
        </div>
      </FadeIn>

      <div className="flex h-full flex-col gap-4 md:col-span-4">
        <FadeIn
          immediate
          delayMs={80}
          className="group relative flex min-h-[220px] flex-1 overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F5F2EA] p-8 transition-all hover:shadow-md"
        >
          <Image
            src={seasonalCard.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
          <div className="absolute inset-0 bg-[#F5F2EA]/75" />
          <div className="absolute top-0 right-0 p-8 opacity-20 transition-opacity duration-500 group-hover:rotate-12 group-hover:opacity-100">
            <IconApple className="text-brand-rose h-16 w-16" />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                {seasonalCard.label}
              </span>
              <h2 className="font-serif text-2xl leading-tight">
                {seasonalCard.title}
              </h2>
            </div>
            <div className="mt-4 flex gap-2">
              <Image
                src={chef.avatar}
                alt={chef.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border-2 border-white object-cover"
              />
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold">{seasonalCard.chefName}</span>
                <span className="text-[10px] text-slate-950">
                  {seasonalCard.chefMeta}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn
          immediate
          delayMs={140}
          className="group relative min-h-[200px] flex-1 overflow-hidden rounded-[2rem] bg-[#0b0b0b] p-8"
        >
          <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60">
            <Image
              src={featureCard.image}
              alt={featureCard.imageAlt}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-end">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
              <h3 className="mb-2 text-lg leading-snug font-medium text-white">
                {featureCard.title}
              </h3>
              <a
                href={featureCard.href}
                className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/70 uppercase hover:text-white"
              >
                {featureCard.cta}
                <IconArrowRight />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
