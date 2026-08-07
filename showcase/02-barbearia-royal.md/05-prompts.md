**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

> Prompts de desenvolvimento — leitura obrigatória da documentação do pack antes de gerar código.

# Barbearia Royal — Prompts

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md) · [06-roadmap.md](06-roadmap.md)

## Pré-requisito

Antes de gerar código, ler todos os arquivos acima. Nenhuma decisão deve contrariar a documentação.

---

## Prompt 01 — Desenvolvimento inicial

Você é Lead Product Designer e Front-end Engineer da Dechen Web Studio.

Desenvolva o projeto Barbearia Royal seguindo rigorosamente a documentação desta pasta.

**Objetivo:** site premium que pareça entregue a cliente real.

**Diretrizes:**

- Tema escuro `#0C0A09` + dourado `#C4A35A` — nunca claro
- Hero atmosférico abstrato (grain + geométricos dourados) — sem foto hero
- Tipografia: Playfair Display + DM Sans
- Seções: Hero → Diferenciais → Serviços → Experiência → Depoimentos → Galeria → FinalCTA → Footer
- Nav: Diferenciais, Serviços, Experiência, Depoimentos, Ambiente
- CTA: Agendar horário
- Dados: `src/data/barbearia-royal.ts`
- Componentes: `src/components/barbearia-royal/`
- CSS scoped: `barbearia-royal.css` com tokens `--br-*`

**Prioridades:** UX, performance, sofisticação masculina, responsividade, código limpo.

---

## Prompt 02 — Melhorias

Melhore o projeto existente. Não refaça o site.

Mantenha identidade escura e dourada. Melhore UX, performance, microinterações, responsividade, organização e acessibilidade.

Nunca introduza tema claro ou foto hero.

---

## Prompt 03 — Componentes

Componentes esperados:

- Navbar (fixa, scroll-aware, menu mobile)
- Hero (atmosfera abstrata)
- Differentials (grid 4 cards)
- Services (grid 6 cards, preços demonstrativos)
- Experience (timeline 4 etapas)
- Testimonials (3 blockquotes fictícios)
- Gallery (4 imagens com overlay)
- FinalCTA (agendamento demonstrativo)
- Footer (contato + créditos Dechen)
- UI: Button, SectionHeading, FadeIn

Tokens CSS `--br-*`. Sem bibliotecas desnecessárias.

---

## Prompt 04 — Animações

Microinterações elegantes, nunca exageradas:

- fadeInUp no scroll
- Hover suave em cards
- Scale 1.05 em imagens da galeria
- Transições 300–700ms
- Navbar com transição no scroll

Respeitar `prefers-reduced-motion`. Sem bounce ou parallax pesado.

---

## Prompt 05 — Responsividade

Excelente experiência em desktop (max-w-6xl), notebook, tablet e smartphone.

Pontos críticos: menu hamburger, grids 3→2→1 e 4→2→1, galeria full-width + 2 colunas, hero legível (text-4xl → text-6xl).

---

## Prompt 06 — Performance e SEO

Implementar:

- Metadata (title, description, Open Graph)
- Schema.org HairSalon (JSON-LD)
- Imagens otimizadas (WebP)
- `prefers-reduced-motion`
- aria-labels em links externos
- Focus visible nos botões

Eliminar duplicação. Melhorar organização.

---

## Prompt 07 — Documentação v2.0

Reescrever os 7 arquivos do docs pack no padrão editorial v2.0:

- Extrair copy, estrutura e tokens do código implementado
- Marcar preços, depoimentos e agendamento como demonstrativos
- Cross-links entre arquivos do pack
- Profundidade equivalente entre showcases do portfólio

---

## Regras gerais

- Seguir documentação sempre
- Nunca tema claro
- Nunca foto hero
- UX > efeitos visuais
- Case real da Dechen no segmento beleza masculina premium
