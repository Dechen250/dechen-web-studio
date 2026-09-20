import { navLinks, services, siteInfo } from "@/data/barbearia-royal";
import { IconCamera, IconClock, IconMap, IconPhone } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-[#C8A97E]/15 px-5 pt-16 pb-8 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-bebas mb-4 text-3xl tracking-[0.14em]">
            {siteInfo.wordmark}{" "}
            <span className="font-serif text-2xl tracking-normal text-[#C8A97E] italic">
              {siteInfo.wordmarkAccent}
            </span>
          </div>
          <p className="mb-6 max-w-xs text-sm leading-7 text-[#999]">
            {siteInfo.tagline}
          </p>
          <div className="flex gap-4">
            <a
              href={siteInfo.instagram}
              aria-label="Instagram"
              className="text-[#C8A97E] hover:text-[#FAFAF9]"
            >
              <IconCamera className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${siteInfo.whatsapp}`}
              aria-label="WhatsApp"
              className="text-[#C8A97E] hover:text-[#FAFAF9]"
            >
              <IconPhone className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <div className="font-bebas mb-5 text-sm tracking-[0.22em]">
            LINKS RÁPIDOS
          </div>
          <ul className="list-none space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#999] transition hover:text-[#C8A97E]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#agendar"
                className="text-sm text-[#999] transition hover:text-[#C8A97E]"
              >
                Reservar online
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-bebas mb-5 text-sm tracking-[0.22em]">SERVIÇOS</div>
          <ul className="list-none space-y-3">
            {services.slice(0, 5).map((service) => (
              <li key={service.name}>
                <a
                  href="#servicos"
                  className="text-sm text-[#999] transition hover:text-[#C8A97E]"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-bebas mb-5 text-sm tracking-[0.22em]">VISITE-NOS</div>
          <div className="space-y-4 text-sm leading-6 text-[#999]">
            <div className="flex gap-3">
              <IconMap className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A97E]" />
              <p>
                {siteInfo.address.street}
                <br />
                {siteInfo.address.neighborhood}, {siteInfo.address.city}{" "}
                {siteInfo.address.zip}
              </p>
            </div>
            <div className="flex gap-3">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A97E]" />
              <p>{siteInfo.phone}</p>
            </div>
            <div className="flex gap-3">
              <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A97E]" />
              <p>
                {siteInfo.hours.map((item) => (
                  <span key={item.days}>
                    {item.days}: {item.time}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#C8A97E]/15 pt-6 text-center text-[11px] tracking-[0.16em] text-[#6B6B6B] uppercase sm:flex-row sm:text-left">
        <p>Showcase por Dechen Web Studio · {siteInfo.name}</p>
        <a
          href="https://dechenwebstudio.com.br"
          className="hover:text-[#C8A97E]"
        >
          Agência
        </a>
      </div>
    </footer>
  );
}
