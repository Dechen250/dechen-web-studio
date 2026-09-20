import Image from "next/image";
import { galleryItems } from "@/data/barbearia-royal";
import { SectionTag } from "./ui";

export function Gallery() {
  return (
    <section className="px-5 pb-20 md:px-12 lg:px-20 lg:pb-32" id="galeria">
      <div className="mb-12 text-center">
        <SectionTag text="Nosso trabalho" centered />
        <h2 className="font-bebas text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
          O{" "}
          <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
            Ofício
          </span>{" "}
          EM DETALHES
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {galleryItems.map((item) => (
          <figure
            key={item.title}
            className="group relative min-h-[280px] overflow-hidden md:min-h-[360px]"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-bebas text-lg tracking-[0.18em] text-white">
                {item.overlay}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
