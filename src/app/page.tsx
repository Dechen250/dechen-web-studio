"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { portfolioDemos } from "@/data/portfolio-demos";
import {
  WHATSAPP_DISPLAY,
  buildQuoteMessage,
  whatsappUrl,
} from "@/lib/site";

/* ── Tokens (Design System) ───────────────────────────────────────── */
const EASE = "ease-out";
const DURATION = "duration-[250ms]";
const TRANSITION = `transition-all ${DURATION} ${EASE}`;
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]";
const SECTION =
  "border-t border-[#262626]/80 px-5 py-20 md:px-6 md:py-28 lg:px-8 lg:py-32";

/* ── Types ──────────────────────────────────────────────────────────── */
type SectionKey = "services" | "process";

type PrimaryServiceId = "landing-pages" | "sites-institucionais";

type ExpandedItem = {
  section: SectionKey;
  id: string;
} | null;

type ContactFormData = {
  nome: string;
  email: string;
  whatsapp: string;
  negocio: string;
  mensagem: string;
};

const initialContactForm: ContactFormData = {
  nome: "",
  email: "",
  whatsapp: "",
  negocio: "",
  mensagem: "",
};

/* ── Data ─────────────────────────────────────────────────────────── */
const benefits = [
  {
    value: "7–14 dias",
    label: "Entrega ágil",
    detail: "Do briefing ao site publicado",
  },
  {
    value: "95+",
    label: "Performance",
    detail: "Velocidade que o Google valoriza",
  },
  {
    value: "100%",
    label: "Mobile first",
    detail: "Seus clientes estão no celular",
  },
  {
    value: "SEO",
    label: "Visível no Google",
    detail: "Estrutura pronta para ranquear",
  },
];

const trustPoints = [
  "Resposta em até 24h",
  "Orçamento sem compromisso",
  "Projeto 100% sob medida",
];

const proofPoints = [
  {
    title: "Contato sem fricção",
    detail:
      "WhatsApp e formulários no lugar certo — o visitante age em um toque, no celular ou no desktop.",
  },
  {
    title: "Autoridade visual",
    detail:
      "Design alinhado ao posicionamento do negócio, para transmitir confiança antes da primeira conversa.",
  },
  {
    title: "Pronto para anunciar",
    detail:
      "Estrutura rápida e com SEO de base, preparada para campanhas no Google e no Instagram.",
  },
];

const services = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    description:
      "Página única, foco total em conversão — ideal para campanhas, lançamentos e captação de leads qualificados.",
    details:
      "Quando você investe em anúncios ou divulga uma oferta, cada clique precisa virar ação. Construímos landing pages com copy estratégica, CTA visível e carregamento instantâneo para maximizar o retorno do seu investimento em tráfego.",
    benefits: [
      "Estrutura pensada para campanhas pagas",
      "Carregamento em menos de 2 segundos",
      "Formulário e WhatsApp integrados visualmente",
      "Mensagem direta para o seu público local",
    ],
    audience: [
      "Negócios locais com campanhas no Google ou Instagram",
      "Profissionais lançando serviços ou promoções",
      "Empresas que precisam captar leads rapidamente",
    ],
  },
  {
    id: "sites-institucionais",
    title: "Sites Institucionais",
    description:
      "Presença digital completa que transmite confiança, autoridade e profissionalismo — a vitrine do seu negócio na internet.",
    details:
      "Antes de ligar ou visitar, seu cliente pesquisa no Google. Um site institucional bem construído responde às dúvidas, apresenta seus diferenciais e convence o visitante de que você é a escolha certa — 24 horas por dia.",
    benefits: [
      "Páginas estratégicas: Sobre, Serviços, Contato",
      "Identidade visual alinhada à sua marca",
      "Base sólida para aparecer no Google",
      "Experiência impecável em celular e desktop",
    ],
    audience: [
      "Clínicas, consultórios e escritórios",
      "Lojas, restaurantes e comércios locais",
      "Empresas que precisam passar credibilidade online",
    ],
  },
  {
    id: "portfolios",
    title: "Portfólios Profissionais",
    description:
      "Vitrine elegante para mostrar seu trabalho, atrair clientes certos e cobrar o que você realmente vale.",
    details:
      "Seu portfólio é o primeiro julgamento do seu talento. Criamos uma experiência visual premium que destaca seus melhores projetos, comunica seu diferencial e transforma visitantes em contratos.",
    benefits: [
      "Apresentação visual de alto impacto",
      "Destaque para cases e depoimentos",
      "Posicionamento profissional e memorável",
      "Diferenciação clara da concorrência",
    ],
    audience: [
      "Arquitetos, designers e criativos",
      "Fotógrafos, videomakers e produtores",
      "Consultores e profissionais autônomos",
    ],
  },
  {
    id: "manutencao",
    title: "Manutenção & Suporte",
    description:
      "Seu site sempre atualizado, seguro e funcionando — para você focar no negócio, não na tecnologia.",
    details:
      "Um site desatualizado ou fora do ar custa clientes. Oferecemos suporte contínuo com atualizações, correções e melhorias para que sua presença digital continue gerando resultados sem dor de cabeça.",
    benefits: [
      "Correções e atualizações com agilidade",
      "Monitoramento de performance e segurança",
      "Ajustes de conteúdo quando precisar",
      "Tranquilidade para focar no seu negócio",
    ],
    audience: [
      "Empresas com site já publicado",
      "Negócios sem equipe técnica interna",
      "Quem quer evitar surpresas e downtime",
    ],
  },
];

const primaryServiceIds: PrimaryServiceId[] = [
  "landing-pages",
  "sites-institucionais",
];

const serviceExamples: Record<
  PrimaryServiceId,
  {
    title: string;
    description: string;
    sections: { label: string; hint: string }[];
  }
> = {
  "landing-pages": {
    title: "Exemplo de Landing Page",
    description:
      "Página focada em conversão para campanhas, lançamentos, captação de leads ou venda de um serviço específico.",
    sections: [
      { label: "Hero com promessa clara", hint: "Headline direta + botão de ação" },
      { label: "Prova social", hint: "Depoimentos, logos e resultados" },
      { label: "Benefícios", hint: "Por que escolher seu serviço" },
      { label: "Chamada para ação", hint: "Formulário, WhatsApp ou agendamento" },
    ],
  },
  "sites-institucionais": {
    title: "Exemplo de Site Institucional",
    description:
      "Site completo para apresentar a empresa, transmitir autoridade e transformar visitantes em oportunidades de contato.",
    sections: [
      { label: "Página inicial", hint: "Primeira impressão e navegação clara" },
      { label: "Sobre a empresa", hint: "História, missão e equipe" },
      { label: "Serviços", hint: "O que você oferece ao mercado" },
      { label: "Portfólio ou diferenciais", hint: "Cases, prêmios e provas" },
      { label: "Contato", hint: "Formulário, mapa e canais diretos" },
    ],
  },
};

const processSteps = [
  {
    id: "planejamento",
    step: "01",
    title: "Briefing & Estratégia",
    description:
      "Entendemos seu negócio, público e objetivo comercial antes de desenhar qualquer tela.",
    details:
      "Começamos ouvindo. Mapeamos seu mercado, analisamos a concorrência e definimos o que o site precisa comunicar para gerar contatos e vendas — com metas claras e cronograma definido.",
    deliverables: [
      "Briefing estruturado do seu negócio",
      "Mapa de páginas e conteúdo",
      "Definição de público e objetivos",
      "Cronograma com prazos reais",
    ],
  },
  {
    id: "design",
    step: "02",
    title: "Design Premium",
    description:
      "Layout moderno alinhado à sua marca, pensado para converter visitantes em clientes.",
    details:
      "Transformamos estratégia em interface. Cada seção guia o visitante, transmite confiança e facilita o contato — com estética premium que posiciona seu negócio acima da concorrência.",
    deliverables: [
      "Wireframes da estrutura",
      "Layout visual final aprovado",
      "Protótipo navegável",
      "Identidade visual aplicada ao site",
    ],
  },
  {
    id: "desenvolvimento",
    step: "03",
    title: "Desenvolvimento",
    description:
      "Código limpo, performance alta e compatibilidade total — do celular ao desktop.",
    details:
      "Construímos com tecnologias modernas, priorizando velocidade, acessibilidade e responsividade. Seu site carrega rápido, funciona em qualquer dispositivo e está pronto para crescer.",
    deliverables: [
      "Código responsivo e otimizado",
      "Performance Lighthouse 95+",
      "Testes em múltiplos dispositivos",
      "Integrações visuais (WhatsApp, mapas, etc.)",
    ],
  },
  {
    id: "publicacao",
    step: "04",
    title: "Publicação & Entrega",
    description:
      "Site no ar, domínio configurado e pronto para atrair clientes desde o primeiro dia.",
    details:
      "Publicamos com checklist completo de qualidade, configuramos domínio e SSL, e entregamos orientações para você aproveitar ao máximo sua nova presença digital.",
    deliverables: [
      "Deploy em produção",
      "Domínio e SSL configurados",
      "Checklist final de qualidade",
      "Orientação de uso e próximos passos",
    ],
  },
];

const navLinks = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

const agency = {
  name: "Dechen Web Studio",
  domain: "dechenwebstudio.com.br",
  email: "contato@dechenwebstudio.com.br",
  social: {
    instagram: "#",
    github: "#",
    whatsapp: whatsappUrl(),
  },
};

const businessTypes = [
  "Clínica / Consultório",
  "Loja / Comércio local",
  "Restaurante / Alimentação",
  "Consultoria / Serviços",
  "Profissional autônomo",
  "Outro",
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#0070F3] uppercase sm:mb-4 sm:text-sm sm:tracking-[0.15em]">
      {children}
    </p>
  );
}

function SectionHeader({
  label,
  title,
  titleMuted,
  description,
  className = "",
}: {
  label: string;
  title: string;
  titleMuted?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
        {titleMuted && (
          <>
            <br />
            <span className="text-[#A1A1AA]">{titleMuted}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-[#B4B4BE] md:mt-6 md:text-lg md:leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold tracking-[0.12em] text-[#0070F3] uppercase">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-[#A1A1AA]"
          >
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0070F3]/70"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpandableContent({
  isExpanded,
  children,
}: {
  isExpanded: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${isExpanded ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
    >
      <div className="overflow-hidden">
        <div
          className={`border-t border-[#262626] pt-6 transition-transform duration-300 ease-out ${isExpanded ? "translate-y-0" : "-translate-y-1"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function InteractiveCard({
  isExpanded,
  onClick,
  ariaLabel,
  children,
  expandedContent,
  className = "",
}: {
  isExpanded: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
  expandedContent: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-label={ariaLabel}
      className={`group/card relative w-full cursor-pointer overflow-hidden rounded-3xl border bg-[#101010]/75 text-left backdrop-blur-md ${TRANSITION} hover:-translate-y-0.5 hover:border-[#404040] hover:bg-[#101010]/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070F3] active:scale-[0.99] ${isExpanded ? "border-[#0070F3]/40 shadow-[0_0_32px_rgba(0,112,243,0.12)]" : "border-[#262626]"} ${className}`}
    >
      <GlassSheen />
      <div className="relative">
        {children}
        <ExpandableContent isExpanded={isExpanded}>
          {expandedContent}
        </ExpandableContent>
      </div>
    </button>
  );
}

function ServiceExampleCard({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: { label: string; hint: string }[];
}) {
  return (
    <div
      aria-label={title}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#0070F3]/20 bg-[#101010]/75 backdrop-blur-md ${TRANSITION}`}
    >
      <GlassSheen />
      <div className="relative flex h-full flex-col p-6 sm:p-8">
        <span className="mb-4 inline-flex w-fit rounded-full border border-[#0070F3]/25 bg-[#0070F3]/10 px-3 py-1 text-[10px] font-medium tracking-widest text-[#0070F3] uppercase">
          Exemplo conceitual
        </span>
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
          {description}
        </p>

        <div className="mt-6 flex flex-1 flex-col rounded-2xl border border-[#262626] bg-[#050505]/80 p-4">
          <div className="mb-4 flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#262626]" />
            <span className="h-2 w-2 rounded-full bg-[#262626]" />
            <span className="h-2 w-2 rounded-full bg-[#262626]" />
            <span className="ml-2 h-2 flex-1 rounded-full bg-[#262626]/60" />
          </div>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={section.label}
                className={`rounded-lg border p-3 ${TRANSITION} ${
                  index === 0
                    ? "border-[#0070F3]/25 bg-[#0070F3]/[0.06]"
                    : "border-[#262626]/80 bg-[#101010]/60"
                }`}
              >
                <p className="text-xs font-medium text-white">{section.label}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#404040]">
                  {section.hint}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryServiceSlot({
  service,
  activeService,
  onToggle,
}: {
  service: (typeof services)[number];
  activeService: PrimaryServiceId | null;
  onToggle: (id: PrimaryServiceId) => void;
}) {
  const serviceId = service.id as PrimaryServiceId;
  const isOpen = activeService === serviceId;
  const showExample = activeService !== null && !isOpen;

  if (showExample && activeService) {
    const example = serviceExamples[activeService];
    return <ServiceExampleCard {...example} />;
  }

  return (
    <InteractiveCard
      isExpanded={isOpen}
      onClick={() => onToggle(serviceId)}
      ariaLabel={`${isOpen ? "Fechar" : "Abrir"} detalhes: ${service.title}`}
      className="h-full p-6 sm:p-8"
      expandedContent={
        <>
          <p className="mb-6 text-sm leading-relaxed text-[#A1A1AA] md:text-base">
            {service.details}
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <DetailList title="O que você ganha" items={service.benefits} />
            <DetailList title="Ideal para" items={service.audience} />
          </div>
        </>
      }
    >
      <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
          {service.title}
        </h3>
        <span
          aria-hidden
          className={`mt-1 shrink-0 text-[#404040] ${TRANSITION} ${isOpen ? "rotate-90 text-[#0070F3]" : "group-hover/card:translate-x-1 group-hover/card:text-[#0070F3]"}`}
        >
          →
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[#A1A1AA] md:text-base">
        {service.description}
      </p>
      <p
        className={`mt-4 text-xs ${TRANSITION} ${isOpen ? "text-[#0070F3]" : "text-[#404040] group-hover/card:text-[#0070F3]/70"}`}
      >
        {isOpen ? "Clique para fechar" : "Ver detalhes do serviço"}
      </p>
    </InteractiveCard>
  );
}

function DwsLogo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const sizeClasses =
    size === "sm"
      ? "h-8 w-8 rounded-[10px] text-[10px]"
      : "h-8 w-8 rounded-[10px] text-[10px] sm:h-10 sm:w-10 sm:rounded-[12px] sm:text-xs";

  return (
    <span
      className={`relative flex items-center justify-center border border-[#0070F3]/25 bg-[#101010]/60 font-bold tracking-tight shadow-[0_0_16px_rgba(0,112,243,0.1)] backdrop-blur-md ${TRANSITION} ${sizeClasses} ${className}`}
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

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      className={`group/link relative text-sm ${TRANSITION} ${FOCUS} ${
        active ? "text-white" : "text-[#B4B4BE] hover:text-white"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute -bottom-1 left-0 h-px bg-[#0070F3]/70 ${TRANSITION} ${
          active ? "w-full" : "w-0 group-hover/link:w-full"
        }`}
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
  // Size utilities (h/px/text) stay out of `base` so callers can override
  // without fighting Tailwind's stylesheet order.
  const base = `group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold ${TRANSITION} ${FOCUS} active:scale-[0.985] active:translate-y-0`;

  const styles =
    variant === "primary"
      ? "border border-[#0070F3]/35 bg-gradient-to-b from-[#0070F3]/40 via-[#0070F3]/22 to-[#0070F3]/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-lg hover:-translate-y-0.5 hover:scale-[1.015] hover:border-[#0070F3]/50 hover:shadow-[0_4px_24px_rgba(0,112,243,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]"
      : "border border-white/[0.08] bg-[#101010]/40 text-[#A1A1AA] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-lg hover:-translate-y-0.5 hover:scale-[1.015] hover:border-white/15 hover:bg-[#101010]/65 hover:text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]";

  return (
    <a
      href={href}
      className={`${base} ${styles} h-14 px-8 text-sm ${className}`}
    >
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

function GlassSubmitButton({
  children,
  loading = false,
  className = "",
}: {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`group/btn relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-[#0070F3]/35 bg-gradient-to-b from-[#0070F3]/40 via-[#0070F3]/22 to-[#0070F3]/8 px-8 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-lg ${TRANSITION} hover:-translate-y-0.5 hover:border-[#0070F3]/50 hover:shadow-[0_4px_24px_rgba(0,112,243,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/15 to-transparent"
      />
      <span className="relative">
        {loading ? "Abrindo WhatsApp..." : children}
      </span>
    </button>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-[#C4C4CC]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#262626] bg-[#101010]/60 px-4 py-3 text-sm text-white placeholder:text-[#6B6B76] backdrop-blur-sm transition-colors focus:border-[#0070F3]/50 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/35";

function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialContactForm);
  const [status, setStatus] = useState<"idle" | "loading" | "opened">("idle");

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status === "opened") setStatus("idle");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const text = buildQuoteMessage({
      name: form.nome,
      email: form.email,
      whatsapp: form.whatsapp,
      business: form.negocio,
      message: form.mensagem,
    });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    window.setTimeout(() => setStatus("opened"), 350);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Seu nome" htmlFor="contact-nome">
          <input
            id="contact-nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={inputClass}
          />
        </FormField>
        <FormField label="E-mail" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="WhatsApp" htmlFor="contact-whatsapp">
          <input
            id="contact-whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className={inputClass}
          />
        </FormField>
        <FormField label="Tipo de negócio" htmlFor="contact-negocio">
          <select
            id="contact-negocio"
            name="negocio"
            required
            value={form.negocio}
            onChange={(e) => update("negocio", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled className="bg-[#101010]">
              Selecione...
            </option>
            {businessTypes.map((type) => (
              <option key={type} value={type} className="bg-[#101010]">
                {type}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Conte sobre seu projeto" htmlFor="contact-mensagem">
        <textarea
          id="contact-mensagem"
          name="mensagem"
          required
          rows={4}
          placeholder="O que você precisa? Qual o objetivo do site?"
          value={form.mensagem}
          onChange={(e) => update("mensagem", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </FormField>
      <GlassSubmitButton loading={status === "loading"}>
        Enviar no WhatsApp
      </GlassSubmitButton>
      <p
        className="text-center text-xs text-[#8A8A96]"
        role="status"
        aria-live="polite"
      >
        {status === "opened"
          ? "WhatsApp aberto com sua mensagem pronta. Se a janela foi bloqueada, permita pop-ups e envie de novo."
          : "Ao enviar, abrimos o WhatsApp com sua mensagem pronta — sem cadastro e sem compromisso."}
      </p>
    </form>
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

function TrustLine() {
  return (
    <ul className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
      {trustPoints.map((point) => (
        <li
          key={point}
          className="flex items-center gap-2 text-xs text-[#B4B4BE] sm:text-sm"
        >
          <span
            aria-hidden
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0070F3]/15 text-[10px] text-[#0070F3]"
          >
            ✓
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}

function FloatingNavbar() {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestRatio > 0.12) {
          setActiveHref(`#${bestId}`);
        }
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.12, 0.25, 0.4, 0.6],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5 md:px-6 md:pt-6 lg:px-8">
      <nav
        className={`group/nav relative mx-auto flex h-12 max-w-5xl items-center justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#101010]/50 px-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-2xl ${TRANSITION} hover:border-white/[0.09] hover:shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_48px_rgba(0,112,243,0.04)] sm:h-14 sm:px-4 md:h-16 md:rounded-3xl md:px-6 lg:max-w-6xl`}
        aria-label="Principal"
      >
        <GlassSheen />
        <div className="relative flex w-full min-w-0 items-center justify-between gap-2 sm:gap-3">
          <a
            href="#"
            className={`shrink-0 ${TRANSITION} hover:scale-[1.04] active:scale-[0.98] ${FOCUS}`}
            aria-label="Dechen Web Studio — início"
          >
            <DwsLogo />
          </a>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} active={activeHref === link.href}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* One CTA — responsive label. Avoid dual buttons: Tailwind
              `hidden` loses to GlassButton's base `inline-flex`. */}
          <GlassButton
            href="#contato"
            variant="primary"
            className="!h-9 !shrink-0 !px-3.5 !text-xs sm:!h-10 sm:!px-5 md:!h-12 md:!px-7 md:!text-sm"
          >
            <span className="sm:hidden">Orçamento</span>
            <span className="hidden sm:inline">Orçamento gratuito</span>
          </GlassButton>
        </div>
      </nav>
    </header>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
  const [expanded, setExpanded] = useState<ExpandedItem>(null);
  const [activeService, setActiveService] = useState<PrimaryServiceId | null>(
    null,
  );

  const toggleItem = (section: SectionKey, id: string) => {
    setExpanded((prev) =>
      prev?.section === section && prev?.id === id
        ? null
        : { section, id },
    );
  };

  const isExpanded = (section: SectionKey, id: string) =>
    expanded?.section === section && expanded?.id === id;

  const togglePrimaryService = (id: PrimaryServiceId) => {
    setActiveService((prev) => (prev === id ? null : id));
  };

  const primaryServices = services.filter((s) =>
    primaryServiceIds.includes(s.id as PrimaryServiceId),
  );
  const secondaryServices = services.filter(
    (s) => !primaryServiceIds.includes(s.id as PrimaryServiceId),
  );

  return (
    <div className="min-h-full bg-[#050505] font-sans text-white selection:bg-[#0070F3]/30">
      <FloatingNavbar />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-24 sm:px-6 sm:pt-32 sm:pb-28 md:pt-36 md:pb-36 lg:px-8 lg:pt-40 lg:pb-44">
          <HeroBackground />

          <div className="relative mx-auto w-full max-w-4xl text-center">
            <Reveal immediate>
              <SectionLabel>Para negócios locais e empreendedores</SectionLabel>
            </Reveal>
            <Reveal immediate delayMs={120}>
              <h1 className="text-balance text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] sm:text-4xl md:text-5xl md:tracking-[-0.025em] lg:text-[3.5rem] lg:leading-[1.06] lg:tracking-[-0.03em]">
                Transforme visitantes em clientes com um site que transmite{" "}
                <span className="text-[#0070F3]">autoridade e confiança</span>
              </h1>
            </Reveal>
            <Reveal immediate delayMs={240}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-[1.7] text-[#A1A1AA] sm:mt-8 sm:text-lg md:mt-10 md:text-xl md:leading-[1.65]">
                Desenvolvemos sites premium para clínicas, lojas, consultorias e
                empresas locais que precisam vender mais pela internet — com
                design profissional, carregamento rápido e estrutura pensada para
                gerar contatos.
              </p>
            </Reveal>
            <Reveal immediate delayMs={360}>
              <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
                <GlassButton
                  href="#contato"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  Quero meu orçamento gratuito
                </GlassButton>
                <GlassButton
                  href="#projetos"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Ver projetos demonstrativos
                </GlassButton>
              </div>
            </Reveal>
            <Reveal immediate delayMs={480}>
              <TrustLine />
            </Reveal>
          </div>
        </section>

        {/* Benefícios */}
        <section
          id="beneficios"
          aria-label="Benefícios"
          className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:pb-24"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <Reveal key={item.label} delayMs={index * 60} className="h-full">
                <GlassCard className="h-full p-5 sm:p-6">
                  <p className="text-xl font-semibold tracking-tight text-[#0070F3] sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#A1A1AA] sm:text-sm">
                    {item.detail}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className={SECTION}>
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                className="mb-12 md:mb-16"
                label="Serviços"
                title="Tudo que seu negócio precisa"
                titleMuted="para crescer online."
                description="Cada solução é pensada para transmitir confiança, facilitar o contato do cliente e fortalecer sua presença digital — do primeiro clique à conversão."
              />
            </Reveal>
            <div className="grid items-stretch gap-4 sm:grid-cols-2">
              {primaryServices.map((service, index) => (
                <Reveal key={service.id} delayMs={index * 70} className="h-full">
                  <PrimaryServiceSlot
                    service={service}
                    activeService={activeService}
                    onToggle={togglePrimaryService}
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {secondaryServices.map((service, index) => {
                const open = isExpanded("services", service.id);
                return (
                  <Reveal key={service.id} delayMs={index * 70} className="h-full">
                    <InteractiveCard
                      isExpanded={open}
                      onClick={() => toggleItem("services", service.id)}
                      ariaLabel={`${open ? "Fechar" : "Abrir"} detalhes: ${service.title}`}
                      className="h-full p-6 sm:p-8"
                      expandedContent={
                        <>
                          <p className="mb-6 text-sm leading-relaxed text-[#A1A1AA] md:text-base">
                            {service.details}
                          </p>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <DetailList
                              title="O que você ganha"
                              items={service.benefits}
                            />
                            <DetailList
                              title="Ideal para"
                              items={service.audience}
                            />
                          </div>
                        </>
                      }
                    >
                      <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
                        <h3 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                          {service.title}
                        </h3>
                        <span
                          aria-hidden
                          className={`mt-1 shrink-0 text-[#404040] ${TRANSITION} ${open ? "rotate-90 text-[#0070F3]" : "group-hover/card:translate-x-1 group-hover/card:text-[#0070F3]"}`}
                        >
                          →
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#A1A1AA] md:text-base">
                        {service.description}
                      </p>
                      <p
                        className={`mt-4 text-xs ${TRANSITION} ${open ? "text-[#0070F3]" : "text-[#404040] group-hover/card:text-[#0070F3]/70"}`}
                      >
                        {open ? "Clique para fechar" : "Ver detalhes do serviço"}
                      </p>
                    </InteractiveCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section id="processo" className={SECTION}>
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                className="mb-12 md:mb-16"
                label="Processo"
                title="Do primeiro contato"
                titleMuted="ao site no ar."
                description="Um processo claro e transparente — sem surpresas, sem jargão técnico. Você acompanha cada etapa e aprova antes de avançar."
              />
            </Reveal>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => {
                const open = isExpanded("process", step.id);
                return (
                  <li key={step.id} className="h-full">
                    <Reveal delayMs={index * 60} className="h-full">
                      <InteractiveCard
                        isExpanded={open}
                        onClick={() => toggleItem("process", step.id)}
                        ariaLabel={`${open ? "Fechar" : "Abrir"} etapa: ${step.title}`}
                        className="flex h-full flex-col p-6 sm:p-8"
                        expandedContent={
                          <>
                            <p className="mb-6 text-sm leading-relaxed text-[#A1A1AA]">
                              {step.details}
                            </p>
                            <DetailList
                              title="Entregáveis"
                              items={step.deliverables}
                            />
                          </>
                        }
                      >
                        <span className="mb-4 text-sm font-medium tracking-widest text-[#0070F3] sm:mb-6">
                          {step.step}
                        </span>
                        <h3 className="mb-2 text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#A1A1AA]">
                          {step.description}
                        </p>
                        <p
                          className={`mt-auto pt-4 text-xs ${TRANSITION} ${open ? "text-[#0070F3]" : "text-[#404040] group-hover/card:text-[#0070F3]/70"}`}
                        >
                          {open
                            ? "Clique para fechar"
                            : "Ver entregáveis da etapa"}
                        </p>
                      </InteractiveCard>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Prova / confiança */}
        <section id="confianca" aria-label="Por que funciona" className={SECTION}>
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                className="mb-12 md:mb-16"
                label="Confiança"
                title="Feito para gerar"
                titleMuted="contato de verdade."
                description="Cada site é pensado para o momento em que o cliente decide — com clareza, autoridade e um caminho óbvio para falar com você."
              />
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {proofPoints.map((item, index) => (
                <Reveal key={item.title} delayMs={index * 70} className="h-full">
                  <div className="relative h-full overflow-hidden rounded-3xl border border-[#262626] bg-[#101010]/50 px-6 py-7 backdrop-blur-md sm:px-7 sm:py-8">
                    <GlassSheen />
                    <span
                      aria-hidden
                      className="mb-5 block font-mono text-xs tracking-[0.18em] text-[#0070F3]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#B4B4BE] md:text-base">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delayMs={120}>
              <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#8A8A96] md:text-base">
                Demonstrações em gastronomia, beleza masculina, saúde e
                consultoria — veja o padrão completo nos projetos abaixo.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Portfólio */}
        <section id="projetos" className={SECTION}>
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                className="mb-12 md:mb-16"
                label="Portfólio"
                title="Veja o padrão"
                titleMuted="que entregamos."
                description="Projetos demonstrativos que mostram nossa capacidade de criar experiências premium para diferentes segmentos — do restaurante à consultoria."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {portfolioDemos.map((demo, index) => (
                <Reveal key={demo.slug} delayMs={index * 70} className="h-full">
                <Link
                  href={demo.href ?? `/portfolio/${demo.slug}`}
                  className={`group/card relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#262626] bg-[#101010]/75 backdrop-blur-md ${TRANSITION} hover:-translate-y-0.5 hover:border-[#404040] hover:bg-[#101010]/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070F3]`}
                >
                  <GlassSheen />
                  <div
                    className={`relative flex h-40 items-start justify-between overflow-hidden bg-gradient-to-br p-5 sm:h-52 sm:p-6 ${demo.gradient}`}
                  >
                    {demo.cover ? (
                      <Image
                        src={demo.cover}
                        alt={`Capa do showcase ${demo.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className={`object-cover object-top ${TRANSITION} group-hover/card:scale-[1.03]`}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/55 via-transparent to-[#101010]/25" />
                    <span className="relative z-10 rounded-full border border-white/10 bg-[#101010]/70 px-3 py-1 text-[10px] font-medium tracking-widest text-[#A1A1AA] uppercase backdrop-blur-sm">
                      Demonstração
                    </span>
                    <span className="relative z-10 rounded-full border border-[#262626] bg-[#101010]/70 px-3 py-1 text-xs text-[#A1A1AA] backdrop-blur-sm">
                      {demo.category}
                    </span>
                  </div>
                  <div className="relative p-6 sm:p-8">
                    <h3
                      className={`mb-2 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl ${TRANSITION} group-hover/card:text-[#0070F3]`}
                    >
                      {demo.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-[#A1A1AA] sm:mb-6 md:text-base">
                      {demo.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-medium text-[#0070F3] ${TRANSITION} group-hover/card:gap-3`}
                    >
                      Ver demonstração
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className={SECTION}>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <Reveal>
                <div>
                  <SectionHeader
                    label="Contato"
                    title="Pronto para ter um site"
                    titleMuted="que gera clientes?"
                    description="Preencha o formulário ou chame direto no WhatsApp. Resposta rápida, sem compromisso."
                  />
                  <ul className="mt-8 space-y-4">
                    {[
                      "Atendimento direto, sem intermediários",
                      "Proposta clara com prazo e investimento",
                      "Projeto pensado para o seu mercado local",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-[#B4B4BE] sm:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0070F3]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white ${TRANSITION} hover:brightness-110 ${FOCUS}`}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44Zm-8.46 18.3h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.43-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.43 9.87-9.9 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                    </svg>
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${agency.email}`}
                    className={`mt-5 inline-block text-sm text-[#A1A1AA] ${TRANSITION} hover:text-[#0070F3] ${FOCUS}`}
                  >
                    Ou envie um e-mail:{" "}
                    <span className="text-[#0070F3]">{agency.email}</span>
                  </a>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="relative rounded-3xl border border-[#262626] bg-[#101010]/40 p-6 backdrop-blur-md sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-[#0070F3]/[0.05] to-transparent"
                  />
                  <div className="relative">
                    <h3 className="mb-1 text-lg font-semibold tracking-tight">
                      Solicite seu orçamento
                    </h3>
                    <p className="mb-6 text-sm text-[#A1A1AA]">
                      Preencha o formulário e envie direto no WhatsApp.
                    </p>
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626]/80 px-5 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <div className="flex items-center gap-3">
                <DwsLogo size="sm" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {agency.name}
                  </p>
                  <a
                    href={`https://${agency.domain}`}
                    className={`text-sm text-[#A1A1AA] ${TRANSITION} hover:text-[#0070F3] ${FOCUS}`}
                  >
                    {agency.domain}
                  </a>
                </div>
              </div>
              <p className="text-center text-xs text-[#404040] sm:text-left">
                Sites premium para negócios que querem crescer online.
                <br />
                &copy; {new Date().getFullYear()} {agency.name}. Todos os
                direitos reservados.
              </p>
            </div>

            <nav aria-label="Rodapé">
              <ul className="flex flex-wrap items-center justify-center gap-5 text-sm sm:gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  href={agency.social.instagram}
                  className={`text-[#A1A1AA] ${TRANSITION} hover:text-white ${FOCUS}`}
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={agency.social.github}
                  className={`text-[#A1A1AA] ${TRANSITION} hover:text-white ${FOCUS}`}
                  aria-label="GitHub"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={agency.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[#A1A1AA] ${TRANSITION} hover:text-white ${FOCUS}`}
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}
