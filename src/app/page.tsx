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

function DwsLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const sizeClasses =
    size === "sm"
      ? "h-8 w-8 rounded-[10px] text-[10px]"
      : "h-10 w-10 rounded-[12px] text-xs";

  return (
    <span
      className={`relative flex items-center justify-center border border-[#0070F3]/30 bg-[#101010]/70 font-bold tracking-tight shadow-[0_0_20px_rgba(0,112,243,0.12)] backdrop-blur-md transition-all duration-[250ms] ease-out ${sizeClasses}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#0070F3]/25 via-transparent to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <span className="relative">DWS</span>
    </span>
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
    "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-semibold transition-all duration-[300ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070F3] active:scale-[0.98]";

  const styles =
    variant === "primary"
      ? "border border-[#0070F3]/40 bg-gradient-to-b from-[#0070F3]/45 via-[#0070F3]/25 to-[#0070F3]/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md hover:scale-[1.02] hover:border-[#0070F3]/60 hover:shadow-[0_0_40px_rgba(0,112,243,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
      : "border border-white/10 bg-[#101010]/50 text-[#A1A1AA] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md hover:scale-[1.02] hover:border-white/20 hover:bg-[#101010]/70 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.1)]";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full ${
          variant === "primary"
            ? "bg-gradient-to-b from-white/20 to-transparent"
            : "bg-gradient-to-b from-white/8 to-transparent"
        }`}
      />
      <span className="relative">{children}</span>
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
      {/* Navbar flutuante — Liquid Glass */}
      <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-6 lg:px-8">
        <nav
          className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-white/[0.08] bg-[#101010]/60 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_48px_rgba(0,112,243,0.06)] backdrop-blur-xl md:h-16 md:rounded-3xl md:px-6 lg:max-w-6xl"
          aria-label="Principal"
        >
          <a
            href="#"
            className="transition-transform duration-[250ms] ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
            aria-label="Dechen Web Studio — início"
          >
            <DwsLogo />
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
            className="hidden h-11 px-6 text-xs sm:inline-flex md:h-12 md:px-7 md:text-sm"
          >
            Solicitar orçamento
          </GlassButton>

          <GlassButton
            href="#contato"
            variant="primary"
            className="inline-flex h-10 px-5 text-xs sm:hidden"
          >
            Orçamento
          </GlassButton>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-32 md:px-6 md:pt-32 md:pb-40 lg:px-8 lg:pt-36 lg:pb-48">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-[15%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,112,243,0.14)_0%,transparent_68%)]" />
            <div className="absolute top-[8%] left-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.08)_0%,transparent_70%)] blur-2xl" />
            <div className="absolute right-[8%] bottom-[18%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.06)_0%,transparent_72%)] blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0070F3]/[0.03] blur-[100px]" />
          </div>

          <div className="relative mx-auto w-full max-w-3xl text-center">
            <SectionLabel>Dechen Web Studio</SectionLabel>
            <h1 className="text-4xl leading-[1.12] font-semibold tracking-tight md:text-5xl lg:text-[64px] lg:leading-[1.05]">
              Seu site deveria trazer clientes,{" "}
              <span className="text-[#A1A1AA]">não apenas existir.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#A1A1AA] md:mt-10">
              Criamos sites rápidos, modernos e estratégicos para empresas que
              querem transmitir confiança, autoridade e crescer na internet.
            </p>
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-16">
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
            <DwsLogo size="sm" />
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
