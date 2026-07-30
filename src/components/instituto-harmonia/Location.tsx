import Image from "next/image";
import { ambientImages, siteInfo } from "@/data/instituto-harmonia";
import { FadeIn, SectionHeading } from "./ui";

export function Location() {
  return (
    <section id="local" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <SectionHeading
              label="Local"
              title="No coração dos Jardins."
              description={siteInfo.address.full}
            />
            <ul className="space-y-3">
              {siteInfo.hours.map((item) => (
                <li
                  key={item.days}
                  className="flex justify-between gap-4 border-b border-[#D5E4E0] py-3 font-sans text-sm text-[#5A6F6A]"
                >
                  <span className="text-[#1A2E2B]">{item.days}</span>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-sm text-[#5A6F6A]">
              Telefone:{" "}
              <a
                href={`tel:+55${siteInfo.whatsapp.slice(2)}`}
                className="font-medium text-[#2A7A6E] hover:underline"
              >
                {siteInfo.phone}
              </a>
            </p>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={ambientImages[0].src}
                  alt={ambientImages[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={ambientImages[1].src}
                  alt={ambientImages[1].alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={ambientImages[2].src}
                  alt={ambientImages[2].alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
