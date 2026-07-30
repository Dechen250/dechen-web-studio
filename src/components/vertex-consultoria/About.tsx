import Image from "next/image";
import { aboutPoints, siteInfo } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-t border-[rgba(34,211,238,0.1)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="section-grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <FadeIn>
          <SectionHeading
            label="Sobre"
            title="Consultoria para quem precisa decidir."
            description="A Vertex atua com founders e diretores que querem crescimento com controle — estrutura, números e execução no mesmo plano."
          />
          <p className="font-sans text-sm text-[#8B9AAB]">{siteInfo.address.full}</p>
        </FadeIn>

        <FadeIn delayMs={100}>
          <div className="relative mb-6 aspect-[16/10] overflow-hidden border border-[rgba(34,211,238,0.14)]">
            <Image
              src="/showcase/vertex-consultoria/resultados/escritorio.jpg"
              alt="Ambiente Vertex Consultoria"
              fill
              className="object-cover opacity-75"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1118]/70 via-transparent to-[#22D3EE]/10" />
          </div>
          <ul className="space-y-4">
            {aboutPoints.map((point) => (
              <li
                key={point.title}
                className="border border-[rgba(34,211,238,0.12)] border-l-2 border-l-[#22D3EE] bg-[#121A24]/80 p-5"
              >
                <p className="font-display text-base font-semibold text-[#E8EEF4]">
                  {point.title}
                </p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-[#8B9AAB]">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
