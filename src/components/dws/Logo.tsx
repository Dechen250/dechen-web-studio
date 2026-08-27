import { FOCUS } from "@/components/dws/ui";
import { AGENCY } from "@/lib/site";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <a
      href={href}
      className={`flex min-w-0 items-baseline gap-1.5 ${FOCUS}`}
      aria-label={`${AGENCY.name} — início`}
    >
      <span className="text-[15px] font-semibold tracking-tight text-white sm:text-base">
        {AGENCY.shortName}
      </span>
      <span className="hidden text-[13px] font-medium tracking-tight text-[#8A8A96] lg:inline">
        Web Studio
      </span>
    </a>
  );
}
