import { ButtonLink } from "@/components/dws/ButtonLink";
import { Logo } from "@/components/dws/Logo";
import { homeNav } from "@/components/dws/nav";
import { FOCUS } from "@/components/dws/ui";

export function Navbar({
  hrefBase = "",
  fixed = true,
}: {
  hrefBase?: "" | "/";
  fixed?: boolean;
}) {
  const hrefFor = (hash: string) => `${hrefBase}${hash}`;

  return (
    <header
      className={`z-50 border-b border-white/[0.06] backdrop-blur-md ${
        fixed
          ? "fixed inset-x-0 top-0 bg-[#050505]/90"
          : "relative shrink-0 bg-[#050505]"
      }`}
    >
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 md:h-16 md:px-6 lg:px-8"
        aria-label="Principal"
      >
        <Logo href={hrefBase === "/" ? "/" : "#"} />

        <ul className="hidden items-center gap-6 md:flex lg:gap-7">
          {homeNav.map((link) => (
            <li key={link.href}>
              <a
                href={hrefFor(link.href)}
                className={`text-sm text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ButtonLink href={hrefFor("#contato")} size="sm" className="shrink-0">
          Orçamento
        </ButtonLink>
      </nav>
    </header>
  );
}
