import { steps } from "@/data/nn-estetica-beleza";
import { FadeIn, SectionHeading } from "./ui";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section-glow relative border-t border-[#E6DCD4]/80 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Como funciona"
            title="Da conversa ao cuidado"
            description="Três passos claros até a avaliação. Sem pressa e sem promessa de milagre."
            align="center"
          />
        </FadeIn>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          <div
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-[#9A6B5A]/35 to-transparent md:block"
            aria-hidden
          />

          {steps.map((item, index) => (
            <FadeIn key={item.step} delayMs={index * 100}>
              <article className="card-nn relative rounded-2xl p-7 text-center md:p-8 md:text-left">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9A6B5A]/30 bg-[#F3E7DF] font-sans text-xs font-semibold tracking-wider text-[#9A6B5A]">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-medium text-[#2B2420] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#7A716A] md:text-base">
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
