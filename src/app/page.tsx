import type { ReactNode } from "react";

const indicators = [
  { label: "Performance", value: "95+" },
  { label: "Responsivo", value: "100%" },
  { label: "SEO", value: "Otimizado" },
  { label: "Entrega rápida", value: "7–14 dias" },
];

const services = [
  {
    title: "Landing Pages",
    description:
      "Páginas focadas em conversão para campanhas, lançamentos e captação de leads.",
  },
  {
    title: "Sites Institucionais",
    description:
      "Presença completa na web com páginas estratégicas e identidade visual sólida.",
  },
  {
    title: "Portfólios",
    description:
      "Showcase elegante para profissionais e criativos que precisam se destacar.",
  },
  {
    title: "Manutenção",
    description:
      "Atualizações, correções e melhorias contínuas para seu site sempre atual.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Planejamento",
    description:
      "Entendemos seu negócio, público e objetivos para definir a estratégia certa.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Criamos layouts modernos alinhados à sua marca e focados em conversão.",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description:
      "Código limpo, performance alta e compatibilidade total com dispositivos.",
  },
  {
    step: "04",
    title: "Publicação",
    description:
      "Deploy, testes finais e entrega pronta para gerar resultados.",
  },
];

const projects = [
  {
    name: "Academia de MMA",
    category: "Landing Page",
    description:
      "Site de alta conversão para captar alunos e agendar aulas experimentais.",
    gradient: "from-[#0070F3]/20 via-[#0070F3]/5 to-transparent",
  },
  {
    name: "Barbearia Premium",
    category: "Site Institucional",
    description:
      "Presença digital elegante com agendamento online e portfólio de serviços.",
    gradient: "from-[#404040]/40 via-[#262626]/20 to-transparent",
  },
  {
    name: "Clínica Moderna",
    category: "Site Institucional",
    description:
      "Interface limpa que transmite confiança e facilita o contato com pacientes.",
    gradient: "from-[#0070F3]/10 via-[#101010]/40 to-transparent",
  },
];

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-[#262626] bg-[#101010]/80 backdrop-blur-md transition-all duration-[250ms] ease-out hover:border-[#404040] hover:bg-[#101010] ${className}`}
    >
      {children}
    </div>
  );
}

function GlassButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex h-14 items-center justify-center rounded-full px-8 text-sm font-semibold transition-all duration-[250ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070F3] active:scale-[0.98]";

  const styles =
    variant === "primary"
      ? "border border-[#0070F3]/50 bg-gradient-to-b from-[#0070F3]/30 to-[#0070F3]/15 text-white backdrop-blur-md hover:border-[#0070F3]/70 hover:shadow-[0_0_32px_rgba(0,112,243,0.2)]"
      : "border border-[#262626] bg-[#101010]/60 text-[#A1A1AA] backdrop-blur-md hover:border-[#404040] hover:bg-[#101010] hover:text-white";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-sm font-medium tracking-[0.15em] text-[#0070F3] uppercase">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <div className="min-h-full bg-[#050505] font-sans text-white selection:bg-[#0070F3]/30">
      {/* Navbar — 72px, Liquid Glass, backdrop blur */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#262626]/80 bg-[#050505]/70 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-6 lg:px-8"
          aria-label="Principal"
        >
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#262626] bg-[#101010]/60 text-xs font-bold tracking-tight backdrop-blur-md transition-all duration-[250ms] ease-out hover:border-[#404040] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070F3]"
            aria-label="Dechen Web Studio — início"
          >
            DWS
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#A1A1AA] transition-colors duration-[250ms] ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <GlassButton
            href="#contato"
            variant="primary"
            className="hidden h-11 px-6 text-xs sm:inline-flex md:h-14 md:px-8 md:text-sm"
          >
            Solicitar orçamento
          </GlassButton>

          <GlassButton
            href="#contato"
            variant="primary"
            className="inline-flex h-11 px-5 text-xs sm:hidden"
          >
            Orçamento
          </GlassButton>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pt-36 pb-24 md:px-6 lg:px-8 lg:pt-44 lg:pb-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#0070F3]/[0.06] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <SectionLabel>Dechen Web Studio</SectionLabel>
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl lg:text-[64px] lg:leading-[1.05]">
              Seu site deveria trazer clientes,{" "}
              <span className="text-[#A1A1AA]">não apenas existir.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
              Criamos sites rápidos, modernos e estratégicos para empresas que
              querem transmitir confiança, autoridade e crescer na internet.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlassButton href="#contato" variant="primary">
                Solicitar orçamento
              </GlassButton>
              <GlassButton href="#projetos" variant="secondary">
                Ver projetos
              </GlassButton>
            </div>
          </div>
        </section>

        {/* Indicadores */}
        <section aria-label="Indicadores" className="px-5 pb-24 md:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
            {indicators.map((item) => (
              <GlassCard key={item.label} className="p-6 text-center">
                <p className="text-2xl font-semibold tracking-tight text-[#0070F3]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-[#A1A1AA]">{item.label}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Serviços */}
        <section
          id="servicos"
          className="border-t border-[#262626]/80 px-5 py-24 md:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <SectionLabel>Serviços</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Soluções para cada
                <br />
                <span className="text-[#A1A1AA]">etapa do seu crescimento.</span>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <GlassCard key={service.title} className="group p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {service.title}
                    </h3>
                    <span
                      aria-hidden
                      className="text-[#404040] transition-all duration-[250ms] ease-out group-hover:translate-x-1 group-hover:text-[#0070F3]"
                    >
                      →
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#A1A1AA] md:text-base">
                    {service.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section
          id="processo"
          className="border-t border-[#262626]/80 px-5 py-24 md:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <SectionLabel>Processo</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Simples, transparente
                <br />
                <span className="text-[#A1A1AA]">e sem surpresas.</span>
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <li key={step.step}>
                  <GlassCard className="flex h-full flex-col p-8">
                    <span className="mb-6 text-sm font-medium tracking-widest text-[#0070F3]">
                      {step.step}
                    </span>
                    <h3 className="mb-2 text-lg font-semibold tracking-tight md:text-xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#A1A1AA]">
                      {step.description}
                    </p>
                  </GlassCard>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Projetos */}
        <section
          id="projetos"
          className="border-t border-[#262626]/80 px-5 py-24 md:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <SectionLabel>Projetos</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Conceitos que mostram
                <br />
                <span className="text-[#A1A1AA]">o potencial da sua marca.</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.name} className="group">
                  <div className="overflow-hidden rounded-3xl border border-[#262626] bg-[#101010]/80 backdrop-blur-md transition-all duration-[250ms] ease-out hover:border-[#404040]">
                    <div
                      className={`relative flex h-48 items-end bg-gradient-to-br ${project.gradient} p-6`}
                    >
                      <span className="rounded-full border border-[#262626] bg-[#101010]/70 px-3 py-1 text-xs text-[#A1A1AA] backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-8">
                      <h3 className="mb-2 text-lg font-semibold tracking-tight transition-colors duration-[250ms] ease-out group-hover:text-[#0070F3] md:text-xl">
                        {project.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#A1A1AA]">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section
          id="contato"
          className="border-t border-[#262626]/80 px-5 py-24 md:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="relative overflow-hidden rounded-3xl border border-[#262626] bg-[#101010]/80 px-8 py-16 backdrop-blur-md sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0070F3]/[0.06] to-transparent"
              />
              <div className="relative">
                <SectionLabel>Vamos conversar</SectionLabel>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Pronto para ter um site
                  <br />
                  <span className="text-[#A1A1AA]">que gera clientes?</span>
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#A1A1AA] md:text-base">
                  Conte sobre seu projeto e receba um orçamento personalizado em
                  até 24 horas.
                </p>
                <div className="mt-10 flex flex-col items-center gap-4">
                  <GlassButton
                    href="mailto:hello@dechenwebstudio.com"
                    variant="primary"
                  >
                    Solicitar orçamento
                  </GlassButton>
                  <a
                    href="mailto:hello@dechenwebstudio.com"
                    className="text-sm text-[#A1A1AA] transition-colors duration-[250ms] ease-out hover:text-[#0070F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
                  >
                    hello@dechenwebstudio.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626]/80 px-5 py-12 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[12px] border border-[#262626] bg-[#101010]/60 text-[10px] font-bold">
              DWS
            </span>
            <p className="text-sm text-[#A1A1AA]">
              &copy; {new Date().getFullYear()} Dechen Web Studio
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A1A1AA]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors duration-[250ms] ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
