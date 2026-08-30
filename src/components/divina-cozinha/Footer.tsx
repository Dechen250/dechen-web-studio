import Link from "next/link";
import { siteInfo } from "@/data/divina-cozinha";
import { IconCamera } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white pt-20 pb-10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <a href="#" className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0b0b] text-white">
                <span className="font-serif text-lg font-bold italic">D</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                {siteInfo.name}
              </span>
            </a>
            <p className="text-sm leading-relaxed text-slate-500">
              {siteInfo.tagline} Feito com carinho nos Jardins, São Paulo.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-24">
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-widest uppercase">
                Carta
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a className="hover:text-[#e11d48]" href="#cardapio">
                    Entradas
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href="#cardapio">
                    Pratos principais
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href="#cardapio">
                    Sobremesas
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href="#cardapio">
                    Vinhos e drinks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-widest uppercase">
                Casa
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a className="hover:text-[#e11d48]" href="#sobre">
                    Sobre a chef
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href="#ambiente">
                    Ambiente
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href="#reservas">
                    Reservas
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href="#localizacao">
                    Como chegar
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-widest uppercase">
                Social
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a
                    className="flex items-center gap-2 hover:text-[#e11d48]"
                    href={siteInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <IconCamera /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#e11d48]"
                    href={`https://wa.me/${siteInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#e11d48]" href={`mailto:${siteInfo.email}`}>
                    {siteInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10">
          <h2 className="pointer-events-none text-center font-serif text-[14vw] leading-none text-slate-100 select-none">
            DIVINA
          </h2>
          <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate-400 uppercase">
            <span>
              © {year} {siteInfo.name} · Projeto demonstrativo
            </span>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-slate-800">
                Showcase por Dechen Web Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
