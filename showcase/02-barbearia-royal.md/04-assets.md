**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

> Referências visuais e tokens do showcase Barbearia Royal — alinhados ao código em `src/`.

# Barbearia Royal — Assets

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [03-copy.md](03-copy.md) · [05-prompts.md](05-prompts.md)

## Tokens de cor

Definidos em `src/app/showcase/barbearia-royal/barbearia-royal.css`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--br-bg` | `#0C0A09` | Fundo principal |
| `--br-surface` | `#14110E` | Cards, blocos |
| `--br-surface-elevated` | `#1A1612` | Hover, elevação |
| `--br-text` | `#F2EBE0` | Texto principal |
| `--br-muted` | `#9A9186` | Texto secundário |
| `--br-gold` | `#C4A35A` | CTAs, labels, preços |
| `--br-gold-soft` | `#B8956C` | Variações suaves |
| `--br-border` | `rgba(196,163,90,0.16)` | Bordas padrão |
| `--br-border-strong` | `rgba(196,163,90,0.28)` | Bordas em destaque |

## Tipografia

### Playfair Display

- Variável: `--font-playfair`
- Pesos: 400, 500, 600, 700
- Uso: títulos, headlines, logo, citações
- Classe: `.font-display`

### DM Sans

- Variável: `--font-dm-sans`
- Pesos: 400, 500, 600, 700
- Uso: corpo, labels, botões, navegação
- Classe: `.font-sans`

## Hero — atmosfera abstrata

**Sem fotografia no hero.**

### `.hero-atmosphere`

- Radial dourado (80% × 60% em 70% 20%) — `rgba(196,163,90,0.12)`
- Radial marrom (50% × 40% em 15% 80%) — `rgba(90,60,30,0.35)`
- Linear 165deg: `#14110E` → `#0C0A09` → `#090807`

### `.hero-grain`

Grid 48px, linhas douradas 1px, opacidade 0.03, mask fade inferior.

### Decorativos (desktop)

Linha vertical dourada, círculos concêntricos, linhas cruzadas, fade para `#0C0A09`.

## Fotografias — galeria ambiente

Caminho: `public/showcase/barbearia-royal/ambiente/`

| Arquivo | Título | Ratio |
|---------|--------|-------|
| `cadeira-premium.jpg` | Cadeira premium | 21:9 (hero galeria) |
| `area-de-barba.webp` | Área de barba | 4:3 |
| `ambiente-reservado.webp` | Ambiente reservado | 4:3 |
| `finalizacao.webp` | Finalização | 4:3 |

Estilo: madeira escura, couro, luz âmbar, composição editorial. Evitar stock genérico.

## Tratamento galeria

- Overlay: `from #0C0A09/90 via #0C0A09/25 to transparent`
- Cantoneiras douradas nos cantos
- Hover: scale 1.05, 700ms
- Borda: `rgba(196,163,90,0.14)`, `rounded-xl`

## Ícones

Minimalistas, traço fino, outline, SVG inline. Exemplo: hamburger (3 linhas, stroke `#F2EBE0`, 1.5px).

## Componentes

- Cards: `rounded-xl`, bordas douradas, superfícies em camadas
- Botões primary: `#C4A35A` / `#0C0A09`, px-8 py-3.5, sombra `0 2px 20px rgba(196,163,90,0.25)`
- Botões secondary: borda `rgba(196,163,90,0.35)`, hover fundo dourado 8%
- Espaçamento: py-24 md:py-32 entre seções

## Animações

| Nome | Spec |
|------|------|
| fadeInUp | 0.8s ease-out, translateY 24px → 0 |
| subtleShine | 8s infinite, `.gallery-sheen` (reservado) |
| Hover cards | border 500ms |
| Hover galeria | scale 1.05, 700ms |
| Navbar links | color 300ms |

**Reduced motion:** `prefers-reduced-motion: reduce` → 0.01ms.

## Navbar

| Estado | Spec |
|--------|------|
| Inicial | Transparente, 64px mobile / 80px desktop |
| Scrolled (>24px) | `#0C0A09/90`, blur, borda dourada, sombra `0 2px 24px rgba(0,0,0,0.4)` |

Logo: "Barbearia" `#F2EBE0` + "Royal" `#C4A35A`, Playfair xl–2xl.

## SectionHeading (padrão)

Label uppercase tracking 0.28em `#C4A35A` 12px · Title Playfair 3xl–5xl · Description DM Sans base–lg muted · max-w-2xl centralizado.

## Schema.org

Tipo: `HairSalon`

- name: Barbearia Royal
- description: Barbearia premium para homens que valorizam presença, estilo e atendimento de alto nível.
- priceRange: $$
- telephone: +55-11-4000-2929
- address: Rua Augusta, 1840, São Paulo, SP, 01412-000, BR

## Responsividade

Desktop max-w-6xl (1152px) · tablet sm/md · mobile px-5, hamburger. Galeria: full-width + grid 2 colunas a partir de sm.

## Inspirações

Barbearias premium SP (Augusta, Jardins), salões masculinos, dark luxury, hotéis boutique, Apple (tipografia/espaçamento), Awwwards (microinterações).

## Stack de implementação

- Rota: `/showcase/barbearia-royal`
- Dados: `src/data/barbearia-royal.ts`
- Componentes: `src/components/barbearia-royal/`
- CSS: `barbearia-royal.css`
