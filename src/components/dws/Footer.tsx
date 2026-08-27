import { Logo } from "@/components/dws/Logo";
import { homeNav } from "@/components/dws/nav";
import { FOCUS } from "@/components/dws/ui";
import {
  AGENCY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappUrl,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#262626] px-5 py-12 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-start gap-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-[#6B6B76]">
            Sites para negócios locais.
            <br />
            &copy; {year} {AGENCY.name}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {homeNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </li>
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
            >
              Instagram @{INSTAGRAM_HANDLE}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${AGENCY.email}`}
              className={`text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
            >
              {AGENCY.email}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
