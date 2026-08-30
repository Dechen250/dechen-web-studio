import { siteInfo } from "@/data/divina-cozinha";
import { Button } from "./ui";

export function Localizacao() {
  return (
    <section id="localizacao" className="py-16">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-4">
          <span className="text-brand-rose mb-4 block font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            Localização
          </span>
          <h2 className="mb-8 font-serif text-4xl">Esperamos por você</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase">
                Endereço
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {siteInfo.address.full}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase">
                Horários
              </h3>
              <ul className="mt-2 space-y-2">
                {siteInfo.hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex justify-between gap-4 border-b border-slate-200 py-2 text-sm text-slate-500"
                  >
                    <span>{h.days}</span>
                    <span className="text-slate-800">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase">
                Contato
              </h3>
              <p className="mt-2 text-sm text-slate-500">{siteInfo.phone}</p>
              <a
                href={`https://wa.me/${siteInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-rose mt-1 inline-block text-sm hover:text-slate-900"
              >
                WhatsApp
              </a>
            </div>
            <Button href={`https://wa.me/${siteInfo.whatsapp}`} variant="solid">
              Como chegar
            </Button>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-slate-900 lg:col-span-8">
          <iframe
            title="Localização Divina Cozinha"
            src={siteInfo.mapEmbed}
            className="h-full min-h-[420px] w-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute top-8 left-8 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
            <span className="font-mono text-[10px] tracking-widest uppercase">
              Jardins · São Paulo
            </span>
            <p className="font-serif text-xl">{siteInfo.address.street}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
