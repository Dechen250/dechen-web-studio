import { treatments, whatsappUrl } from "@/data/nn-estetica-beleza";
import { Button, FadeIn, SectionHeading } from "./ui";

export function Treatments() {
  return (
    <section
      id="tratamentos"
      className="section-glow relative border-t border-[#E6DCD4]/80 bg-[#FFFBFA] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Tratamentos"
            title="O que você encontra aqui"
            description="Três frentes de cuidado. O protocolo só é indicado depois da avaliação."
          />
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {treatments.map((item, index) => (
            <FadeIn key={item.id} delayMs={index * 80}>
              <article className="card-nn group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 md:p-8">
                <span
                  aria-hidden
                  className="accent-line absolute inset-x-0 top-0 h-px"
                />
                <p className="mb-5 font-sans text-xs font-medium tracking-[0.2em] text-[#9A6B5A] uppercase">
                  0{index + 1}
                </p>
                <h3 className="font-display text-2xl font-medium tracking-tight text-[#2B2420]">
                  {item.title}
                </h3>
                <p className="mt-3 mb-8 flex-1 font-sans text-sm leading-relaxed text-[#7A716A] md:text-base">
                  {item.description}
                </p>
                <Button
                  href={whatsappUrl()}
                  variant="ghost"
                  className="self-start px-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar sobre este tratamento →
                </Button>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
