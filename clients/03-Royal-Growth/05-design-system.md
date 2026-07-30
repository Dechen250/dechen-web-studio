# Design System — Royal Growth

**Status:** alinhado ao esboço do cliente (`SITE 2026/0.2 - PROMPT LOVABLE.md`).  
**Mudança vs. proposta anterior:** acento passa de **menta** (site legado) para **azul royal**. O site deve parecer infraestrutura tecnológica, não agência.

Validar hex oficiais com o cliente quando houver manual/logo.

---

# 1. Essência

## Quem é

Royal Growth estrutura aquisição, conversão e operação para que o crescimento aconteça **sem aumento proporcional de time**.

## Ideia central

**Escala quando a operação deixa de ser gargalo.**

## Personalidade

| É | Não é |
|---|--------|
| Precisa | Genérica |
| Técnica | “Agência criativa” |
| Sóbrica | Barulhenta |
| Confiável | Vendedora |
| Profunda | Corporativa vazia |
| Clara | Cheia de jargão |

## Sensação desejada

> “Essa empresa não vende marketing. Ela organiza operação.”

---

# 2. Princípios de UX

Referência de **princípios** (não de visual): [n8n.io](https://n8n.io/).

1. Hero extremamente claro, com alto impacto tipográfico  
2. Leitura escaneável, blocos definidos  
3. Progressão: problema → diagnóstico → estrutura → prova → ação  
4. Alternância entre densidade e respiro  
5. Sensação de produto técnico, robusto, confiável  
6. Microinterações elegantes (hover, transições curtas)  
7. Layout modular; tipografia dominante  
8. Uma função por seção  

### Evitar

- Landing genérica de agência  
- Clean corporativo vazio  
- Excesso decorativo, glow, outline, blur de scroll  
- Gradientes chamativos / paleta “startup IA” (purple neon)  
- Cards no hero; badges flutuantes sobre mídia  

---

# 3. Paleta

**Cor principal:** Azul Royal (destaque — CTAs, links, ênfase).  
**Base:** preto profundo (versão dark recomendada para o MVP) **ou** branco (versão clara alternativa).  
**Apoio:** neutros derivados.

## Tokens — tema dark (padrão proposto)

| Token | Hex | Uso |
|-------|-----|-----|
| `--rg-void` | `#05070C` | Fundo mais profundo |
| `--rg-ink` | `#0A0E16` | Fundo de página |
| `--rg-panel` | `#121826` | Seções alternadas |
| `--rg-elevated` | `#1A2233` | Form, superfícies |
| `--rg-line` | `#2A3348` | Bordas / divisores |
| `--rg-royal` | `#1E4FD6` | Primária — CTA, links, acentos |
| `--rg-royal-deep` | `#153A9E` | Hover / ênfase |
| `--rg-royal-soft` | `#6B8CFF` | Highlights em texto / ícones |
| `--rg-white` | `#F4F6FA` | Texto principal |
| `--rg-muted` | `#9AA3B5` | Texto secundário |
| `--rg-faint` | `#6B7385` | Labels, captions |
| `--rg-pure` | `#FFFFFF` | Contraste máximo |

### Superfície paper (cases)

| Token | Hex | Uso |
|-------|-----|-----|
| `--rg-paper` | `#F4F6FA` | Cards de case (interação) |
| `--rg-paper-ink` | `#0A0E16` | Texto sobre paper |
| `--rg-paper-muted` | `#4A5568` | Apoio |

### Semântico

| Token | Hex | Uso |
|-------|-----|-----|
| `--rg-ok` | `#2F9E7A` | Sucesso / confirmação (raro) |
| `--rg-danger` | `#D94B4B` | Erro de form |

> Hex do azul royal é **proposta Dechen**. Substituir se o cliente enviar pantone/manual.

## Regras de cor

- Fundo dark (ou branco) domina; azul royal é **destaque estratégico**, não chapado em grandes áreas  
- Um acento dominante — não misturar menta legado + royal no mesmo layout  
- Contraste AA em texto e UI  
- Evitar gradientes chamativos; se houver glow, máximo sutil no hero (`rgba` do royal ≤ 12% opacidade)

## Gradiente permitido (hero)

```css
--rg-hero-glow:
  radial-gradient(ellipse 70% 50% at 75% 35%, rgba(30, 79, 214, 0.14), transparent 55%),
  linear-gradient(165deg, #0A0E16 0%, #05070C 50%, #121826 100%);
```

---

# 4. Tipografia

| Papel | Fonte | Motivo |
|-------|-------|--------|
| Display / títulos | **Syne** | Presença técnica, não “agência glossy” |
| Corpo / UI | **Plus Jakarta Sans** | Leitura longa (Sobre, Cases, Conteúdo) |

```css
--font-display: "Syne", "Segoe UI", sans-serif;
--font-body: "Plus Jakarta Sans", "Segoe UI", sans-serif;
```

**Não usar:** Inter, Roboto (legado Elementor), Arial, script, outline fill em blocos longos.

## Escala

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-hero` | `clamp(2.75rem, 6vw, 4.5rem)` | Hero |
| `--text-h1` | `clamp(2rem, 4vw, 3rem)` | Título de página |
| `--text-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | Seção |
| `--text-h3` | `1.25rem–1.5rem` | Subseção / case |
| `--text-lead` | `1.125rem–1.25rem` | Apoio do hero |
| `--text-body` | `1.0625rem` | Parágrafo |
| `--text-sm` | `0.875rem` | Nav, labels |

Pesos: display 700–800 · títulos 600–700 · corpo 400–500 · nav 500–600.

Line-height: corpo `1.65` (texto longo) · títulos `1.15`.

---

# 5. Logo

- Wordmark Royal Growth + símbolo do leão  
- Versões: claro sobre dark (padrão), escuro sobre paper, ícone isolado, favicon  
- SVG + PNG em `assets/brand/`  
- Badges RD Diamond: hierarquia menor que a marca; nunca competindo no hero  

Não esticar, não recolorir fora da paleta, não sombra pesada.

---

# 6. Layout e espaço

- Conteúdo máx.: **1120–1200px**  
- Gutter mobile 20–24px · desktop 32–48px  
- Padding de seção: `clamp(4rem, 10vw, 7.5rem)`  
- Escala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`  
- Radius padrão: **8px** (`--radius-md`) — evitar pill SaaS em tudo  

---

# 7. Componentes

## Botões

### Primário — Solicitar diagnóstico

- Fundo `--rg-royal` · texto `--rg-pure`  
- Padding `14px 28px` · radius `8px` · weight 600  
- Hover `--rg-royal-deep` · focus ring royal 2px  

### Secundário — Ghost

- Borda / texto `--rg-royal` · hover fundo `rgba(30,79,214,.08)`  

### Terciário

- Link texto; hover underline / royal  

Um CTA primário por viewport.

## Nav

- Transparent no hero → `ink` + blur leve no scroll  
- Links white / ativo royal  
- CTA à direita  
- Sem pipes `|` entre itens  

## Case block (Resultados)

- Preferir **bloco tipográfico** full-width com divisor, ou card paper se for clicável  
- Título do cliente + subtítulo do ângulo + corpo  
- Sem métricas inventadas; sem glow  

## Fluxo do Sistema

- Seções numeradas ou âncoras (Leitura → Fluxo → Continuidade → Automação → Integração)  
- Conectores discretos com `--rg-line`  
- Visual técnico (diagrama simples opcional), não ilustração “marketing”  

## Formulário (Contato)

- Campos em `--rg-elevated`, borda `--rg-line`, focus royal  
- Labels acima · erro `--rg-danger`  
- Select/textarea para campos longos (ferramentas, descrição, faixa)  
- Submit: **Enviar para análise**  

## Conteúdo (hub)

- Layout editorial: título forte, lead, lista de temas, grid de posts (fase 2)  

## Footer

- Void · CNPJ · links legais · CTA textual discreto  

---

# 8. Motion

2–3 movimentos no MVP:

1. Hero enter (fade + translateY curto, ≤ 600ms)  
2. Reveal de seção no scroll (12–16px)  
3. Hover de CTA / links (150–200ms)  

Respeitar `prefers-reduced-motion`.  
Proibido: blur de texto, outline infinito, parallax agressivo, digitação em parágrafo.

---

# 9. Tom na UI

Labels e microcopy no mesmo registro do `SITE 2026/0.0`:

- Direto, preciso, sem urgência falsa  
- CTAs: **Solicitar diagnóstico** / **Enviar para análise** / **Acessar conteúdos**  
- Evitar: “Falar com um assessor”, “Imprescindível”, “Garanta já”  

---

# 10. Tokens CSS

```css
:root {
  --rg-void: #05070c;
  --rg-ink: #0a0e16;
  --rg-panel: #121826;
  --rg-elevated: #1a2233;
  --rg-line: #2a3348;

  --rg-royal: #1e4fd6;
  --rg-royal-deep: #153a9e;
  --rg-royal-soft: #6b8cff;

  --rg-white: #f4f6fa;
  --rg-muted: #9aa3b5;
  --rg-faint: #6b7385;
  --rg-pure: #ffffff;

  --rg-paper: #f4f6fa;
  --rg-paper-ink: #0a0e16;
  --rg-paper-muted: #4a5568;

  --rg-ok: #2f9e7a;
  --rg-danger: #d94b4b;

  --font-display: "Syne", "Segoe UI", sans-serif;
  --font-body: "Plus Jakarta Sans", "Segoe UI", sans-serif;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --header-h: 72px;
  --content-max: 1160px;
}
```

---

# 11. Checklist

- [ ] Hex royal validado com o cliente  
- [ ] Logos SVG claro/escuro  
- [ ] Badge RD Diamond  
- [ ] Fontes Syne + Plus Jakarta Sans  
- [ ] Botões / nav / form / case block  
- [ ] Contraste AA  
- [ ] `prefers-reduced-motion`  
- [ ] Remover qualquer residual de menta do site legado  

---

# Objetivo final

Visual **premium, técnico e preciso** — azul royal como sinal de controle — para sustentar a narrativa de operação e escala, não de campanha de marketing.
