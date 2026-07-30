import { services } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Services() {
  return (
    <section id="servicos" className="bg-[#121A24] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Serviços"
            title="Onde a Vertex atua."
            description="Frentes que conectam estratégia, caixa e operação — sem diluir o foco."
          />
        </FadeIn>

        <div className="grid gap-px bg-[rgba(34,211,238,0.12)] sm:grid-cols-2">
          {services.map((item) => (
            <FadeIn key={item.title}>
              <article className="h-full bg-[#121A24] p-8 transition-colors hover:bg-[#15202C] md:p-10">
                <h3 className="font-display text-xl font-semibold text-[#E8EEF4] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#8B9AAB] md:text-base">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
