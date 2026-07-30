import { specialties } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading, SpecialtyIcon } from "./ui";

export function Specialties() {
  return (
    <section
      id="especialidades"
      className="section-mist relative border-t border-[#D5E4E0]/70 bg-white px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Especialidades"
            title="Cuidado completo, no mesmo lugar."
            description="Do check-up preventivo às especialidades — com uma equipe alinhada ao seu plano de saúde."
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((item, index) => (
            <FadeIn key={item.id} delayMs={index * 70}>
              <article className="card-surface group relative h-full overflow-hidden rounded-2xl p-7 md:p-8">
                <span
                  aria-hidden
                  className="mist-line absolute inset-x-0 top-0 h-px"
                />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3F0] transition-transform duration-500 group-hover:scale-105">
                  <SpecialtyIcon name={item.icon} />
                </div>
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
