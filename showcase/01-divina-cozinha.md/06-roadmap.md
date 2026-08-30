**Tipo:** ops · **Status:** ativo · **Versão:** 3.0

> Evolução planejada do showcase Divina Cozinha.

# Divina Cozinha — Roadmap

Pack: [00-projeto.md](00-projeto.md) · [04-assets.md](04-assets.md) · [05-prompts.md](05-prompts.md)

## Status atual

### Concluído

- Docs pack — **v3.0** (Savory Plate DS)
- Desenvolvimento v3.0 (rebuild editorial)

---

## v3.0 — Editorial (atual)

Rebuild visual a partir do design system Savory Plate: hero bento, navbar glass, marquee, carta 3:4, perfil da chef, swipe de depoimentos, wordmark no footer.

### Stack

Next.js App Router · Tailwind CSS v4 · Playfair Display + Plus Jakarta Sans + Geist Mono · `src/data/divina-cozinha.ts` · `src/components/divina-cozinha/` · `divina-cozinha.css` · rota `/showcase/divina-cozinha`

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
