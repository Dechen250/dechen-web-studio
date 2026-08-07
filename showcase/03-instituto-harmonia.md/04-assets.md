# Assets — Instituto Harmonia

**Tipo:** showcase · **Status:** ativo · **Versão:** 2.0

Referências visuais do showcase. Brand: [01-brand-guide.md](01-brand-guide.md). Estrutura: [02-sitemap.md](02-sitemap.md). Brief: [00-projeto.md](00-projeto.md).

## Objetivo

Documentar mídia, motion e inspirações. Assets reforçam sensação de **cliente real** — sem stock genérico no hero.

## Estilo fotográfico

| Atributo | Direção |
|----------|---------|
| Luz | Natural, ambiente clínico acolhedor |
| Tom | Claro, fresco, tons de saúde e bem-estar |
| Composição | Horizontal para hero; variado para galeria |
| Tratamento | Natural; sem HDR exagerado |

Evitar: stock genérico no hero, ambientes frios/hospitalares, excesso de edição.

## Hero

**Layout:** full-bleed com wash suave à esquerda para legibilidade.

Cena ideal: recepção iluminada, consultório com luz natural ou sala de espera confortável.

| Checklist | |
|-----------|---|
| Resolução mínima | 1920×1080 |
| Wash/gradiente | Esquerda + inferior suave |
| Sem cards | Sobre a imagem |

**Path:** `public/showcase/instituto-harmonia/capa/capa.jpg`

## Ambiente (galeria Local)

| # | Assunto | Path |
|---|---------|------|
| 1 | Consultório acolhedor | `public/showcase/instituto-harmonia/ambiente/consultorio.jpg` |
| 2 | Recepção | `public/showcase/instituto-harmonia/ambiente/recepcao.jpg` |
| 3 | Sala de espera | `public/showcase/instituto-harmonia/ambiente/sala-espera.jpg` |

Priorizar: luz natural, tons claros, plantas e detalhes humanos.

## Equipe (ficção demonstrativa)

| Profissional | Cargo | Path |
|--------------|-------|------|
| Dra. Helena Vasconcelos | Clínica geral · Diretora médica | `public/showcase/instituto-harmonia/equipe/dra-helena.jpg` |
| Dr. Marcus Oliveira | Cardiologista | `public/showcase/instituto-harmonia/equipe/dr-marcus.jpg` |
| Dra. Sofia Mendes | Dermatologista | `public/showcase/instituto-harmonia/equipe/dra-sofia.jpg` |

Fotos profissionais; bios fictícias em [03-copy.md](03-copy.md).

## Logo e marca

| Asset | Formato | Notas |
|-------|---------|-------|
| Logo principal | Texto Fraunces | Instituto Harmonia |
| Favicon | ICO / PNG 32×32 | Derivado da marca |
| OG image | 1200×630 | Ambiente clínico + tagline |

## Ícones

- Estilo: outline, traço fino
- Tamanhos: 20px (inline) · 24px (cards)
- Minimalistas — sem excesso de detalhe

## Ilustrações

Evitar. Priorizar fotografias reais.

## Texturas

Usar com moderação:

- Off-white `#F4F8F7`, branco `#FFFFFF`
- Acento claro `#E8F3F0`, bordas `#D5E4E0`

Nunca texturas pesadas.

## Componentes visuais

| Componente | Especificação |
|------------|---------------|
| Card | Cantos arredondados · borda `#D5E4E0` · sombra suave |
| Botão primário | Teal `#2A7A6E` · hover `#3D9B8C` |
| Input | Altura 48–56px · cantos arredondados |
| Navbar | Fixa · backdrop blur opcional |

**Regra:** sem cards no hero.

## Motion

| Tipo | Duração | Curva |
|------|---------|-------|
| Hover botão | 200–300ms | ease-out |
| Fade in scroll | 250–300ms | ease-out |
| Entrada de seções | Leve deslocamento vertical | ease-out |

Evitar: bounce, shake, parallax pesado, animações agressivas.

### Hero

- Wash gradiente à esquerda
- Gradiente inferior para transição com fundo

## Paleta (referência rápida)

| Token | Hex |
|-------|-----|
| Fundo | `#F4F8F7` |
| Surface | `#FFFFFF` |
| Texto | `#1A2E2B` |
| Muted | `#5A6F6A` |
| Teal primário | `#2A7A6E` |
| Teal suave | `#3D9B8C` |
| Borda | `#D5E4E0` |
| Acento claro | `#E8F3F0` |

Evitar: `#0070F3`, cream + terracotta, roxo.

## Tipografia

- Display: **Fraunces**
- Corpo: **Outfit**

## Inspirações

| Referência | O que observar |
|------------|----------------|
| Clínicas premium SP / Jardins | Tom acolhedor, fotografia de ambiente |
| Apple / Airbnb | Hierarquia, respiro, legibilidade |
| Awwwards (saúde) | Craft de scroll e tipografia |

## Responsividade

| Breakpoint | Ajustes |
|------------|---------|
| Mobile (~390px) | Hero empilhado; CTA full-width; menu hamburger |
| Tablet (768px) | Grid 2 colunas (especialidades, equipe) |
| Desktop (≥1280px) | Grid 3 colunas; hero full-bleed completo |

## Checklist de assets

- [ ] Hero full-bleed definido
- [ ] 3 fotos de ambiente + 3 de equipe listadas
- [ ] OG image preparada
- [ ] Conteúdo demonstrativo não confundido com asset real
- [ ] Resultado **parece cliente real**
