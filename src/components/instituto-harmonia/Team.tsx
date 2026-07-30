import Image from "next/image";
import { team } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading } from "./ui";

export function Team() {
  return (
    <section
      id="equipe"
      className="border-t border-[#D5E4E0]/70 bg-[#E8F3F0]/55 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Equipe"
            title="Profissionais que escutam antes de indicar."
            description="Médicos e especialistas com foco em prevenção, clareza e acompanhamento humano."
          />
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3 md:gap-7">
          {team.map((member, index) => (
            <FadeIn key={member.name} delayMs={index * 90}>
              <article className="group">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl border border-[#D5E4E0] bg-[#D5E4E0] shadow-[0_4px_24px_rgba(26,46,43,0.06)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E2B]/55 via-transparent to-transparent opacity-80" />
                  <p className="absolute bottom-4 left-4 right-4 font-sans text-xs font-medium tracking-[0.18em] text-white/90 uppercase">
                    {member.focus}
                  </p>
                </div>
                <h3 className="font-display text-xl font-medium text-[#1A2E2B] md:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-1 font-sans text-sm font-medium text-[#2A7A6E]">
                  {member.role}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#5A6F6A]">
                  {member.bio}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
