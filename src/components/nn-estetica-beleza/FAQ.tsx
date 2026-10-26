import { faqs } from "@/data/nn-estetica-beleza";
import { FadeIn, SectionHeading } from "./ui";

export function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-[#E6DCD4]/80 bg-[#F3E7DF]/40 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <SectionHeading
            label="Dúvidas"
            title="Perguntas frequentes"
            description="Respostas curtas para o que mais aparece no WhatsApp — sem preço nem promessa clínica."
          />
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FadeIn key={item.question} delayMs={index * 60}>
              <details className="card-nn group rounded-2xl px-6 py-5">
                <summary className="cursor-pointer list-none font-display text-xl font-medium text-[#2B2420] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.question}
                    <span
                      aria-hidden
                      className="mt-1 font-sans text-lg text-[#9A6B5A] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#7A716A] md:text-base">
                  {item.answer}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
