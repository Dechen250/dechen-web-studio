import { testimonials } from "@/data/barbearia-royal";
import { FadeIn, SectionHeading } from "./ui";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="border-t border-[rgba(196,163,90,0.08)] bg-[#100E0C] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Prova social"
            title="O que dizem sobre a experiência."
            description="Depoimentos fictícios para fins demonstrativos deste showcase."
          />
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <FadeIn key={item.quote}>
              <blockquote className="flex h-full flex-col rounded-xl border border-[rgba(196,163,90,0.14)] bg-[#14110E] p-7">
                <span
                  className="mb-4 font-display text-4xl leading-none text-[#C4A35A]/40"
                  aria-hidden
                >
                  “
                </span>
                <p className="flex-1 font-display text-xl leading-snug font-medium text-[#F2EBE0] md:text-2xl">
                  {item.quote}
                </p>
                <footer className="mt-8 border-t border-[rgba(196,163,90,0.1)] pt-5">
                  <cite className="not-italic">
                    <span className="block font-sans text-sm font-medium text-[#F2EBE0]">
                      {item.name}
                    </span>
                    <span className="mt-1 block font-sans text-xs tracking-wide text-[#9A9186]">
                      {item.detail}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
