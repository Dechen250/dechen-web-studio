import Image from "next/image";
import { siteInfo, team } from "@/data/barbearia-royal";
import { IconCamera } from "./icons";
import { SectionTag } from "./ui";

export function Team() {
  return (
    <section className="px-5 py-20 md:px-12 lg:px-20 lg:py-32" id="barbeiros">
      <div className="mb-14">
        <SectionTag text="A equipe" />
        <h2 className="font-bebas text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
          CONHEÇA NOSSOS{" "}
          <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
            Mestres
          </span>
          <br />
          BARBEIROS
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {team.map((member) => (
          <article key={member.name} className="group">
            <div className="relative mb-5 aspect-[3/4] overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bebas text-2xl tracking-[0.08em]">
                  {member.name}
                </div>
                <div className="mt-1 text-[11px] tracking-[0.2em] text-[#999] uppercase">
                  {member.role}
                </div>
              </div>
              <a
                href={siteInfo.instagram}
                aria-label={`Instagram — ${member.name}`}
                className="text-[#C8A97E] transition hover:text-[#FAFAF9]"
              >
                <IconCamera className="h-5 w-5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
