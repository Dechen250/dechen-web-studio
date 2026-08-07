**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

> Prompts de desenvolvimento — leitura obrigatória da documentação do pack antes de gerar código.

# Divina Cozinha — Prompts

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md) · [06-roadmap.md](06-roadmap.md)

## Pré-requisito

Antes de gerar código, ler todos os arquivos acima. Nenhuma decisão deve contrariar a documentação.

---

## Prompt 01 — Desenvolvimento inicial

Você é Lead Product Designer e Front-end Engineer da Dechen Web Studio.

Desenvolva o projeto Divina Cozinha seguindo rigorosamente a documentação desta pasta.

**Objetivo:** site premium que pareça entregue a cliente real.

**Diretrizes:**

- Tema claro (`#FAF9F6`) — nunca escuro
- Tipografia: Cormorant Garamond + Source Sans 3
- Seções: Hero → Sobre → Cardápio → Ambiente → Reservas → Localização → Footer
- Nav: Sobre, Cardápio, Ambiente, Reservas, Localização
- CTA: Reservar mesa
- Cardápio: 4 categorias, troca automática 10s, efeito virada de página
- Dados: `src/data/divina-cozinha.ts`
- Componentes: `src/components/divina-cozinha/`
- CSS scoped: `divina-cozinha.css` com tokens `--dc-*`

**Prioridades:** UX, performance, elegância, responsividade, código limpo.

Preços e reservas são **demonstrativos**.

---

## Prompt 02 — Melhorias

Melhore o projeto existente. Não refaça o site.

Mantenha identidade clara e acolhedora. Melhore UX, performance, microinterações, responsividade, organização e acessibilidade.

Nunca introduza tema escuro.

---

## Prompt 03 — Componentes

Componentes esperados:

- Navbar (fixa, menu mobile)
- Hero (imagem + headline)
- About (história da marca)
- MenuBook (cardápio animado, 4 categorias, preços demonstrativos)
- Ambiente (galeria 6 imagens)
- ReservasForm (formulário demonstrativo + confirmação simulada)
- Localizacao (endereço, horários, mapa embed)
- Footer (contato + créditos Dechen)
- UI: Button, SectionHeading, FadeIn

Tokens CSS `--dc-*`. Sem bibliotecas desnecessárias.

---

## Prompt 04 — Animações

Microinterações elegantes, nunca exageradas:

- fadeInUp no scroll
- Cardápio: flip/rotateY a cada 10s + tabs manuais
- Hover suave em cards e imagens
- Transições naturais

Respeitar `prefers-reduced-motion`. Sem bounce ou parallax pesado.

---

## Prompt 05 — Responsividade

Excelente experiência em desktop, notebook, tablet e smartphone.

Pontos críticos: menu hamburger, cardápio legível em mobile, galeria adaptável, formulário de reservas em telas pequenas.

---

## Prompt 06 — Performance e SEO

Implementar:

- Metadata (title, description, Open Graph, locale pt_BR)
- Schema.org Restaurant (JSON-LD)
- Imagens otimizadas (WebP)
- `prefers-reduced-motion`
- aria-labels em links externos
- Focus visible nos botões

Eliminar duplicação. Melhorar organização.

---

## Prompt 07 — Documentação v2.0

Reescrever os 7 arquivos do docs pack no padrão editorial v2.0:

- Extrair copy, cardápio, contatos e tokens do código implementado
- Marcar preços e reservas como demonstrativos
- Cross-links entre arquivos do pack
- Profundidade equivalente ao showcase Barbearia Royal

---

## Regras gerais

- Seguir documentação sempre
- Nunca tema escuro
- UX > efeitos visuais
- Case real da Dechen no segmento gastronomia contemporânea
