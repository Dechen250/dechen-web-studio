# Roadmap — [Nome do Projeto]

**Tipo:** template · **Status:** ativo · **Versão:** 2.0

Evolução planejada do showcase. Brief: [00-projeto.md](00-projeto.md). Prompts: [05-prompts.md](05-prompts.md).

## Objetivo

Guiar entregas do showcase fictício em versões incrementais. Cada fase mantém identidade e avança em direção ao DoD: **parece cliente real**.

## Status da documentação

- [ ] [00-projeto.md](00-projeto.md) — brief preenchido
- [ ] [01-brand-guide.md](01-brand-guide.md) — identidade definida
- [ ] [02-sitemap.md](02-sitemap.md) — estrutura fechada
- [ ] [03-copy.md](03-copy.md) — copy completa
- [ ] [04-assets.md](04-assets.md) — assets listados
- [ ] [05-prompts.md](05-prompts.md) — prompts revisados
- [ ] [06-roadmap.md](06-roadmap.md) — roadmap atualizado

## v1.0 — MVP do showcase

**Meta:** homepage funcional que já **parece cliente real**.

### Escopo

| Seção | Entrega |
|-------|---------|
| Hero | Full-bleed, marca, headline, CTA |
| Sobre | Texto de [03-copy.md](03-copy.md) |
| [Seção destaque] | Grid ou lista com categorias |
| [Seção visual] | Galeria estática |
| [Seção conversão] | Form simulado ou WhatsApp |
| Localização | Endereço + mapa placeholder |
| Footer | Contato + **Projeto demonstrativo** |

### Funcionalidades

- Navbar fixa + scroll suave
- Responsivo mobile first
- Copy de [03-copy.md](03-copy.md) integrada
- Flags demonstrativas onde houver ficção

### Critérios de saída

- [ ] Hero sem cards
- [ ] Uma função por seção
- [ ] Lighthouse ≥ 90 (baseline)

---

## v1.1 — Refino de UX

**Meta:** polir interação sem mudar estrutura.

- Microinterações (hover, fade in scroll)
- Menu mobile revisado
- Focus visível e navegação por teclado
- Ajustes de spacing e tipografia
- Lighthouse ≥ 95

Prompt: [05-prompts.md](05-prompts.md) — Prompt 02 e 04.

---

## v1.2 — Conversão simulada

**Meta:** fluxo de lead completo (simulado).

- Form com estados: enviando, sucesso, erro
- Confirmação visual pós-envio
- Pré-mensagem WhatsApp (se CTA for WhatsApp)
- Microcopy de [03-copy.md](03-copy.md) integrada

Prompt: [05-prompts.md](05-prompts.md) — Prompt 03 (componente de form).

---

## v2.0 — Experiência completa

**Meta:** showcase referência da agência para o segmento **[Segmento]**.

- [Seção destaque] interativa ([tabs / carrossel — definir em 02-sitemap.md](02-sitemap.md))
- Galeria com lightbox ou transição
- Imagens em alta resolução + lazy load
- OG image e SEO completos
- Depoimentos demonstrativos (se no escopo)
- Animações refinadas — sem exagero

### Critérios de saída

- [ ] **Parece cliente real** — visitante não percebe ficção de imediato
- [ ] Demonstrativos rotulados onde necessário
- [ ] Lighthouse Performance / SEO / Best Practices ≥ 95
- [ ] Código organizado e componentizado

Prompt: [05-prompts.md](05-prompts.md) — Prompts 04, 05, 06.

---

## v3.0 — Extensões (opcional)

Só avançar se fizer sentido para o segmento:

- [ ] Página interna ([ex.: serviço individual, case])
- [ ] Blog ou FAQ
- [ ] Integração real de form (Formspree, Resend, CRM)
- [ ] Google Maps embed real (com endereço fictício claro)
- [ ] Schema.org (LocalBusiness ou equivalente)

Manter nota demonstrativa em footer e conteúdo fictício.

---

## Melhorias futuras (backlog)

| Área | Ideia |
|------|-------|
| Hero | [ex.: vídeo curto em loop, parallax leve] |
| [Seção destaque] | [ex.: filtros, comparação de planos] |
| [Seção visual] | [ex.: galeria fullscreen] |
| Performance | Code split por rota; imagens AVIF |
| SEO | Blog com artigos do segmento (fictícios, rotulados) |

## Critérios de qualidade (todas as versões)

- Hero full-bleed; marca primeiro; sem cards no hero
- Uma função por seção
- Conteúdo demonstrativo rotulado
- Responsivo sem regressões
- Copy fiel a [03-copy.md](03-copy.md)
- **Parece cliente real**

## Objetivo final

Showcase [Nome do Projeto] como case oficial da Dechen Web Studio: brief completo, execução alinhada, resultado que convence visitantes de que entregamos sites reais — porque este **parece** um.
