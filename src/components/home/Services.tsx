import { SECTION } from "@/components/dws/ui";

const services = [
  {
    title: "Landing page",
    summary:
      "Página única para campanha, oferta ou captação. O visitante chega, entende e fala com você.",
    detail:
      "Quando você anuncia, cada clique precisa virar conversa. A landing vai direto: o que você oferece, para quem, e o botão. WhatsApp e formulário já entram no layout.",
  },
  {
    title: "Site institucional",
    summary:
      "Várias seções: quem você é, o que faz, onde fica, como falar. A vitrine do negócio na internet.",
    detail:
      "Antes de ligar, a pessoa pesquisa. O site institucional responde essas perguntas com calma e deixa um caminho claro para o contato — no celular e no computador.",
  },
  {
    title: "Portfólio",
    summary:
      "Vitrine do seu trabalho, com espaço para o que importa e um jeito claro de chamar você.",
    detail:
      "Se o trabalho é o argumento, a página precisa mostrar ele com espaço. Cases, imagens e um CTA visível — para o visitante certo conseguir te contratar.",
  },
  {
    title: "Manutenção",
    summary:
      "Ajustes, correções e o site no ar. Você cuida do negócio; a gente cuida da página.",
    detail:
      "Site publicado não se mantém sozinho. Atualizações de conteúdo, correções e acompanhamento para você não virar o técnico do próprio site.",
  },
];

export function Services() {
  return (
    <section id="servicos" className={SECTION}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            O que fazemos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B4B4BE] md:text-lg">
            Landing, institucional, vitrine ou manutenção. A gente recomenda o
            que resolve, depois constrói.
          </p>
        </div>

        <ul className="mt-12 border-t border-[#262626]">
          {services.map((service) => (
            <li
              key={service.title}
              className="grid gap-3 border-b border-[#262626] py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12 md:py-10"
            >
              <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {service.title}
              </h3>
              <div>
                <p className="text-base leading-relaxed text-[#C4C4CC]">
                  {service.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#8A8A96]">
                  {service.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
