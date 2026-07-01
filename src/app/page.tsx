import type { ReactNode } from "react";

/* ── Tokens (Design System) ───────────────────────────────────────── */
const EASE = "ease-out";
const DURATION = "duration-[250ms]";
const TRANSITION = `transition-all ${DURATION} ${EASE}`;
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]";

/* ── Data ─────────────────────────────────────────────────────────── */
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

/* ── Primitives ───────────────────────────────────────────────────── */
function GlassSheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
    />
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group/card relative overflow-hidden rounded-3xl border border-[#262626] bg-[#101010]/75 backdrop-blur-md ${TRANSITION} hover:-translate-y-0.5 hover:border-[#404040] hover:bg-[#101010]/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${className}`}
    >
      <GlassSheen />
      <div className="relative">{children}</div>
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
      className={`relative flex items-center justify-center border border-[#0070F3]/25 bg-[#101010]/60 font-bold tracking-tight shadow-[0_0_16px_rgba(0,112,243,0.1)] backdrop-blur-md ${TRANSITION} ${sizeClasses}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#0070F3]/20 via-transparent to-transparent"
      />
      <GlassSheen />
      <span className="relative">DWS</span>
    </span>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={`group/link relative text-sm text-[#A1A1AA] ${TRANSITION} hover:text-white ${FOCUS}`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute -bottom-1 left-0 h-px w-0 bg-[#0070F3]/60 ${TRANSITION} group-hover/link:w-full`}
      />
    </a>
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
  const base = `group/btn relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-semibold ${TRANSITION} ${FOCUS} active:scale-[0.985] active:translate-y-0`;

  const styles =
    variant === "primary"
      ? "border border-[#0070F3]/35 bg-gradient-to-b from-[#0070F3]/40 via-[#0070F3]/22 to-[#0070F3]/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-lg hover:-translate-y-0.5 hover:scale-[1.015] hover:border-[#0070F3]/50 hover:shadow-[0_4px_24px_rgba(0,112,243,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]"
      : "border border-white/[0.08] bg-[#101010]/40 text-[#A1A1AA] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-lg hover:-translate-y-0.5 hover:scale-[1.015] hover:border-white/15 hover:bg-[#101010]/65 hover:text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-full ${
          variant === "primary"
            ? "bg-gradient-to-b from-white/15 to-transparent"
            : "bg-gradient-to-b from-white/6 to-transparent"
        }`}
      />
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_32px_rgba(0,112,243,0.15)] transition-opacity duration-[250ms] ease-out group-hover/btn:opacity-100"
        />
      )}
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

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,112,243,0.1)_0%,transparent_55%)]" />
      <div className="absolute top-[12%] left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,112,243,0.09)_0%,transparent_65%)]" />
      <div className="absolute top-[6%] left-[6%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.06)_0%,transparent_70%)] blur-2xl" />
      <div className="absolute right-[5%] bottom-[15%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.05)_0%,transparent_72%)] blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0070F3]/[0.025] blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.4)_100%)]" />
    </div>
  );
}

function FloatingNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-6 md:pt-6 lg:px-8">
      <nav
        className={`group/nav relative mx-auto flex h-14 max-w-5xl items-center justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#101010]/50 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-2xl ${TRANSITION} hover:border-white/[0.09] hover:shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_48px_rgba(0,112,243,0.04)] md:h-16 md:rounded-3xl md:px-6 lg:max-w-6xl`}
        aria-label="Principal"
      >
        <GlassSheen />
        <div className="relative flex w-full items-center justify-between">
          <a
            href="#"
            className={`${TRANSITION} hover:scale-[1.04] active:scale-[0.98] ${FOCUS}`}
            aria-label="Dechen Web Studio — início"
          >
            <DwsLogo />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
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
            className="inline-flex h-10 shrink-0 px-4 text-xs sm:hidden"
          >
            Orçamento
          </GlassButton>
        </div>
      </nav>
    </header>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-full bg-[#050505] font-sans text-white selection:bg-[#0070F3]/30">
      <FloatingNavbar />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[94vh] flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-36 md:px-6 md:pt-36 md:pb-44 lg:px-8 lg:pt-40 lg:pb-52">
          <HeroBackground />

          <div className="relative mx-auto w-full max-w-3xl text-center">
            <SectionLabel>Dechen Web Studio</SectionLabel>
            <h1 className="text-balance text-4xl leading-[1.1] font-semibold tracking-[-0.02em] md:text-5xl md:tracking-[-0.025em] lg:text-[64px] lg:leading-[1.04] lg:tracking-[-0.03em]">
              Seu site deveria trazer clientes,{" "}
              <span className="text-[#A1A1AA]">não apenas existir.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-[1.7] text-[#A1A1AA] md:mt-10 md:text-xl md:leading-[1.65]">
              Criamos sites rápidos, modernos e estratégicos para empresas que
              querem transmitir confiança, autoridade e crescer na internet.
            </p>
            <div className="mt-14 flex w-full flex-col items-stretch justify-center gap-4 sm:mt-16 sm:flex-row sm:items-center">
              <GlassButton href="#contato" variant="primary" className="w-full sm:w-auto">
                Solicitar orçamento
              </GlassButton>
              <GlassButton href="#projetos" variant="secondary" className="w-full sm:w-auto">
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
                <GlassCard key={service.title} className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {service.title}
                    </h3>
                    <span
                      aria-hidden
                      className={`text-[#404040] ${TRANSITION} group-hover/card:translate-x-1 group-hover/card:text-[#0070F3]`}
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
                  <div
                    className={`relative overflow-hidden rounded-3xl border border-[#262626] bg-[#101010]/75 backdrop-blur-md ${TRANSITION} hover:-translate-y-0.5 hover:border-[#404040] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]`}
                  >
                    <GlassSheen />
                    <div
                      className={`relative flex h-48 items-end bg-gradient-to-br ${project.gradient} p-6`}
                    >
                      <span className="rounded-full border border-[#262626] bg-[#101010]/70 px-3 py-1 text-xs text-[#A1A1AA] backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className="relative p-8">
                      <h3
                        className={`mb-2 text-lg font-semibold tracking-tight md:text-xl ${TRANSITION} group-hover:text-[#0070F3]`}
                      >
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
            <GlassCard className="px-8 py-16 sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0070F3]/[0.05] to-transparent"
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
                    className={`text-sm text-[#A1A1AA] ${TRANSITION} hover:text-[#0070F3] ${FOCUS}`}
                  >
                    hello@dechenwebstudio.com
                  </a>
                </div>
              </div>
            </GlassCard>
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
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
