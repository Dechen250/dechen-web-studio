import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e11d48]";

const variants = {
  primary:
    "rounded-full bg-slate-950 px-5 py-2.5 text-white hover:bg-[#e11d48]",
  solid:
    "rounded-xl bg-slate-900 px-8 py-4 text-white hover:bg-[#e11d48]",
  secondary:
    "rounded-xl border border-slate-200 bg-white px-8 py-4 text-slate-900 hover:border-slate-900",
  ghost:
    "rounded-full px-4 py-2 text-slate-600 hover:text-slate-900",
};

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export { Reveal as FadeIn } from "@/components/motion/Reveal";
