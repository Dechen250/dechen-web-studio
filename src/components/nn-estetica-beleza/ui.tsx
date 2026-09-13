import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

const base =
  "inline-flex items-center justify-center rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B5A]";

const variants = {
  primary:
    "bg-[#9A6B5A] px-8 py-3.5 text-[#FFFBFA] shadow-[0_2px_16px_rgba(154,107,90,0.28)] hover:bg-[#825845] hover:shadow-[0_4px_28px_rgba(154,107,90,0.34)] active:scale-[0.98]",
  secondary:
    "border border-[#E6DCD4] bg-[#FFFBFA] px-8 py-3.5 text-[#2B2420] hover:border-[#9A6B5A]/45 hover:bg-[#F3E7DF]",
  ghost: "px-4 py-2 text-[#7A716A] hover:text-[#9A6B5A]",
};

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
  disabled = false,
  target,
  rel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  }`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`mb-14 max-w-2xl ${alignClass}`}>
      {label && (
        <p className="mb-3 font-sans text-xs font-medium tracking-[0.22em] text-[#9A6B5A] uppercase">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-[#2B2420] md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-[#7A716A] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function PlaceholderFlag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-[#9A6B5A]/40 bg-[#F3E7DF] px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.14em] text-[#825845] uppercase">
      {children}
    </span>
  );
}

export { Reveal as FadeIn };
