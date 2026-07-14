import Image from "next/image";
import { galleryItems } from "@/data/barbearia-royal";
import { FadeIn, SectionHeading } from "./ui";

export function Gallery() {
  return (
    <section
      id="ambiente"
      className="border-t border-[rgba(196,163,90,0.08)] bg-[#0C0A09] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Ambiente"
            title="Um espaço feito para presença."
            description="Madeira escura, couro e luz âmbar — um espaço pensado para homens que valorizam privacidade e acabamento de alto padrão."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2">
          {galleryItems.map((item, index) => (
            <FadeIn
              key={item.title}
              className={index === 0 ? "sm:col-span-2" : ""}
            >
              <figure
                className={`group relative overflow-hidden rounded-xl border border-[rgba(196,163,90,0.14)] ${
                  index === 0 ? "aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 1200px"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-[#0C0A09]/25 to-transparent" />

                <div
                  className="absolute top-4 left-4 h-6 w-6 border-t border-l border-[#C4A35A]/40"
                  aria-hidden
                />
                <div
                  className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-[#C4A35A]/40"
                  aria-hidden
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="font-display text-xl font-medium text-[#F2EBE0] md:text-2xl">
                    {item.title}
                  </span>
                  <span className="mt-1 block font-sans text-xs tracking-[0.2em] text-[#C4A35A] uppercase">
                    {item.subtitle}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
