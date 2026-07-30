import { aboutPoints, siteInfo } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function About() {
  return (
    <section id="sobre" className="bg-[#121A24] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <FadeIn>
          <SectionHeading
            label="Sobre"
            title="Consultoria para quem precisa decidir."
            description="A Vertex atua com founders e diretores que querem crescimento com controle — estrutura, números e execução no mesmo plano."
          />
        </FadeIn>

        <FadeIn>
          <ul className="space-y-5">
            {aboutPoints.map((point) => (
              <li
                key={point}
                className="border-l-2 border-[#22D3EE] pl-5 font-sans text-base leading-relaxed text-[#8B9AAB]"
              >
                <span className="text-[#E8EEF4]">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-sans text-sm text-[#8B9AAB]">
            {siteInfo.address.full}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
