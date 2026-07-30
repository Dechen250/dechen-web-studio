import { methodSteps } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Method() {
  return (
    <section id="metodo" className="border-t border-[rgba(34,211,238,0.1)] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Método"
            title="Um sistema. Quatro etapas."
            description="Do diagnóstico à escala — com rituais e indicadores que a liderança consegue acompanhar."
          />
        </FadeIn>

        <ol className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((item, index) => (
            <FadeIn key={item.step}>
              <li
                className={`border-[rgba(34,211,238,0.12)] py-8 md:px-6 md:py-10 ${
                  index < methodSteps.length - 1 ? "md:border-r" : ""
                } border-b md:border-b-0`}
              >
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-[#22D3EE]">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#E8EEF4] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#8B9AAB]">
                  {item.description}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
