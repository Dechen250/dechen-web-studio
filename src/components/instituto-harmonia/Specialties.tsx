import { specialties } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading } from "./ui";

export function Specialties() {
  return (
    <section id="especialidades" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Especialidades"
            title="Cuidado completo, no mesmo lugar."
            description="Do check-up preventivo às especialidades — com uma equipe alinhada ao seu plano de saúde."
          />
        </FadeIn>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((item) => (
            <FadeIn key={item.title}>
              <article className="border-t border-[#D5E4E0] pt-6">
                <h3 className="font-display text-xl font-medium tracking-tight text-[#1A2E2B] md:text-2xl">
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
