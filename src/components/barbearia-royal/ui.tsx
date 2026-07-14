import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-sm font-sans text-sm font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A35A]";

const variants = {
  primary:
    "bg-[#C4A35A] px-8 py-3.5 text-[#0C0A09] shadow-[0_2px_20px_rgba(196,163,90,0.25)] hover:bg-[#D4B56A] hover:shadow-[0_4px_28px_rgba(196,163,90,0.35)] active:scale-[0.98]",
  secondary:
    "border border-[rgba(196,163,90,0.35)] bg-transparent px-8 py-3.5 text-[#F2EBE0] hover:border-[#C4A35A]/60 hover:bg-[rgba(196,163,90,0.08)]",
  ghost: "px-4 py-2 text-[#9A9186] hover:text-[#C4A35A]",
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
      <a href={href} className={classes} onClick={onClick}>
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

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 max-w-2xl ${alignClass}`}>
      {label && (
        <p className="mb-3 font-sans text-xs font-medium tracking-[0.28em] text-[#C4A35A] uppercase">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-[#F2EBE0] md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-[#9A9186] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-[fadeInUp_0.8s_ease-out_both] ${className}`}>
      {children}
    </div>
  );
}
