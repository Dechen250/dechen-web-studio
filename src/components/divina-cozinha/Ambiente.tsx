import Image from "next/image";
import { ambienteGallery } from "@/data/divina-cozinha";
import { Button, FadeIn, SectionHeading } from "./ui";

export function Ambiente() {
  return (
    <section id="ambiente" className="bg-[#FAF9F6] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Ambiente"
            title="Um ambiente pensado para receber você."
            description="Cada detalhe da Divina Cozinha foi planejado para proporcionar conforto, elegância e momentos inesquecíveis. Nossa decoração combina elementos contemporâneos com um ambiente acolhedor, ideal para encontros, celebrações e experiências gastronômicas."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ambienteGallery.map((item, index) => (
            <FadeIn
              key={item.title}
              className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <figure className="group relative overflow-hidden rounded-2xl">
                <div
                  className={`relative overflow-hidden ${index === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D3832]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <figcaption className="absolute bottom-0 left-0 p-5">
                  <span className="font-display text-lg font-medium text-white drop-shadow-md">
                    {item.title}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="#reservas" variant="secondary">
            Ver Ambiente & Reservar
          </Button>
        </div>
      </div>
    </section>
  );
}
