import { spaceSlots } from "@/data/nn-estetica-beleza";
import { FadeIn, PlaceholderFlag, SectionHeading } from "./ui";

export function Space() {
  return (
    <section
      id="espaco"
      className="border-t border-[#E6DCD4]/80 bg-[#FFFBFA] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Espaço"
            title="O consultório"
            description="No site publicado, esta faixa recebe fotos reais do ambiente. Sem foto autorizada, a seção some."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-3">
          {spaceSlots.map((label, index) => (
            <FadeIn key={label} delayMs={index * 70}>
              <figure className="placeholder-tile flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#9A6B5A]/30">
                <PlaceholderFlag>Foto</PlaceholderFlag>
                <figcaption className="font-sans text-sm text-[#7A716A]">
                  {label}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
