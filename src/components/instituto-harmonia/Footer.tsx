import Link from "next/link";
import { siteInfo, whatsappUrl } from "@/data/instituto-harmonia";

export function Footer() {
  return (
    <footer className="border-t border-[#D5E4E0] bg-[#E8F3F0]/55 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <p className="font-display text-2xl font-medium text-[#1A2E2B]">
              Instituto <span className="text-[#2A7A6E]">Harmonia</span>
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#5A6F6A]">
              {siteInfo.tagline}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex gap-5">
              <a
                href={siteInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#5A6F6A] transition-colors hover:text-[#2A7A6E]"
              >
                Instagram
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#5A6F6A] transition-colors hover:text-[#2A7A6E]"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="font-sans text-sm text-[#5A6F6A] transition-colors hover:text-[#2A7A6E]"
              >
                E-mail
              </a>
            </div>
            <p className="font-sans text-sm text-[#5A6F6A]">{siteInfo.phone}</p>
            <p className="max-w-xs text-center font-sans text-sm text-[#5A6F6A] md:text-right">
              {siteInfo.address.full}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#D5E4E0] pt-8 sm:flex-row">
          <p className="font-sans text-xs text-[#5A6F6A]/80">
            &copy; {new Date().getFullYear()} {siteInfo.name}. Projeto demonstrativo.
          </p>
          <Link
            href="/#projetos"
            className="font-sans text-xs text-[#5A6F6A]/80 transition-colors hover:text-[#2A7A6E]"
          >
            Showcase por Dechen Web Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
