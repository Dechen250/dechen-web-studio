**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

> Evolução planejada do showcase Barbearia Royal.

# Barbearia Royal — Roadmap

Pack: [00-projeto.md](00-projeto.md) · [04-assets.md](04-assets.md) · [05-prompts.md](05-prompts.md)

## Status atual

### Concluído

- Docs pack completo (7 arquivos) — **v2.0**
- Desenvolvimento v1.0 (site shipped)
- Briefing, brand guide, sitemap, copy, assets, prompts

---

## v1.0 — Concluído

Demonstração completa de barbearia premium.

### Homepage

Hero (atmosfera abstrata) · Diferenciais (4) · Serviços (6, preços demonstrativos) · Experiência (4 etapas) · Depoimentos (3 fictícios) · Galeria (4 imagens) · Final CTA (demonstrativo) · Footer

### Funcionalidades

Navbar fixa scroll-aware · menu mobile · scroll suave · preços demonstrativos · galeria hover · WhatsApp/Instagram · Schema.org HairSalon · metadata/OG · fadeInUp · prefers-reduced-motion · responsividade

### Stack

Next.js App Router · Tailwind CSS v4 · Playfair + DM Sans · `src/data/barbearia-royal.ts` · `src/components/barbearia-royal/` · `barbearia-royal.css` · rota `/showcase/barbearia-royal`

---

## v1.1 — UX

- Refinar microinterações nos cards
- Stagger opcional nas entradas
- Breakpoints intermediários
- Skip link, focus trap no menu mobile
- Lighthouse performance
- Lazy load galeria

---

## v1.2 — Experiência

- Agendamento simulado com feedback visual
- Confirmação pós-clique
- Loader personalizado
- Botão "Agendar" → WhatsApp com mensagem pré-preenchida

---

## v2.0 — Premium

- Galeria lightbox full-screen
- Fotos adicionais em alta resolução
- Scroll animations (Intersection Observer)
- Parallax sutil no hero (respeitando reduced-motion)
- Seção equipe / barbeiros
- Vídeo curto de ambiente (não no hero)

---

## v3.0 — Projeto completo

- Agendamento integrado (calendário real)
- Google Maps embed
- Avaliações reais
- Blog / grooming
- Pacotes sazonais
- Multi-idioma PT/EN

---

## Melhorias futuras

| Área | Direção |
|------|---------|
| Hero | Manter abstrato; animação sutil nos círculos; nunca foto |
| Serviços | Filtros por categoria; destaque "Dia do noivo" |
| Galeria | Lightbox, mais fotos, lazy loading |
| Agendamento | Calendly/Google Calendar, confirmação WhatsApp |
| Performance | Lighthouse 95+, Core Web Vitals verdes |
| SEO | Schema expandido (openingHours, geo), OG image, sitemap XML |

---

## Critérios de qualidade

Antes de fechar uma versão:

- Responsividade perfeita
- Performance ≥ 90 (ideal 95+)
- SEO configurado
- Código organizado, componentes reutilizáveis
- Tema escuro consistente
- Documentação atualizada
- Sem bugs conhecidos

---

## Objetivo final

Site que pareça desenvolvido para barbearia real de alto padrão. Demonstração oficial da Dechen no segmento beleza masculina premium.

Identidade escura e dourada, hero atmosférico e copy de precisão permanecem intactos em todas as evoluções.
