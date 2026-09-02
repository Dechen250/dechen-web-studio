import { siteInfo, team } from "@/data/nn-estetica-beleza";
import { FadeIn, PlaceholderFlag, SectionHeading } from "./ui";

export function About() {
  return (
    <section
      id="sobre"
      className="border-t border-[#E6DCD4]/80 bg-[#F3E7DF]/55 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Sobre"
            title="Quem cuida de você"
            description={`A ${siteInfo.name} é o espaço da Dra. Natany Nascimento e da Dra. Haiana Nascimento em ${siteInfo.city}.`}
          />
        </FadeIn>

        <FadeIn delayMs={60}>
          <p className="mb-12 max-w-2xl font-sans text-base leading-relaxed text-[#7A716A] md:text-lg">
            Trabalhamos com avaliação, indicação individual e acompanhamento. O
            Instagram mostra o dia a dia; o consultório é onde o cuidado
            acontece.
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {team.map((member, index) => (
            <FadeIn key={member.name} delayMs={index * 90}>
              <article className="card-nn flex gap-5 rounded-2xl p-6 md:p-8">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F3E7DF] font-display text-2xl font-medium text-[#9A6B5A] md:h-24 md:w-24 md:text-3xl"
                  aria-hidden
                >
                  {member.initials}
                </div>
                <div>
                  <PlaceholderFlag>Foto e conselho</PlaceholderFlag>
                  <h3 className="mt-3 font-display text-2xl font-medium text-[#2B2420]">
                    {member.honorific} {member.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-[#9A6B5A]">
                    {member.role}
                  </p>
                  <p className="mt-1 font-sans text-xs text-[#7A716A]">
                    {member.registry}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[#7A716A]">
                    {member.bio}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
