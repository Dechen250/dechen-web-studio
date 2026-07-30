import Image from "next/image";
import { ambientImages, siteInfo, whatsappUrl } from "@/data/instituto-harmonia";
import { Button, FadeIn, SectionHeading } from "./ui";

export function Location() {
  return (
    <section
      id="local"
      className="section-mist relative border-t border-[#D5E4E0]/70 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
          <FadeIn>
            <SectionHeading
              label="Local"
              title="No coração dos Jardins."
              description={siteInfo.address.full}
            />
            <div className="rounded-3xl border border-[#D5E4E0] bg-white p-7 shadow-[0_4px_28px_rgba(26,46,43,0.05)] md:p-8">
              <ul className="space-y-1">
                {siteInfo.hours.map((item) => (
                  <li
                    key={item.days}
                    className="flex justify-between gap-4 border-b border-[#D5E4E0] py-3.5 font-sans text-sm text-[#5A6F6A] last:border-b-0"
                  >
                    <span className="font-medium text-[#1A2E2B]">{item.days}</span>
                    <span>{item.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 border-t border-[#D5E4E0] pt-6">
                <p className="font-sans text-sm text-[#5A6F6A]">
                  Telefone:{" "}
                  <a
                    href={`tel:+55${siteInfo.whatsapp.slice(2)}`}
                    className="font-medium text-[#2A7A6E] hover:underline"
                  >
                    {siteInfo.phone}
                  </a>
                </p>
                <p className="font-sans text-sm text-[#5A6F6A]">
                  E-mail:{" "}
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="font-medium text-[#2A7A6E] hover:underline"
                  >
                    {siteInfo.email}
                  </a>
                </p>
              </div>
              <Button
                href={whatsappUrl(
                  "Olá! Vim pelo site e gostaria de orientação de como chegar.",
                )}
                className="mt-6"
              >
                Como chegar no WhatsApp
              </Button>
            </div>
          </FadeIn>

          <FadeIn delayMs={100}>
            <div className="grid grid-cols-2 gap-3">
              {ambientImages.map((image, index) => (
                <figure
                  key={image.src}
                  className={`group relative overflow-hidden rounded-2xl border border-[#D5E4E0] ${
                    index === 0
                      ? "col-span-2 aspect-[16/10]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "25vw"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E2B]/70 via-[#1A2E2B]/15 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span className="block font-display text-lg font-medium text-white">
                      {image.title}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs tracking-[0.16em] text-white/75 uppercase">
                      {image.subtitle}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-[#D5E4E0]">
              <iframe
                title="Mapa Instituto Harmonia"
                src={siteInfo.mapEmbed}
                className="h-56 w-full grayscale-[30%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
