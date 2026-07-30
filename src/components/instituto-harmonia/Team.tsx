import Image from "next/image";
import { team } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading } from "./ui";

export function Team() {
  return (
    <section id="equipe" className="bg-[#E8F3F0]/55 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Equipe"
            title="Profissionais que escutam antes de indicar."
            description="Médicos e especialistas com foco em prevenção, clareza e acompanhamento humano."
          />
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-3">
          {team.map((member) => (
            <FadeIn key={member.name}>
              <article>
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-[#D5E4E0]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-display text-xl font-medium text-[#1A2E2B]">
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
