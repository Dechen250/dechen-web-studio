import { testimonials } from "@/data/vertex-consultoria";
import { FadeIn, SectionHeading } from "./ui";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="border-t border-[rgba(34,211,238,0.1)] bg-[#121A24] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Prova"
            title="O que lideranças relatam."
            description="Depoimentos fictícios para fins demonstrativos deste showcase."
          />
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <FadeIn key={item.quote} delayMs={index * 80}>
              <blockquote className="flex h-full flex-col border border-[rgba(34,211,238,0.14)] bg-[#0B1118] p-7 md:p-8">
                <span
                  className="mb-4 font-display text-5xl leading-none text-[#22D3EE]/35"
                  aria-hidden
                >
                  “
                </span>
                <p className="flex-1 font-display text-xl leading-snug font-semibold text-[#E8EEF4] md:text-2xl">
                  {item.quote}
                </p>
                <footer className="mt-8 border-t border-[rgba(34,211,238,0.12)] pt-5">
                  <cite className="not-italic">
                    <span className="block font-sans text-sm font-semibold text-[#E8EEF4]">
                      {item.name}
                    </span>
                    <span className="mt-1 block font-sans text-xs tracking-wide text-[#8B9AAB]">
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
