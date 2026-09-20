import { services } from "@/data/barbearia-royal";
import { IconArrowUpRight, serviceIcons } from "./icons";
import { SectionTag } from "./ui";

export function Services() {
  return (
    <section className="px-5 py-20 md:px-12 lg:px-20 lg:py-32" id="servicos">
      <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <SectionTag text="O que oferecemos" />
          <h2 className="font-bebas text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
            NOSSOS{" "}
            <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
              Premium
            </span>
            <br />
            SERVIÇOS
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#999] lg:text-right">
          Cada serviço é executado com precisão, hora marcada e o acabamento
          que define a presença — preços demonstrativos neste showcase.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-px border border-[#C8A97E] bg-[#C8A97E] sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <article
              key={service.name}
              className="group relative bg-[#0A0A0A] p-8 transition-colors hover:bg-[#141414] lg:p-10"
            >
              <Icon className="mb-8 h-8 w-8 text-[#C8A97E]" />
              <IconArrowUpRight className="absolute top-8 right-8 h-5 w-5 text-[#C8A97E] opacity-0 transition group-hover:opacity-100" />
              <h3 className="font-bebas mb-3 text-2xl tracking-[0.08em]">
                {service.name}
              </h3>
              <p className="mb-8 min-h-16 text-sm leading-7 text-[#999]">
                {service.description}
              </p>
              <div className="flex items-end justify-between border-t border-[#C8A97E]/15 pt-5">
                <span className="font-bebas text-2xl text-[#C8A97E]">
                  {service.price}
                </span>
                <span className="text-[11px] tracking-[0.18em] text-[#6B6B6B] uppercase">
                  {service.duration}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
