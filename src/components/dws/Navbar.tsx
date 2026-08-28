import { ButtonLink } from "@/components/dws/ButtonLink";
import { Logo } from "@/components/dws/Logo";
import { homeNav } from "@/components/dws/nav";
import { FOCUS } from "@/components/dws/ui";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050505]/90 backdrop-blur-md">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 md:h-16 md:px-6 lg:px-8"
        aria-label="Principal"
      >
        <Logo href="#" />

        <ul className="hidden items-center gap-6 md:flex lg:gap-7">
          {homeNav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ButtonLink href="#contato" size="sm" className="shrink-0">
          Orçamento
        </ButtonLink>
      </nav>
    </header>
  );
}
