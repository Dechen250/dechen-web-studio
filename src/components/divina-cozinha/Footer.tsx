import Link from "next/link";
import { siteInfo } from "@/data/divina-cozinha";

export function Footer() {
  return (
    <footer className="border-t border-[#E8E0D4] bg-[#F5F0E8] px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-medium text-[#3D3832]">
              {siteInfo.name}
            </p>
            <p className="mt-2 font-sans text-sm text-[#6B6560]">
              {siteInfo.tagline}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex gap-4">
              <a
                href={siteInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#6B6560] transition-colors hover:text-[#3D3832]"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href={`https://wa.me/${siteInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#6B6560] transition-colors hover:text-[#3D3832]"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
            </div>
            <p className="font-sans text-sm text-[#6B6560]">{siteInfo.phone}</p>
            <p className="font-sans text-sm text-[#6B6560]">
              {siteInfo.address.full}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E8E0D4] pt-8 sm:flex-row">
          <p className="font-sans text-xs text-[#9C958D]">
            &copy; {new Date().getFullYear()} {siteInfo.name}. Todos os direitos
            reservados.
          </p>
          <Link
            href="/"
            className="font-sans text-xs text-[#9C958D] transition-colors hover:text-[#3D3832]"
          >
            Showcase por Dechen Web Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
