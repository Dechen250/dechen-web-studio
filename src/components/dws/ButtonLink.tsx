import type { ReactNode } from "react";
import { FOCUS } from "@/components/dws/ui";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0070F3] text-white hover:bg-[#0064d8] active:bg-[#0058c0]",
  secondary:
    "border border-[#2e2e2e] bg-transparent text-[#C4C4CC] hover:border-[#52525b] hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs sm:h-10 sm:px-4 sm:text-sm",
  md: "h-12 px-6 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${FOCUS} ${className}`}
    >
      {children}
    </a>
  );
}
