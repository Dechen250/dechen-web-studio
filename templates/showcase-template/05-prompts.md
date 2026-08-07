# Prompts — [Nome do Projeto]

**Tipo:** template · **Status:** ativo · **Versão:** 2.0

Prompts para desenvolvimento do showcase. Antes de gerar código, ler toda a pasta:

- [00-projeto.md](00-projeto.md)
- [01-brand-guide.md](01-brand-guide.md)
- [02-sitemap.md](02-sitemap.md)
- [03-copy.md](03-copy.md)
- [04-assets.md](04-assets.md)
- [06-roadmap.md](06-roadmap.md)

Nenhuma decisão de UI ou copy deve contradizer esses documentos.

## Regras gerais (todas as fases)

1. **Hero full-bleed** — mídia ou atmosfera na largura; sem cards sobre a imagem
2. **Marca primeiro** — logo/nome legível no hero e navbar
3. **Uma função por seção** — não misturar oferta, prova e conversão no mesmo bloco
4. **Conteúdo demonstrativo rotulado** — preços, depoimentos, métricas fictícias com flag clara
5. **DoD:** resultado **parece cliente real**
6. Não inventar copy ou dados comerciais — usar [03-copy.md](03-copy.md) ou `[placeholder]`
7. Lighthouse Performance / SEO / Best Practices ≥ 95

---

## Prompt 01 — Desenvolvimento inicial

```
Você é o desenvolvedor front-end da Dechen Web Studio.

Desenvolva o showcase [Nome do Projeto] (segmento: [Segmento]) seguindo
rigorosamente os arquivos desta pasta.

Leia antes de codar:
- 00-projeto.md, 01-brand-guide.md, 02-sitemap.md, 03-copy.md, 04-assets.md

Regras de layout:
- Hero full-bleed; marca em destaque; sem cards no hero
- Uma função por seção
- Conteúdo fictício rotulado como demonstrativo
- Copy exata de 03-copy.md — não reescrever

Stack: Next.js (App Router), React, TypeScript, Tailwind CSS.

Prioridades: UX, performance, responsividade, código organizado.

DoD: parece cliente real.
```

---

## Prompt 02 — Melhorias incrementais

```
Melhore o showcase [Nome do Projeto] existente.

NÃO refaça o site do zero. Mantenha identidade visual e estrutura do sitemap.

Melhorar apenas:
- UX e fluxo de conversão
- Microinterações (hover, fade, scroll reveal — sem exagero)
- Responsividade e acessibilidade (focus, contraste, teclado)
- Performance e organização do código

Consulte 01-brand-guide.md e 04-assets.md para motion e componentes.

DoD: parece cliente real.
```

---

## Prompt 03 — Componentes

```
Extraia componentes reutilizáveis do showcase [Nome do Projeto].

Seguir tokens de 01-brand-guide.md e anatomia de 04-assets.md.

Componentes esperados (ajustar ao sitemap):
- Navbar (fixa, logo, links, CTA)
- Hero (full-bleed, sem cards)
- SectionHeader (título + apoio)
- [Componente da seção de destaque]
- [Componente de conversão — form ou WhatsApp CTA]
- Footer (com nota demonstrativa)

Estados obrigatórios: default, hover, focus, disabled.

Não instalar bibliotecas sem necessidade.
```

---

## Prompt 04 — Animações

```
Adicione motion ao showcase [Nome do Projeto].

Referência: 04-assets.md (seção Motion).

Permitido:
- Hover em botões e links (200–250ms, ease-out)
- Fade in no scroll (Intersection Observer)
- Transição suave entre categorias na [seção de destaque]

Proibido:
- Parallax pesado, bounce, shake
- Animações que atrasam leitura ou atrapalham mobile
- Cards animados no hero

DoD: refinado, não decorativo.
```

---

## Prompt 05 — Responsividade

```
Revise responsividade completa do showcase [Nome do Projeto].

Breakpoints: mobile (~390px), tablet (768px), desktop (≥1280px).

Verificar:
- Hero full-bleed legível em todas as larguras
- Navbar → menu mobile funcional
- CTAs tocáveis (min 44px)
- Imagens dimensionadas (sem CLS)
- Formulário usável no mobile
- Nenhum overflow horizontal

Testar scroll, form e links em viewport estreita.
```

---

## Prompt 06 — Performance e SEO

```
Audite performance e SEO do showcase [Nome do Projeto].

Metas: Lighthouse Performance, SEO, Best Practices ≥ 95.

Verificar:
- Meta title e description de 03-copy.md
- OG tags e favicon
- Imagens: formatos modernos, lazy load, priority no hero
- HTML semântico (header, main, section, footer)
- Alt text em todas as imagens
- Bundle enxuto — eliminar código morto

Footer deve conter: "Projeto demonstrativo."
```

---

## Prompt 07 — Copy e conteúdo demonstrativo

```
Revise copy e flags demonstrativas do showcase [Nome do Projeto].

Fonte: 03-copy.md.

Confirmar:
- Headline do hero ≤ ~10 palavras
- Preços rotulados como demonstrativos
- Depoimentos com autor "Cliente demonstrativo"
- Métricas com nota "indicadores demonstrativos"
- Footer: "Projeto demonstrativo"
- Nenhum fato comercial inventado fora do escopo fictício

Não reescrever para "vender mais" — clareza acima de persuasão.
```

---

## Checklist antes de entregar

- [ ] Documentação da pasta lida e respeitada
- [ ] Hero full-bleed, marca primeiro, sem cards no hero
- [ ] Uma função por seção
- [ ] Demonstrativos rotulados
- [ ] Responsivo e Lighthouse ≥ 95
- [ ] **Parece cliente real**
