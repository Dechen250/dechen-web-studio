import { methodSteps } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Method() {
  return (
    <section
      id="metodo"
      className="relative overflow-hidden border-t border-[rgba(34,211,238,0.1)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="section-grid-fade pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Método"
            title="Um sistema. Quatro etapas."
            description="Do diagnóstico à escala — com rituais e indicadores que a liderança consegue acompanhar."
          />
        </FadeIn>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-[#22D3EE]/30 to-transparent lg:block"
            aria-hidden
          />

          {methodSteps.map((item, index) => (
            <FadeIn key={item.step} delayMs={index * 80}>
              <article className="group relative h-full border border-[rgba(34,211,238,0.12)] bg-[#121A24]/60 p-6 transition-colors duration-400 hover:bg-[#15202C] md:p-7">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-[rgba(34,211,238,0.4)] bg-[#0B1118] font-display text-xs font-semibold tracking-wider text-[#22D3EE]">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-[#E8EEF4] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#8B9AAB]">
                  {item.description}
                </p>
                <p className="mt-4 border-t border-[rgba(34,211,238,0.1)] pt-4 font-sans text-xs leading-relaxed text-[#8B9AAB]/80 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  {item.detail}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
