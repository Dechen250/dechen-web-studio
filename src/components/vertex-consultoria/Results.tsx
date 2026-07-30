import Image from "next/image";
import { resultImages, results } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Results() {
  return (
    <section
      id="resultados"
      className="border-t border-[rgba(34,211,238,0.1)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Resultados"
            title="Números que a operação sente."
            description="Indicadores típicos em projetos onde o método é seguido com disciplina."
          />
        </FadeIn>

        <div className="grid gap-10 border-y border-[rgba(34,211,238,0.14)] py-14 md:grid-cols-3 md:gap-8">
          {results.map((item, index) => (
            <FadeIn key={item.label} delayMs={index * 90}>
              <div>
                <p className="stat-glow font-display text-5xl font-semibold tracking-tight text-[#22D3EE] md:text-6xl">
                  {item.value}
                </p>
                <p className="mt-4 font-sans text-sm font-semibold text-[#E8EEF4]">
                  {item.label}
                </p>
                <p className="mt-1 font-sans text-sm text-[#8B9AAB]">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-4 font-sans text-xs text-[#8B9AAB]/70">
          Indicadores demonstrativos para este showcase.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {resultImages.map((image, index) => (
            <FadeIn
              key={image.src}
              delayMs={index * 80}
              className={index === 0 ? "md:col-span-3" : ""}
            >
              <figure
                className={`group relative overflow-hidden border border-[rgba(34,211,238,0.12)] ${
                  index === 0 ? "aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover opacity-80 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 1200px"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                />
                <div className="gallery-sheen absolute inset-0 bg-gradient-to-t from-[#0B1118]/90 via-[#0B1118]/25 to-transparent" />
                <div
                  className="absolute top-4 left-4 h-6 w-6 border-t border-l border-[#22D3EE]/45"
                  aria-hidden
                />
                <div
                  className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-[#22D3EE]/45"
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <span className="font-display text-lg font-semibold text-[#E8EEF4] md:text-xl">
                    {image.title}
                  </span>
                  <span className="mt-1 block font-sans text-xs tracking-[0.22em] text-[#22D3EE] uppercase">
                    {image.subtitle}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
