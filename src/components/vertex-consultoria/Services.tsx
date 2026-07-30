import { services } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Services() {
  return (
    <section
      id="servicos"
      className="border-t border-[rgba(34,211,238,0.1)] bg-[#121A24] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Serviços"
            title="Onde a Vertex atua."
            description="Frentes que conectam estratégia, caixa e operação — sem diluir o foco."
          />
        </FadeIn>

        <div className="grid gap-px bg-[rgba(34,211,238,0.14)] sm:grid-cols-2">
          {services.map((item, index) => (
            <FadeIn key={item.title} delayMs={index * 70}>
              <article className="group h-full bg-[#121A24] p-8 transition-all duration-400 hover:bg-[#15202C] hover:shadow-[0_0_40px_rgba(34,211,238,0.06)] md:p-10">
                <span
                  aria-hidden
                  className="mb-5 block h-px w-12 bg-gradient-to-r from-[#22D3EE]/70 to-transparent transition-all duration-400 group-hover:w-20"
                />
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
