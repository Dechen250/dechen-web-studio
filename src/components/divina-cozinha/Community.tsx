import { offerings } from "@/data/divina-cozinha";
import { IconArrowRight, IconChefHat, IconLetter, IconShop } from "./icons";

const icons = {
  chef: IconChefHat,
  letter: IconLetter,
  shop: IconShop,
};

export function Community() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div
          className="animate-enter mx-auto mb-20 max-w-2xl text-center"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-brand-rose mb-4 block cursor-default font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">
            A mesa da casa
          </span>
          <h2 className="mb-6 font-serif text-4xl tracking-tight text-slate-900 md:text-5xl">
            Faça parte da experiência
          </h2>
          <p className="text-lg leading-relaxed text-balance text-slate-500">
            Mais do que uma refeição — um convite para encontros no Jardins, com
            carta da estação, reservas e celebrações privadas.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 lg:gap-8">
          {offerings.map((item, index) => {
            const Icon = icons[item.icon];
            const delay = 0.2 + index * 0.1;

            if (item.featured) {
              return (
                <div
                  key={item.id}
                  className="animate-enter relative z-10 rounded-3xl border border-slate-200 border-t-4 border-t-[#e11d48] bg-white p-8 text-center shadow-2xl transition-all duration-300 group md:scale-105 hover:-translate-y-2 lg:p-10"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg transition-transform group-hover:scale-110">
                    Mais popular
                  </div>
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e11d48]/5 text-[#e11d48] shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-[#e11d48] group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-[#e11d48]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900"
                  >
                    {item.cta}
                  </a>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="animate-enter group rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl lg:p-10"
                style={{ animationDelay: `${delay}s` }}
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#e11d48] group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#e11d48]">
                  {item.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  className="inline-flex items-center justify-center gap-2 border-b border-slate-200 py-2 text-xs font-bold tracking-widest text-slate-900 uppercase transition-all group-hover:border-[#e11d48] group-hover:text-[#e11d48]"
                >
                  <span>{item.cta}</span>
                  <IconArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
