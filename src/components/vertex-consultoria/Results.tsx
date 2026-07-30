import Image from "next/image";
import { resultImages, results } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Results() {
  return (
    <section id="resultados" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Resultados"
            title="Números que a operação sente."
            description="Indicadores típicos em projetos onde o método é seguido com disciplina."
          />
        </FadeIn>

        <div className="grid gap-10 border-y border-[rgba(34,211,238,0.12)] py-12 md:grid-cols-3 md:gap-8">
          {results.map((item) => (
            <FadeIn key={item.label}>
              <div>
                <p className="font-display text-5xl font-semibold tracking-tight text-[#22D3EE] md:text-6xl">
                  {item.value}
                </p>
                <p className="mt-3 font-sans text-sm font-semibold text-[#E8EEF4]">
                  {item.label}
                </p>
                <p className="mt-1 font-sans text-sm text-[#8B9AAB]">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {resultImages.map((image) => (
            <FadeIn key={image.src}>
              <div className="relative aspect-[4/3] overflow-hidden border border-[rgba(34,211,238,0.1)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover opacity-85 transition duration-500 hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
