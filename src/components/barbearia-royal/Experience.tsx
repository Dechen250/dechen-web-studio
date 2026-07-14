import { experienceSteps } from "@/data/barbearia-royal";
import { FadeIn, SectionHeading } from "./ui";

export function Experience() {
  return (
    <section
      id="experiencia"
      className="border-t border-[rgba(196,163,90,0.08)] bg-[#0C0A09] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Experiência"
            title="Do primeiro contato ao visual final."
            description="Um processo claro, sem pressa e com atenção em cada etapa — como deve ser em uma barbearia de respeito."
          />
        </FadeIn>

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-[#C4A35A]/25 to-transparent lg:block"
            aria-hidden
          />

          {experienceSteps.map((step) => (
            <FadeIn key={step.step}>
              <article className="relative">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(196,163,90,0.35)] bg-[#14110E] font-sans text-xs font-medium tracking-wider text-[#C4A35A]">
                  {step.step}
                </span>
                <h3 className="font-display text-xl font-medium text-[#F2EBE0]">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#9A9186]">
                  {step.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
