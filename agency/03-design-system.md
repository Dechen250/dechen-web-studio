# Design System — Dechen Web Studio

**Tipo:** produto · **Status:** ativo · **Versão:** 2.0

Regras técnicas de interface da marca DWS. Filosofia e voz: [Brand Guide](02-brand-guide.md). Comportamento de IAs: [DWS AI OS](04-dws-ai-operating-system.md).

## Objetivo

Consistência entre superfícies da agência. Cada componente deve parecer do mesmo ecossistema.

Em projetos de cliente, o design system **do cliente** prevalece; use este documento só quando a UI for DWS.

## Tokens CSS (referência)

```css
:root {
  --color-primary: #0070F3;
  --color-bg: #050505;
  --color-surface: #101010;
  --color-border: #262626;
  --color-text: #FFFFFF;
  --color-text-muted: #A1A1AA;

  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  --container-max: 1280px;
  --nav-height: 72px;
  --control-height: 56px;

  --motion-fast: 200ms;
  --motion-base: 250ms;
  --motion-slow: 300ms;
  --ease-standard: ease-out;
}
```

Nunca inventar valores fora da escala de espaçamento.

## Grid e layout

| Token | Valor |
|-------|-------|
| Container máx. | 1280px |
| Padding desktop | 32px |
| Padding tablet | 24px |
| Padding mobile | 20px |

## Breakpoints

| Nome | Largura |
|------|---------|
| Mobile | ~390px |
| Tablet | 768px |
| Laptop | 1024px |
| Desktop | ≥1280px |

## Tipografia (escala)

| Nível | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| H1 | 64px | 48px | 36px |
| H2 | 48px | — | — |
| H3 | 32px | — | — |
| Body | 18px | — | — |
| Small | 14px | — | — |

Face: Geist (marca DWS). Ajustar line-height para leitura confortável; não comprimir blocos de texto.

## Componentes — anatomia mínima

Todo componente interativo precisa de: default, hover, focus, active, disabled.

### Botão primário

- Altura: 56px · radius: full · padding horizontal: 32px · peso: 600 · transição: 250ms
- Fundo: gradiente/azul primário; glow discreto quando Liquid Glass

### Botão secundário

- Mesmo tamanho; fundo transparente ou surface; contorno `--color-border`

### Card

- Radius: 24px · padding: 32px · border: 1px `--color-border` · background: surface  
- Usar cards só quando a interação ou o agrupamento exigir — não por padrão em marketing.

### Input

- Altura: 56px · radius: 18px · border: 1px · placeholder em texto muted

### Navbar

- Altura: 72px · posição fixa · backdrop-blur (Liquid Glass em superfícies DWS)

## Liquid Glass (implementação)

Em componentes premium DWS:

- `backdrop-filter: blur(...)`
- Transparência controlada
- Reflexo/borda sutil
- Glow discreto
- Sombras profundas, não espalhadas

Não exagerar. Em sites de cliente, só se o brief pedir.

## Motion

Curva: `ease-out`. Durações: 200 / 250 / 300ms. Preferir opacity, transform e blur leves.

## Ícones

Lucide, outline, peso uniforme.

## Performance (metas)

- Lighthouse Performance / Best Practices / SEO: **95+**
- CLS estável (evitar saltos de layout)
- LCP otimizado (imagens dimensionadas, prioridade no hero)
- Bundle enxuto; lazy load quando fizer sentido

## Acessibilidade

- Contraste AA
- Focus visível
- HTML semântico
- ARIA só quando necessário
- Navegação por teclado obrigatória

## Checklist antes de criar componente

1. Já existe algo reutilizável?
2. Usa tokens deste documento?
3. Tem todos os estados?
4. Parece Dechen Web Studio (ou a marca do cliente, se for o caso)?
