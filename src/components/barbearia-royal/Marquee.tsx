import { marqueeItems } from "@/data/barbearia-royal";

function Track({ suffix }: { suffix: string }) {
  return (
    <div className="flex shrink-0 items-center">
      {marqueeItems.map((item) => (
        <div
          key={`${suffix}-${item}`}
          className="flex items-center gap-8 px-8"
        >
          <span className="font-bebas text-lg tracking-[0.22em] text-[#E8E6E1] uppercase">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8A97E]" />
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-[#C8A97E]/15 py-6"
      aria-hidden
    >
      <div className="animate-marquee flex w-max">
        <Track suffix="a" />
        <Track suffix="b" />
      </div>
    </div>
  );
}
