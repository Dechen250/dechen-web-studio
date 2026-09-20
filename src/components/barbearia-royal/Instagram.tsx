import Image from "next/image";
import { instagramFeed, siteInfo } from "@/data/barbearia-royal";
import { IconCamera } from "./icons";
import { SectionTag } from "./ui";

export function Instagram() {
  return (
    <section className="px-5 py-16 md:px-12 lg:px-20">
      <div className="mb-10 text-center">
        <SectionTag text="Siga-nos" centered />
        <h2 className="font-bebas mb-4 text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
          NO{" "}
          <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
            Instagram
          </span>
        </h2>
        <a
          className="inline-flex items-center gap-2 text-sm tracking-[0.18em] text-[#C8A97E] uppercase"
          href={siteInfo.instagram}
        >
          <IconCamera className="h-4 w-4" />
          {siteInfo.instagramHandle}
        </a>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {instagramFeed.map((src, index) => (
          <a
            key={`${src}-${index}`}
            className="group relative aspect-square overflow-hidden"
            href={siteInfo.instagram}
            aria-label="Abrir Instagram da Barbearia Royal"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
          </a>
        ))}
      </div>
    </section>
  );
}
