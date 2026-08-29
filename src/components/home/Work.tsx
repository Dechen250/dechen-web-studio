import Image from "next/image";
import Link from "next/link";
import { SECTION } from "@/components/dws/ui";
import { InView } from "@/components/motion/InView";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { portfolioDemos } from "@/data/portfolio-demos";

const blurbs: Record<string, string> = {
  restaurante:
    "Cardápio, reservas e o tom de um restaurante contemporâneo.",
  barbearia:
    "Serviços, preços e agendamento para uma barbearia de corte clássico.",
  clinica:
    "Especialidades, equipe e WhatsApp para uma clínica multidisciplinar.",
  empresa:
    "Método, serviços e contato para uma consultoria institucional.",
};

export function Work() {
  return (
    <section id="trabalhos" className={SECTION}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SplitHeading
            as="h2"
            className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            Trabalhos
          </SplitHeading>
          <SplitHeading
            as="p"
            delayMs={80}
            className="mt-4 text-base leading-relaxed text-[#B4B4BE] md:text-lg"
          >
            Quatro demonstrações. Segmentos diferentes, o mesmo critério:
            clareza, velocidade e um jeito óbvio de entrar em contato.
          </SplitHeading>
        </div>

        <InView
          as="ul"
          className="dws-stagger mt-12 grid gap-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-14"
        >
          {portfolioDemos.map((demo) => {
            const href = demo.href ?? `/portfolio/${demo.slug}`;
            const blurb = blurbs[demo.slug] ?? demo.description;

            return (
              <li key={demo.slug}>
                <Link
                  href={href}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#262626] bg-[#0c0c0c]">
                    {demo.cover ? (
                      <Image
                        src={demo.cover}
                        alt={`Capa da demonstração ${demo.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-4 text-xs tracking-wide text-[#6B6B76]">
                    {demo.category} · Demonstração
                  </p>
                  <SplitHeading
                    as="h3"
                    className="mt-1 text-lg font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-[#0070F3] sm:text-xl"
                  >
                    {demo.title}
                  </SplitHeading>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">
                    {blurb}
                  </p>
                </Link>
              </li>
            );
          })}
        </InView>
      </div>
    </section>
  );
}
