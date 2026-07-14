import Link from "next/link";
import { siteInfo } from "@/data/barbearia-royal";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(196,163,90,0.12)] bg-[#090807] px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-medium text-[#F2EBE0]">
              Barbearia <span className="text-[#C4A35A]">Royal</span>
            </p>
            <p className="mt-2 font-sans text-sm text-[#9A9186]">
              {siteInfo.tagline}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex gap-4">
              <a
                href={siteInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#9A9186] transition-colors hover:text-[#C4A35A]"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href={`https://wa.me/${siteInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#9A9186] transition-colors hover:text-[#C4A35A]"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
            </div>
            <p className="font-sans text-sm text-[#9A9186]">{siteInfo.phone}</p>
            <p className="font-sans text-sm text-[#9A9186]">
              {siteInfo.address.full}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[rgba(196,163,90,0.1)] pt-8 sm:flex-row">
          <p className="font-sans text-xs text-[#6B6560]">
            &copy; {new Date().getFullYear()} {siteInfo.name}. Projeto
            demonstrativo.
          </p>
          <Link
            href="/#projetos"
            className="font-sans text-xs text-[#6B6560] transition-colors hover:text-[#C4A35A]"
          >
            Showcase por Dechen Web Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
