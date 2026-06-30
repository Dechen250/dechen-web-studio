const services = [
  {
    title: "Design Web",
    description:
      "Interfaces impecáveis criadas com clareza, sobriedade e propósito. Cada detalhe pensado.",
  },
  {
    title: "Desenvolvimento",
    description:
      "Sites ultrarrápidos com stacks modernas — Next.js, React e TypeScript no núcleo.",
  },
  {
    title: "Estratégia de Marca",
    description:
      "Identidades digitais coesas que ressoam. Do conceito ao lançamento, contamos sua história.",
  },
  {
    title: "Performance",
    description:
      "Otimizados para velocidade, acessibilidade e SEO. Seu site funciona perfeitamente em qualquer lugar.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-black font-sans text-white">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="text-sm font-semibold tracking-tight">
            Dechen Web Studio
          </a>
          <ul className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <li>
              <a href="#services" className="transition-colors hover:text-white">
                Serviços
              </a>
            </li>
            <li>
              <a href="#work" className="transition-colors hover:text-white">
                Trabalhos
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                Contato
              </a>
            </li>
          </ul>
          <a
            href="#contact"
            className="rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-medium transition-colors hover:bg-[#0077ed]"
          >
            Fale conosco
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-14 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3]/10 blur-[120px]" />
          </div>

          <p className="mb-6 text-sm font-medium tracking-widest text-[#0071e3] uppercase">
            Agência Web
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Experiências digitais,
            <br />
            <span className="text-white/40">criadas com intenção.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl">
            Criamos sites premium para marcas que não se contentam com o
            comum.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#0071e3] px-8 text-sm font-medium transition-all hover:bg-[#0077ed] hover:shadow-[0_0_40px_rgba(0,113,227,0.35)]"
            >
              Iniciar um projeto
            </a>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Conhecer serviços
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t border-white/5 px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 max-w-2xl">
              <p className="mb-3 text-sm font-medium tracking-widest text-[#0071e3] uppercase">
                O que fazemos
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Serviços feitos para
                <br />
                marcas ambiciosas.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group bg-black p-8 transition-colors hover:bg-white/[0.03] sm:p-10"
                >
                  <div className="mb-4 h-px w-8 bg-[#0071e3] transition-all group-hover:w-12" />
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          className="border-t border-white/5 px-6 py-32 text-center"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Pronto para criar algo
              <br />
              excepcional?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
              Conte-nos sobre seu projeto. Respondemos em até um dia útil com
              um caminho claro.
            </p>
            <a
              href="mailto:hello@dechenwebstudio.com"
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[#0071e3] px-10 text-sm font-medium transition-all hover:bg-[#0077ed] hover:shadow-[0_0_40px_rgba(0,113,227,0.35)]"
            >
              hello@dechenwebstudio.com
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Dechen Web Studio. Todos os
            direitos reservados.
          </p>
          <ul className="flex items-center gap-6 text-sm text-white/40">
            <li>
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
