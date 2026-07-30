import Link from "next/link";
import { siteInfo, whatsappUrl } from "@/data/vertex-consultoria";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(34,211,238,0.12)] bg-[#070B10] px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <p className="font-display text-xl font-semibold text-[#E8EEF4]">
              VERTEX<span className="text-[#22D3EE]">.</span>
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#8B9AAB]">
              {siteInfo.tagline}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex gap-5">
              <a
                href={siteInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#8B9AAB] transition-colors hover:text-[#22D3EE]"
              >
                LinkedIn
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#8B9AAB] transition-colors hover:text-[#22D3EE]"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="font-sans text-sm text-[#8B9AAB] transition-colors hover:text-[#22D3EE]"
              >
                E-mail
              </a>
            </div>
            <p className="font-sans text-sm text-[#8B9AAB]">{siteInfo.phone}</p>
            <p className="max-w-xs text-center font-sans text-sm text-[#8B9AAB] md:text-right">
              {siteInfo.address.full}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[rgba(34,211,238,0.1)] pt-8 sm:flex-row">
          <p className="font-sans text-xs text-[#8B9AAB]/70">
            &copy; {new Date().getFullYear()} {siteInfo.name}. Projeto demonstrativo.
          </p>
          <Link
            href="/#projetos"
            className="font-sans text-xs text-[#8B9AAB]/70 transition-colors hover:text-[#22D3EE]"
          >
            Showcase por Dechen Web Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
