import { steps } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading } from "./ui";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Como funciona"
            title="Do contato à consulta, sem complicação."
            description="Três passos claros para você ser atendido com tranquilidade."
            align="center"
          />
        </FadeIn>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((item) => (
            <FadeIn key={item.step}>
              <li className="text-center md:text-left">
                <span className="font-display text-4xl font-medium text-[#2A7A6E]/35">
                  {item.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium text-[#1A2E2B] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#5A6F6A] md:text-base">
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
