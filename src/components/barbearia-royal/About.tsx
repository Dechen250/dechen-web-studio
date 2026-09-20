import Image from "next/image";
import { about } from "@/data/barbearia-royal";
import { SectionTag } from "./ui";

export function About() {
  return (
    <section
      className="grid items-center gap-12 px-5 py-20 md:px-12 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-36"
      id="historia"
    >
      <div className="relative h-[420px] md:h-[560px]">
        <Image
          src={about.imageMain}
          alt={about.imageMainAlt}
          width={720}
          height={900}
          className="relative z-[2] h-[85%] w-[70%] object-cover grayscale-[30%] transition hover:grayscale-0"
        />
        <Image
          src={about.imageSecondary}
          alt={about.imageSecondaryAlt}
          width={560}
          height={560}
          className="absolute right-0 bottom-0 z-[3] h-[55%] w-[55%] border-[6px] border-[#0A0A0A] object-cover grayscale-[30%] transition hover:grayscale-0"
        />
        <div className="font-bebas pointer-events-none absolute -top-8 right-6 z-[1] text-[8rem] leading-none text-[#C8A97E]/10 select-none">
          {about.watermark}
        </div>
      </div>
      <div>
        <SectionTag text={about.tag} />
        <h2 className="font-bebas mb-8 text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
          {about.titleBefore}
          <br />
          {about.titleMid}
          <br />
          <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
            {about.italic}
          </span>
        </h2>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-5 max-w-xl text-[15px] leading-8 text-[#999]">
            {paragraph}
          </p>
        ))}
        <div className="mt-10 flex flex-wrap gap-10 border-t border-[#C8A97E]/15 pt-8">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-bebas text-5xl tracking-wide text-[#C8A97E]">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.22em] text-[#999] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
