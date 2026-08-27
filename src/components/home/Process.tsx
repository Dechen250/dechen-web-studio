import { SECTION } from "@/components/dws/ui";

const steps = [
  {
    n: "1",
    title: "Conversar",
    text: "Você conta o negócio. A gente define páginas, prazo e o que o site precisa fazer.",
    notes: ["Briefing escrito", "Mapa de páginas", "Cronograma"],
  },
  {
    n: "2",
    title: "Desenhar",
    text: "Layout alinhado à sua marca. Você vê o visual e aprova antes do código.",
    notes: ["Estrutura das telas", "Layout final", "Ajustes até fechar"],
  },
  {
    n: "3",
    title: "Construir",
    text: "Código rápido, no celular e no computador, pronto para o Google indexar.",
    notes: ["Site responsivo", "WhatsApp e formulário", "Teste em dispositivos"],
  },
  {
    n: "4",
    title: "Publicar",
    text: "Domínio, certificado, site no ar. Entregamos e explicamos o que ficou.",
    notes: ["Site no ar", "Certificado HTTPS", "Como usar o site"],
  },
];

export function Process() {
  return (
    <section id="processo" className={SECTION}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Como a gente trabalha
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B4B4BE] md:text-lg">
            Quatro etapas. Você aprova antes de avançar.
          </p>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step) => (
            <li key={step.n}>
              <p className="text-sm text-[#6B6B76]">{step.n}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                {step.text}
              </p>
              <ul className="mt-4 space-y-1.5">
                {step.notes.map((note) => (
                  <li key={note} className="text-sm text-[#6B6B76]">
                    {note}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
