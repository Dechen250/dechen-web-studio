import { FadeIn, SectionHeading } from "./ui";

export function About() {
  return (
    <section id="sobre" className="bg-[#FAF9F6] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            label="Nossa história"
            title="Uma paixão pela gastronomia."
            align="left"
          />
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn className="space-y-6">
            <p className="font-sans text-base leading-relaxed text-[#6B6560] md:text-lg">
              A Divina Cozinha nasceu da ideia de transformar refeições em
              experiências memoráveis.
            </p>
            <p className="font-sans text-base leading-relaxed text-[#6B6560] md:text-lg">
              Cada prato é preparado com ingredientes cuidadosamente
              selecionados, respeitando sabores tradicionais e técnicas
              contemporâneas.
            </p>
            <p className="font-sans text-base leading-relaxed text-[#6B6560] md:text-lg">
              Mais do que servir comida, queremos proporcionar momentos
              especiais.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Excelência", text: "Ingredientes de qualidade em cada preparo." },
                { title: "Hospitalidade", text: "Cada cliente recebido como convidado especial." },
                { title: "Tradição", text: "Sabores clássicos com olhar contemporâneo." },
                { title: "Inovação", text: "Técnicas modernas sem perder a essência." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E8E0D4] bg-[#FFFDF8] p-6 shadow-[0_2px_16px_rgba(61,56,50,0.04)]"
                >
                  <h3 className="font-display text-lg font-medium text-[#3D3832]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B6560]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
