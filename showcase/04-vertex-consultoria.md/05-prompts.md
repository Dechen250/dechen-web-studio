# Prompts — Vertex Consultoria

**Tipo:** showcase · **Status:** ativo · **Versão:** 2.0

Prompts para desenvolvimento do showcase. Antes de gerar código, ler toda a pasta:

- [00-projeto.md](00-projeto.md)
- [01-brand-guide.md](01-brand-guide.md)
- [02-sitemap.md](02-sitemap.md)
- [03-copy.md](03-copy.md)
- [04-assets.md](04-assets.md)
- [06-roadmap.md](06-roadmap.md)

Nenhuma decisão de UI ou copy deve contradizer esses documentos.

## Regras gerais (todas as fases)

1. **Hero tipográfico full-bleed** — grade geométrica; sem foto de stock central
2. **Marca primeiro** — VERTEX. (ponto ciano) legível no hero e navbar
3. **Uma função por seção**
4. **Métricas rotuladas como demonstrativas** — 38%, 2.4x, 90 dias
5. **Botões rounded-none** — nunca arredondados
6. Copy exata de [03-copy.md](03-copy.md) — não reescrever
7. Nunca copiar visual de outros showcases (gold, teal, roxo)
8. Lighthouse Performance / SEO / Best Practices ≥ 95

---

## Prompt 01 — Desenvolvimento inicial

```
Você é o desenvolvedor front-end da Dechen Web Studio.

Desenvolva o showcase Vertex Consultoria (consultoria B2B fictícia)
seguindo rigorosamente os arquivos desta pasta.

Leia antes de codar:
- 00-projeto.md, 01-brand-guide.md, 02-sitemap.md, 03-copy.md, 04-assets.md

Regras de layout:
- Hero tipográfico full-bleed; grade geométrica; sem stock no centro
- Tema escuro: cold slate #0B1118 + ciano #22D3EE
- Syne (display) + Manrope (corpo); marca VERTEX.
- Botões rounded-none
- Seções: Hero → Método → Serviços → Resultados → Sobre → Contato → Footer
- Formulário Nome, Empresa, Telefone, Desafio → WhatsApp
- Métricas rotuladas como demonstrativas

Stack: Next.js (App Router), React, TypeScript, Tailwind CSS.

DoD: parece cliente real; ficção rotulada no footer.
```

---

## Prompt 02 — Melhorias incrementais

```
Melhore o showcase Vertex Consultoria existente.

NÃO refaça o site do zero. Mantenha identidade visual e sitemap.

Melhorar apenas:
- UX e fluxo de conversão
- Microinterações (hover, fade-in up, grid pulse — sem exagero)
- Responsividade e acessibilidade (focus, contraste, teclado)
- Performance e organização do código

Preserve hero tipográfico e paleta dark/ciano.

DoD: parece cliente real.
```

---

## Prompt 03 — Componentes

```
Extraia componentes reutilizáveis do showcase Vertex Consultoria.

Seguir tokens de 01-brand-guide.md e anatomia de 04-assets.md.

Componentes esperados:
- Navbar (fixa, scroll blur, menu mobile, VERTEX.)
- Hero (grade geométrica, headline, CTAs)
- Method (grid 4 etapas)
- Services (grid 2×2)
- Results (métricas demonstrativas + galeria)
- About (pontos com borda ciano)
- Contact (form → WhatsApp)
- Footer (nota demonstrativa)
- UI (Button, SectionHeading, FadeIn)

Botões: rounded-none. Métricas: flag demonstrativa.
Não instalar bibliotecas sem necessidade.
```

---

## Prompt 04 — Animações

```
Adicione motion ao showcase Vertex Consultoria.

Referência: 04-assets.md (Motion).

Permitido:
- Hover em botões (400ms, ease-out, glow ciano)
- Fade-in up no scroll (Intersection Observer)
- Grid pulse no hero (8s ease-in-out)
- Hover opacidade na galeria (85%→100%)

Proibido:
- Parallax pesado, bounce, shake
- Animações agressivas ou que atrasem leitura
- Cards animados no hero

Toda animação deve parecer precisa e sofisticada.
```

---

## Prompt 05 — Responsividade

```
Revise responsividade completa do showcase Vertex Consultoria.

Breakpoints: mobile (~390px), tablet (768px), desktop (≥1280px).

Verificar:
- Hero tipográfico legível em todas as larguras
- Navbar → menu mobile funcional (drawer)
- CTAs tocáveis (min 44px)
- Grid método: 1→2→4 colunas
- Grid serviços: 1→2 colunas
- Formulário usável no mobile
- Nenhum overflow horizontal
```

---

## Prompt 06 — Performance e SEO

```
Audite performance e SEO do showcase Vertex Consultoria.

Metas: Lighthouse Performance, SEO, Best Practices ≥ 95.

Verificar:
- Meta title e description de 03-copy.md
- OG tags, favicon, JSON-LD (ProfessionalService)
- Imagens: lazy load; hero sem foto pesada
- HTML semântico (header, main, section, footer)
- Alt text em galeria de resultados
- Footer: "Projeto demonstrativo."
```

---

## Contato demonstrativo

| Canal | Valor |
|-------|-------|
| Telefone | (11) 3045-8890 |
| WhatsApp | 551130458890 |
| E-mail | contato@vertexconsultoria.com.br |
| Endereço | Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi, São Paulo — SP |
| LinkedIn | linkedin.com/company/vertexconsultoria |

Assets: `/showcase/vertex-consultoria/{capa,resultados}`

## Checklist antes de entregar

- [ ] Documentação da pasta lida e respeitada
- [ ] Hero tipográfico; sem stock central; rounded-none
- [ ] Métricas rotuladas como demonstrativas
- [ ] Responsivo e Lighthouse ≥ 95
- [ ] **Parece cliente real**
