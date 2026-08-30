import Image from "next/image";
import { ambienteGallery } from "@/data/divina-cozinha";

export function Ambiente() {
  return (
    <section id="ambiente" className="py-16">
      <div className="mb-10 px-2">
        <h2 className="font-serif text-4xl text-slate-800 italic">
          Um ambiente pensado para receber você
        </h2>
        <p className="mt-2 max-w-xl font-mono text-xs tracking-widest text-slate-500 uppercase">
          Cada detalhe combina contemporâneo e acolhimento — encontros, celebrações e a mesa do dia a dia
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ambienteGallery.map((item, index) => (
          <figure
            key={item.title}
            className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 ${
              index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${index === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            </div>
            <figcaption className="absolute bottom-0 left-0 p-6">
              <span className="font-serif text-lg text-white md:text-xl">
                {item.title}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
