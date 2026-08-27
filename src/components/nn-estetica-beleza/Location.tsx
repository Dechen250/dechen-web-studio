import { siteInfo, whatsappUrl } from "@/data/nn-estetica-beleza";
import { FadeIn, PlaceholderFlag, SectionHeading } from "./ui";

export function Location() {
  return (
    <section
      id="local"
      className="section-glow border-t border-[#E6DCD4]/80 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <SectionHeading
            label="Local"
            title="Onde estamos"
            description={`${siteInfo.city}. O endereço completo e o mapa entram depois da descoberta.`}
          />
          <dl className="space-y-5">
            <div>
              <dt className="font-sans text-xs tracking-[0.16em] text-[#9A6B5A] uppercase">
                Endereço
              </dt>
              <dd className="mt-1 font-sans text-base text-[#2B2420]">
                {siteInfo.address.full}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-xs tracking-[0.16em] text-[#9A6B5A] uppercase">
                Horários
              </dt>
              <dd className="mt-1 font-sans text-base text-[#2B2420]">
                {siteInfo.hours}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-xs tracking-[0.16em] text-[#9A6B5A] uppercase">
                WhatsApp
              </dt>
              <dd className="mt-1">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base text-[#9A6B5A] underline-offset-4 hover:underline"
                >
                  {siteInfo.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-sans text-xs tracking-[0.16em] text-[#9A6B5A] uppercase">
                Instagram
              </dt>
              <dd className="mt-1">
                <a
                  href={siteInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base text-[#9A6B5A] underline-offset-4 hover:underline"
                >
                  @{siteInfo.instagramHandle}
                </a>
              </dd>
            </div>
          </dl>
        </FadeIn>

        <FadeIn delayMs={100}>
          <div className="placeholder-tile flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[#9A6B5A]/30 p-8">
            <PlaceholderFlag>Mapa</PlaceholderFlag>
            <p className="max-w-xs text-center font-sans text-sm text-[#7A716A]">
              Embed do Google Maps quando o endereço da clínica estiver
              confirmado — não usamos o do salão.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
