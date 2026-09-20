import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
}) {
  return <div className={className}>{children}</div>;
}

export function SectionTag({
  text,
  centered = false,
}: {
  text: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`mb-6 inline-flex items-center gap-4 ${centered ? "w-full justify-center" : ""}`}
    >
      <span className="h-px w-10 bg-[#C8A97E]" />
      <span className="text-[10px] font-medium tracking-[0.35em] text-[#C8A97E] uppercase">
        {text}
      </span>
      {centered ? <span className="h-px w-10 bg-[#C8A97E]" /> : null}
    </div>
  );
}
