**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

> Evolução planejada do showcase Divina Cozinha.

# Divina Cozinha — Roadmap

Pack: [00-projeto.md](00-projeto.md) · [04-assets.md](04-assets.md) · [05-prompts.md](05-prompts.md)

## Status atual

### Concluído

- Docs pack completo (7 arquivos) — **v2.0**
- Desenvolvimento v1.0 (site shipped)
- Briefing, brand guide, sitemap, copy, assets, prompts

---

## v1.0 — Concluído

Demonstração completa de restaurante contemporâneo.

### Homepage

Hero · Sobre · Cardápio (4 categorias, animação 10s) · Ambiente (6 imagens) · Reservas (formulário demonstrativo) · Localização (mapa embed) · Footer

### Funcionalidades

Cardápio animado com tabs manuais · reserva simulada com confirmação · scroll suave · navegação responsiva · WhatsApp/Instagram · Schema.org Restaurant · metadata/OG · prefers-reduced-motion · responsividade

### Stack

Next.js App Router · Tailwind CSS v4 · Cormorant Garamond + Source Sans 3 · `src/data/divina-cozinha.ts` · `src/components/divina-cozinha/` · `divina-cozinha.css` · rota `/showcase/divina-cozinha`

---

## v1.1 — UX

- Refinar microinterações no cardápio e cards
- Melhorar animação de virada de página
- Breakpoints intermediários
- Skip link, focus trap no menu mobile
- Lighthouse performance
- Lazy load galeria e cardápio

---

## v1.2 — Experiência

- Reserva simulada com feedback visual aprimorado
- Confirmação pós-clique mais elaborada
- Loader personalizado
- Botão "Reservar" → WhatsApp com mensagem pré-preenchida

---

## v2.0 — Premium

- Cardápio totalmente interativo (filtros, busca)
- Fotos em alta resolução adicionais
- Galeria lightbox full-screen
- Scroll animations (Intersection Observer)
- Vídeo curto de ambiente (não no hero)

---

## v3.0 — Projeto completo

- Reserva integrada (calendário real)
- Google Maps com rotas
- Avaliações reais
- Eventos especiais e menu degustação
- Blog gastronômico
- Multi-idioma PT/EN

---

## Melhorias futuras

| Área | Direção |
|------|---------|
| Hero | Vídeo curto em background (opcional) |
| Cardápio | Filtros, destaque prato do dia, animação virada refinada |
| Ambiente | Lightbox, mais fotos (externa, bar) |
| Reservas | Calendly/OpenTable, confirmação WhatsApp |
| Performance | Lighthouse 95+, Core Web Vitals verdes |
| SEO | Schema expandido (openingHours, menu, geo), OG image, sitemap XML |

---

## Critérios de qualidade

Antes de fechar uma versão:

- Responsividade perfeita
- Performance ≥ 90 (ideal 95+)
- SEO configurado
- Código organizado, componentes reutilizáveis
- Tema claro consistente
- Documentação atualizada
- Sem bugs conhecidos

---

## Objetivo final

Site que pareça desenvolvido para restaurante real e consolidado. Demonstração oficial da Dechen em gastronomia contemporânea.

Identidade clara e acolhedora, cardápio interativo e copy convidativa permanecem intactos em todas as evoluções.
