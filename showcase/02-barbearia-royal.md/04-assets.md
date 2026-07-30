# Assets — Barbearia Royal

## Objetivo

Este documento reúne todas as referências visuais, elementos gráficos, imagens, tokens de design e inspirações utilizadas no projeto Barbearia Royal.

Todo desenvolvimento deve seguir estas referências.

---

# Tokens de Cor (CSS)

Definidos em `src/app/showcase/barbearia-royal/barbearia-royal.css`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--br-bg` | `#0C0A09` | Fundo principal da página |
| `--br-surface` | `#14110E` | Cards, blocos internos |
| `--br-surface-elevated` | `#1A1612` | Hover states, elevação |
| `--br-text` | `#F2EBE0` | Texto principal |
| `--br-muted` | `#9A9186` | Texto secundário, descrições |
| `--br-gold` | `#C4A35A` | CTAs, labels, preços, destaques |
| `--br-gold-soft` | `#B8956C` | Variações suaves de dourado |
| `--br-border` | `rgba(196,163,90,0.16)` | Bordas padrão de cards |
| `--br-border-strong` | `rgba(196,163,90,0.28)` | Bordas em destaque |

---

# Tipografia

## Playfair Display (Google Fonts)

- Variável CSS: `--font-playfair`
- Pesos: 400, 500, 600, 700
- Uso: títulos, headlines, logo, citações
- Classe: `.font-display`

## DM Sans (Google Fonts)

- Variável CSS: `--font-dm-sans`
- Pesos: 400, 500, 600, 700
- Uso: corpo, labels, botões, navegação
- Classe: `.font-sans`

---

# Hero — Atmosfera Abstrata

**Não utilizar fotografia no hero.**

## Camadas visuais

### `.hero-atmosphere`

Gradientes compostos:

- Radial dourado (80% × 60% em 70% 20%) — `rgba(196,163,90,0.12)`
- Radial marrom escuro (50% × 40% em 15% 80%) — `rgba(90,60,30,0.35)`
- Linear 165deg: `#14110E` → `#0C0A09` → `#090807`

### `.hero-grain`

Grid sutil:

- Linhas douradas 1px a cada 48px
- Opacidade 0.03
- Mask fade para bottom

### Elementos decorativos (desktop)

- Linha vertical dourada no lado direito (gradient fade)
- Círculos concêntricos geométricos dourados
- Linhas cruzadas horizontais e verticais
- Fade inferior para `#0C0A09`

---

# Estilo Fotográfico (Galeria)

As fotografias de ambiente devem transmitir:

- Exclusividade

- Madeira escura e couro

- Luz âmbar e quente

- Privacidade

- Acabamento premium

- Composição editorial

Priorizar fotografias horizontais em alta resolução.

Evitar stock photos genéricas ou ambientes claros.

---

# Fotografias

## Galeria — Ambiente

Caminho base: `public/showcase/barbearia-royal/ambiente/`

| Arquivo | Título | Formato | Aspect ratio |
|---------|--------|---------|--------------|
| `cadeira-premium.jpg` | Cadeira premium | JPG | 21:9 (hero da galeria) |
| `area-de-barba.webp` | Área de barba | WebP | 4:3 |
| `ambiente-reservado.webp` | Ambiente reservado | WebP | 4:3 |
| `finalizacao.webp` | Finalização | WebP | 4:3 |

### Cadeira premium

Cadeira de barbeiro em couro, ambiente escuro, luz âmbar.

Subtítulo: Conforto e precisão.

### Área de barba

Estação de barba com navalha, toalha quente, produtos premium.

Subtítulo: Ritual com navalha.

### Ambiente reservado

Espaço privativo com madeira escura, iluminação controlada.

Subtítulo: Privacidade e presença.

### Finalização

Detalhe de acabamento — produtos, espelho, revisão final.

Subtítulo: Detalhe que faz diferença.

---

# Tratamento de Imagens na Galeria

- Overlay gradiente inferior: `from #0C0A09/90 via #0C0A09/25 to transparent`
- Cantoneiras douradas nos cantos (border-t/l e border-r/b)
- Hover: scale 1.05 com transição 700ms
- Borda: `rgba(196,163,90,0.14)`
- Border-radius: `rounded-xl`

---

# Ícones

Utilizar ícones minimalistas quando necessário.

Traço fino.

Outline.

SVG inline preferencialmente.

Exemplo: ícone hamburger do menu mobile (3 linhas, stroke `#F2EBE0`, 1.5px).

Nunca utilizar ícones exagerados ou coloridos.

---

# Ilustrações

Evitar ilustrações no corpo do site.

O hero utiliza elementos geométricos abstratos (círculos, linhas) — não ilustrações figurativas.

Priorizar atmosfera CSS sobre assets gráficos externos no hero.

---

# Texturas

Utilizar discretamente via CSS:

- Grid grain (48px) no hero

- Gradientes radiais dourados

- Bordas douradas translúcidas

Nunca utilizar texturas pesadas ou imagens de fundo repetidas.

---

# Componentes

Os componentes devem possuir:

- Cantos levemente arredondados (`rounded-xl` para cards, `rounded-sm` para botões)

- Bordas douradas discretas

- Fundos em camadas de superfície escura

- Hover com elevação sutil de borda e fundo

- Espaçamento generoso (py-24 md:py-32 entre seções)

---

# Botões

## Primary

- Fundo: `#C4A35A`
- Texto: `#0C0A09`
- Padding: px-8 py-3.5
- Sombra: `0 2px 20px rgba(196,163,90,0.25)`
- Hover: `#D4B56A`, sombra ampliada
- Active: scale 0.98

## Secondary

- Borda: `rgba(196,163,90,0.35)`
- Fundo: transparente
- Texto: `#F2EBE0`
- Hover: borda mais forte, fundo dourado 8%

## Ghost

- Texto: `#9A9186`
- Hover: `#C4A35A`

CTA principal: Agendar horário

Transição: 500ms ease-out.

---

# Animações

Todas as animações devem transmitir elegância e controle.

Velocidade:

Lenta.

Natural.

Suave.

## fadeInUp

- Duração: 0.8s ease-out
- From: opacity 0, translateY 24px
- To: opacity 1, translateY 0
- Usado em: FadeIn wrapper de seções

## subtleShine

- Duração: 8s ease-in-out infinite
- Opacity: 0.35 ↔ 0.55
- Classe: `.gallery-sheen` (reservada para uso futuro)

## Hover

- Cards: border-color transition 500ms
- Imagens galeria: scale 1.05, 700ms ease-out
- Links navbar: color transition 300ms

## Reduced Motion

Respeitar `prefers-reduced-motion: reduce` — reduzir todas animações para 0.01ms.

---

# Navbar

## Estado inicial

- Fundo transparente
- Altura: 64px (mobile), 80px (desktop)

## Estado scrolled (>24px)

- Fundo: `#0C0A09/90`
- Backdrop blur
- Borda inferior dourada sutil
- Sombra: `0 2px 24px rgba(0,0,0,0.4)`

## Logo

"Barbearia" em `#F2EBE0` + "Royal" em `#C4A35A`

Font: Playfair Display, xl–2xl

---

# SectionHeading (padrão)

- Label: uppercase, tracking 0.28em, `#C4A35A`, 12px
- Title: Playfair, 3xl–5xl, `#F2EBE0`
- Description: DM Sans, base–lg, `#9A9186`
- Max-width: 2xl, centralizado por padrão

---

# Inspirações

Referências de experiência:

- Barbearias premium de São Paulo (Augusta, Jardins)

- Salões masculinos de alto padrão

- Marcas dark luxury (relógios, alfaiataria)

- Hotéis boutique

- Apple (tipografia e espaçamento)

- Awwwards (microinterações discretas)

---

# Responsividade

Todo componente deve funcionar perfeitamente em:

- Desktop (max-w-6xl, 1152px)

- Notebook

- Tablet (sm/md breakpoints)

- Smartphone (px-5, menu hamburger)

Nenhuma animação deve prejudicar a experiência mobile.

Galeria: primeira imagem full-width, demais em grid 2 colunas a partir de sm.

---

# Schema.org

Tipo: `HairSalon`

Campos:

- name: Barbearia Royal
- description: Barbearia premium para homens que valorizam presença, estilo e atendimento de alto nível.
- priceRange: $$
- telephone: +55-11-4000-2929
- address: Rua Augusta, 1840, São Paulo, SP, 01412-000, BR

---

# Objetivo Final

O visitante deve sentir que está navegando pelo site de uma barbearia real, premium e consolidada.

O projeto deve parecer uma marca pronta para receber agendamentos — mesmo sendo demonstração.

A atmosfera escura e o dourado discreto devem ser consistentes em cada pixel.
