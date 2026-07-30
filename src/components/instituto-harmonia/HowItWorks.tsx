import { steps } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading } from "./ui";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section-mist relative border-t border-[#D5E4E0]/70 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Como funciona"
            title="Do contato à consulta, sem complicação."
            description="Três passos claros para você ser atendido com tranquilidade."
            align="center"
          />
        </FadeIn>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          <div
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-[#2A7A6E]/30 to-transparent md:block"
            aria-hidden
          />

          {steps.map((item, index) => (
            <FadeIn key={item.step} delayMs={index * 100}>
              <article className="card-surface relative rounded-2xl p-7 text-center md:p-8 md:text-left">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A7A6E]/30 bg-[#E8F3F0] font-sans text-xs font-semibold tracking-wider text-[#2A7A6E]">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-medium text-[#1A2E2B] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#5A6F6A] md:text-base">
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
