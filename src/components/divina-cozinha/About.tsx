import Image from "next/image";
import { chef } from "@/data/divina-cozinha";
import { IconChefHat } from "./icons";
import { Button } from "./ui";

export function About() {
  return (
    <section id="sobre" className="py-12">
      <div className="overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-12 md:p-20">
            <IconChefHat className="text-brand-rose mb-8 h-10 w-10 opacity-20" />
            <h2 className="mb-6 font-serif text-3xl leading-none md:text-5xl">
              {chef.headline} <br />
              <span className="text-slate-400 italic">{chef.italic}</span>
            </h2>
            <div className="max-w-md space-y-6 leading-relaxed text-slate-600">
              {chef.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#cardapio" variant="solid">
                Explorar pratos
              </Button>
              <Button href="#reservas" variant="secondary">
                Reservar mesa
              </Button>
            </div>
            <div className="mt-12 flex w-full gap-12 border-t border-slate-100 pt-8">
              {chef.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-serif text-2xl font-bold">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px]">
            <Image
              src={chef.image}
              alt={chef.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute right-8 bottom-8 max-w-xs rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="font-mono text-[10px] font-bold tracking-widest text-slate-800 uppercase">
                  {chef.liveLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
