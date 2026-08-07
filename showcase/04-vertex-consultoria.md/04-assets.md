# Assets — Vertex Consultoria

**Tipo:** showcase · **Status:** ativo · **Versão:** 2.0

Referências visuais do showcase. Brand: [01-brand-guide.md](01-brand-guide.md). Estrutura: [02-sitemap.md](02-sitemap.md). Brief: [00-projeto.md](00-projeto.md).

## Objetivo

Documentar mídia, motion e inspirações. Hero tipográfico — sem stock no centro. Métricas são **demonstrativas**.

## Estilo fotográfico

| Atributo | Direção |
|----------|---------|
| Luz | Controlada, tom frio |
| Tom | Corporativo moderno, decisão executiva |
| Composição | Horizontal 4:3 na galeria de resultados |
| Tratamento | Natural; sem filtros quentes |

Evitar: stock genérico no hero, poses artificiais, estética de agência criativa.

## Hero

**Layout:** tipográfico full-bleed — sem fotografia central.

Atmosfera construída com CSS puro:

| Elemento | Especificação |
|----------|---------------|
| Grade geométrica | 64×64px, ciano 6% opacidade, animação gridPulse 8s |
| Glow radial | Ciano nos cantos, estático |
| Decorativo | Quadrado com cruz e bordas ciano (desktop) |
| Gradiente inferior | Transição suave para seção seguinte |
| Marca | VERTEX. em Syne |
| Headline | Tipografia display |

Checklist:

- [ ] Marca em destaque
- [ ] Hierarquia headline > apoio > CTA
- [ ] Sem cards flutuantes
- [ ] Sem foto de stock central

## Resultados (galeria)

| # | Assunto | Path |
|---|---------|------|
| 1 | Escritório Vertex Consultoria | `/showcase/vertex-consultoria/resultados/escritorio.jpg` |
| 2 | Reunião estratégica com equipe | `/showcase/vertex-consultoria/resultados/reuniao.jpg` |
| 3 | Análise de indicadores de crescimento | `/showcase/vertex-consultoria/resultados/analise.jpg` |

Borda ciano discreta. Opacidade 85% → 100% no hover (500ms).

## Capa (portfólio)

Path: `/showcase/vertex-consultoria/capa/capa.jpg`

Deve transmitir autoridade e estética dark/ciano alinhada ao site.

## Serviços

Sem fotografias individuais. Representação tipográfica em grid 2×2 com hover em surface alternada (`#121A24` → `#15202C`).

| Categoria | Destaques |
|-----------|-----------|
| Planejamento estratégico | Diagnóstico · Roadmap 12–36 meses · Priorização |
| Gestão financeira | Fluxo de caixa · Precificação · Indicadores |
| Operações & processos | Mapeamento · Otimização · Automação |
| Mentoria executiva | Founders · Decisões críticas · Rituais de gestão |

## Logo e marca

| Asset | Formato | Notas |
|-------|---------|-------|
| Logo principal | Texto Syne | VERTEX. — ponto em ciano |
| Favicon | ICO / PNG 32×32 | Derivado da marca |
| OG image | 1200×630 | Dark/ciano + headline |

## Ícones

- Estilo: outline, traço fino — usar com moderação
- Preferir números (01–04) e tipografia como elementos visuais

## Ilustrações

Evitar ilustrações genéricas. Hero construído com grade geométrica CSS — não banco de imagens.

## Texturas

Usar com moderação:

- Grade geométrica (hero-grid)
- Bordas ciano semi-transparentes
- Glow radial sutil
- Separadores 1px rgba ciano
- Gradientes escuros entre seções

Nunca: texturas pesadas, dourado, gradientes roxos.

## Componentes visuais

| Componente | Especificação |
|------------|---------------|
| Card | Cantos retos (`rounded-none`) · borda ciano · surface `#121A24` |
| Botão primário | Ciano `#22D3EE` · glow no hover · `rounded-none` |
| Input | Altura 48–56px · cantos retos |
| Navbar | Fixa · scroll blur · borda inferior ciano |

**Regra:** sem cards no hero; botões nunca arredondados.

## Motion

| Tipo | Duração | Curva |
|------|---------|-------|
| Hover botão | 400ms | ease-out |
| Fade in scroll | 250–300ms | ease-out |
| Grid pulse (hero) | 8s | ease-in-out infinite |
| Hover galeria | 500ms | opacity 85%→100% |

Evitar: bounce, shake, parallax pesado.

### Método

Fade-in up por etapa ao entrar na viewport. Separadores verticais entre colunas (desktop).

### Serviços

Hover background `#121A24` → `#15202C`, transição suave.

## Inspirações

| Referência | O que observar |
|------------|----------------|
| Linear / Vercel / Stripe | Dark corporativo, tipografia, hierarquia |
| Apple | Craft tipográfico |
| Awwwards (dark B2B) | Scroll e motion discreto |
| Consultorias estratégicas | Tom e autoridade — não visual literal |

Evitar: agências criativas genéricas, startups hype, Barbearia Royal (gold), Harmonia (teal), roxo.

## Responsividade

| Breakpoint | Ajustes |
|------------|---------|
| Mobile (~390px) | Hero empilhado; CTA full-width; drawer mobile |
| Tablet (768px) | Método 2 colunas; serviços 2 colunas |
| Desktop (≥1280px) | Método 4 colunas; layout completo |

Grid método: 1→2→4 colunas. Grid serviços: 1→2 colunas.

## Checklist de assets

- [ ] Hero tipográfico definido (sem stock central)
- [ ] 3 fotos de resultados listadas
- [ ] Capa de portfólio preparada
- [ ] Métricas rotuladas como demonstrativas
- [ ] Resultado **parece cliente real**
