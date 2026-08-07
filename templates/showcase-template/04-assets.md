# Assets — [Nome do Projeto]

**Tipo:** template · **Status:** ativo · **Versão:** 2.0

Referências visuais do showcase. Brand: [01-brand-guide.md](01-brand-guide.md). Estrutura: [02-sitemap.md](02-sitemap.md). Brief: [00-projeto.md](00-projeto.md).

## Objetivo

Documentar mídia, ícones, motion e inspirações antes e durante o desenvolvimento. Todo asset deve reforçar a sensação de **cliente real** — sem stock genérico no hero.

## Estilo fotográfico

| Atributo | Direção |
|----------|---------|
| Luz | [Natural / estúdio / dramática] |
| Tom | [Quente / frio / neutro] |
| Composição | [Ambiente amplo / detalhe / retrato] |
| Tratamento | [Natural / leve contraste / P&B parcial] |

Evitar: HDR exagerado, filtros inconsistentes, pessoas genéricas de banco de imagem no centro do hero.

## Hero

**Layout:** full-bleed. Marca legível sobre mídia ou fundo tipográfico.

### Opção A — Foto

[Descrever cena ideal: o que aparece, sensação, enquadramento.]

Checklist:

- [ ] Resolução mínima [ex.: 1920×1080]
- [ ] Wash ou gradiente para legibilidade do texto
- [ ] Sem elementos que compitam com logo/headline

### Opção B — Atmosfera tipográfica

[Descrever: grade, textura, gradiente, geometria — sem foto de stock central.]

Checklist:

- [ ] Marca em destaque
- [ ] Hierarquia headline > apoio > CTA
- [ ] Sem cards flutuantes sobre a área principal

## [Seção visual — ex.: Galeria / Ambiente]

| # | Assunto | Uso |
|---|---------|-----|
| 1 | [Elemento — ex.: recepção, produto, equipe] | Grid / carrossel |
| 2 | [Elemento] | Grid / carrossel |
| 3 | [Elemento] | Grid / carrossel |
| 4 | [Elemento] | Grid / carrossel |
| 5 | [Elemento] | Grid / carrossel |
| 6 | [Elemento] | Grid / carrossel |

Formato preferido: horizontal para hero; variado para galeria. Lazy load abaixo da dobra.

## [Seção de destaque — ex.: Serviços]

Representação por categoria:

### [Categoria 1]

- Imagem ou ícone: [descrever]
- Alt text: [descrição acessível]

### [Categoria 2]

- Imagem ou ícone: [descrever]
- Alt text: [descrição acessível]

### [Categoria 3]

- Imagem ou ícone: [descrever]
- Alt text: [descrição acessível]

### [Categoria 4]

- Imagem ou ícone: [descrever]
- Alt text: [descrição acessível]

## Logo e marca

| Asset | Formato | Notas |
|-------|---------|-------|
| Logo principal | [SVG / PNG] | Versão para [fundo claro / escuro] |
| Favicon | ICO / PNG 32×32 | Derivado do logo |
| OG image | 1200×630 | Marca + headline ou ambiente |

## Ícones

- Biblioteca: [Lucide / outra]
- Estilo: outline, traço uniforme
- Tamanhos: 20px (inline) · 24px (cards) · 32px (destaque)

## Ilustrações

[Usar / evitar / usar com moderação]

[Justificar conforme segmento — ex.: consultoria pode ser tipográfica; clínica prioriza foto real.]

## Texturas e padrões (opcional)

Usar com moderação:

- [Textura ou padrão 1 — ex.: grain sutil, grid geométrico]
- [Textura 2]

Nunca dominar o layout — reforço de fundo apenas.

## Componentes visuais

| Componente | Especificação |
|------------|---------------|
| Card | Radius [valor] · padding [valor] · border [1px cor] — só quando agrupamento exigir |
| Botão primário | Ver [01-brand-guide.md](01-brand-guide.md) |
| Input | Altura [48–56px] · radius [valor] |
| Navbar | Altura [72px] · backdrop blur [sim/não] |

**Regra:** sem cards no hero.

## Motion

| Tipo | Duração | Curva |
|------|---------|-------|
| Hover botão | 200–250ms | ease-out |
| Fade in scroll | 250–300ms | ease-out |
| Troca de categoria | [300–400ms] | ease-out |

Evitar: bounce, shake, parallax pesado, animações que atrasam leitura.

### [Seção interativa — se aplicável]

[Descrever transição entre categorias — ex.: fade + slide, crossfade de imagem.]

Intervalo automático (se houver): [8–10s] · pausa no hover · controle manual acessível.

## Inspirações

Referência de estrutura ou craft — não copiar pixel a pixel:

| Referência | O que observar |
|------------|----------------|
| [Site ou marca 1] | [ex.: hierarquia tipográfica, hero full-bleed] |
| [Site ou marca 2] | [ex.: grid de serviços] |
| [Site ou marca 3] | [ex.: tom fotográfico] |

## Responsividade

| Breakpoint | Ajustes principais |
|------------|-------------------|
| Mobile (~390px) | Hero empilhado; CTA full-width; menu hamburger |
| Tablet (768px) | Grid 2 colunas onde couber |
| Desktop (≥1280px) | Layout completo; container max [1280px] |

Nenhuma animação deve quebrar ou travar no mobile.

## Checklist de assets

- [ ] Hero full-bleed definido (foto ou atmosfera)
- [ ] Logo em SVG (claro + escuro se necessário)
- [ ] Imagens de galeria listadas com alt text
- [ ] OG image preparada
- [ ] Conteúdo demonstrativo não confundido com asset real
- [ ] Resultado **parece cliente real**
