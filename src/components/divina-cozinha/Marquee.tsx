import { marqueeItems } from "@/data/divina-cozinha";
import { IconStar } from "./icons";

export function Marquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full overflow-hidden border-y border-slate-200 bg-white py-6">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-slate-400">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase"
          >
            <IconStar className="text-brand-rose h-3.5 w-3.5" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
