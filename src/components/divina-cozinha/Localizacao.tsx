import { siteInfo } from "@/data/divina-cozinha";
import { Button, FadeIn, SectionHeading } from "./ui";

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-[#FAF9F6] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Localização"
            title="Esperamos por você."
            description="Estamos prontos para recebê-lo em um ambiente acolhedor, sofisticado e preparado para transformar sua visita em uma experiência memorável."
          />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-8 rounded-3xl border border-[#E8E0D4] bg-[#FFFDF8] p-8 shadow-[0_4px_24px_rgba(61,56,50,0.05)]">
              <div>
                <h3 className="font-display text-lg font-medium text-[#3D3832]">
                  Endereço
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B6560]">
                  {siteInfo.address.full}
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-[#3D3832]">
                  Horário de funcionamento
                </h3>
                <ul className="mt-2 space-y-1">
                  {siteInfo.hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex justify-between gap-4 font-sans text-sm text-[#6B6560]"
                    >
                      <span>{h.days}</span>
                      <span className="text-[#3D3832]">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-[#3D3832]">
                  Contato
                </h3>
                <p className="mt-2 font-sans text-sm text-[#6B6560]">
                  {siteInfo.phone}
                </p>
                <a
                  href={`https://wa.me/${siteInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-sans text-sm text-[#8B9A7D] transition-colors hover:text-[#3D3832]"
                >
                  WhatsApp
                </a>
              </div>
              <Button
                href={`https://wa.me/${siteInfo.whatsapp}`}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Como Chegar
              </Button>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-[#E8E0D4] shadow-[0_4px_24px_rgba(61,56,50,0.05)]">
              <iframe
                title="Localização Divina Cozinha"
                src={siteInfo.mapEmbed}
                className="h-[320px] w-full md:h-full md:min-h-[400px]"
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
