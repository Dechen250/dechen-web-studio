import { differentials } from "@/data/barbearia-royal";
import { FadeIn, SectionHeading } from "./ui";

export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="border-t border-[rgba(196,163,90,0.08)] bg-[#0C0A09] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Diferenciais"
            title="O padrão que define a experiência."
            description="Cada detalhe foi pensado para quem não abre mão de precisão, pontualidade e um ambiente à altura."
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, index) => (
            <FadeIn key={item.title}>
              <article className="group h-full rounded-xl border border-[rgba(196,163,90,0.14)] bg-[#14110E] p-6 transition-colors duration-500 hover:border-[rgba(196,163,90,0.3)] hover:bg-[#1A1612]">
                <span className="mb-5 block font-display text-2xl text-[#C4A35A]/50 transition-colors group-hover:text-[#C4A35A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium text-[#F2EBE0]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#9A9186]">
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
