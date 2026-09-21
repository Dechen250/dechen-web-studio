import Link from "next/link";
import { navLinks, siteInfo, whatsappUrl } from "@/data/nn-estetica-beleza";

export function Footer() {
  return (
    <footer className="border-t border-[#E6DCD4] bg-[#F3E7DF]/70 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-medium text-[#2B2420]">
              NN <span className="text-[#9A6B5A]">Estética e Beleza</span>
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#7A716A]">
              {siteInfo.tagline}
            </p>
            <p className="mt-4 font-sans text-sm text-[#7A716A]">{siteInfo.city}</p>
          </div>

          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-sm text-[#7A716A] transition-colors hover:text-[#9A6B5A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#agendar"
                className="font-sans text-sm text-[#7A716A] transition-colors hover:text-[#9A6B5A]"
              >
                Agendar
              </a>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <a
              href={siteInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-[#7A716A] transition-colors hover:text-[#9A6B5A]"
            >
              Instagram
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-[#7A716A] transition-colors hover:text-[#9A6B5A]"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <p className="mt-10 max-w-2xl font-sans text-xs leading-relaxed text-[#7A716A]/90">
          Procedimentos estéticos sujeitos a avaliação. Resultados variam de
          pessoa para pessoa. Este é um esboço da Dechen Web Studio: dados entre
          colchetes ainda não foram confirmados pela clínica.
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#E6DCD4] pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-[#7A716A]/80">
            &copy; {new Date().getFullYear()} {siteInfo.name}. Proposta visual —
            não publicado.
          </p>
          <Link
            href="/"
            className="font-sans text-xs text-[#7A716A]/80 transition-colors hover:text-[#9A6B5A]"
          >
            Dechen Web Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
