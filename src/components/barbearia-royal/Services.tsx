import { services } from "@/data/barbearia-royal";
import { FadeIn, SectionHeading } from "./ui";

export function Services() {
  return (
    <section
      id="servicos"
      className="border-t border-[rgba(196,163,90,0.08)] bg-[#100E0C] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Serviços"
            title="Cuidados sob medida para sua presença."
            description="Preços demonstrativos para este showcase. Cada serviço combina técnica, produtos selecionados e acabamento de alto padrão."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <FadeIn key={service.name}>
              <article className="flex h-full flex-col rounded-xl border border-[rgba(196,163,90,0.14)] bg-[#14110E] p-6 transition-all duration-500 hover:border-[rgba(196,163,90,0.32)] hover:shadow-[0_0_40px_rgba(196,163,90,0.06)]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-medium text-[#F2EBE0]">
                    {service.name}
                  </h3>
                  <span className="shrink-0 font-sans text-sm font-medium tracking-wide text-[#C4A35A]">
                    {service.price}
                  </span>
                </div>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-[#9A9186]">
                  {service.description}
                </p>
                <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#C4A35A]/60 to-transparent" />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
