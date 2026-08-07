**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

> Estrutura de navegação fictícia — âncoras e jornada orientadas à conversão demonstrativa.

# Barbearia Royal — Sitemap

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md)

## Objetivo

Navegação intuitiva que conduz o visitante ao agendamento em poucos cliques. Toda seção reforça presença premium e CTA principal.

## Estrutura geral

```
Home
├── Hero
├── Diferenciais (#diferenciais)
├── Serviços (#servicos)
├── Experiência (#experiencia)
├── Depoimentos (#depoimentos)
├── Galeria / Ambiente (#ambiente)
├── Final CTA (#agendar)
└── Footer
```

## Navbar

**Logo:** Barbearia **Royal** (Royal em dourado)

| Link | Âncora |
|------|--------|
| Diferenciais | `#diferenciais` |
| Serviços | `#servicos` |
| Experiência | `#experiencia` |
| Depoimentos | `#depoimentos` |
| Ambiente | `#ambiente` |

**CTA:** Agendar horário → `#agendar`

Fixa no scroll. Estado scrolled: fundo `#0C0A09/90`, blur, borda inferior dourada. Mobile: hamburger, overlay escuro, CTA full-width.

## Seções

### Hero

| Elemento | Conteúdo |
|----------|----------|
| Label | Barbearia de alto padrão |
| Headline | Cortes precisos. Experiência de respeito. |
| Subheadline | Presença, estilo e atendimento premium |
| CTAs | Agendar horário · Ver serviços |
| Visual | Atmosfera abstrata — **sem foto** |
| Altura | ~92vh |

### Diferenciais — `#diferenciais`

**Título:** O padrão que define a experiência.

4 cards numerados (01–04): hora marcada, barbeiros experientes, ambiente premium, acabamento de alto padrão.

Grid: 4 → 2 → 1 colunas.

### Serviços — `#servicos`

**Título:** Cuidados sob medida para sua presença.

6 cards com preços **demonstrativos** — ver [03-copy.md](03-copy.md).

Grid: 3 → 2 → 1 colunas.

### Experiência — `#experiencia`

**Título:** Do primeiro contato ao visual final.

| Step | Etapa |
|------|-------|
| 01 | Recepção |
| 02 | Consultoria de estilo |
| 03 | Execução |
| 04 | Finalização premium |

Timeline horizontal (desktop) → empilhado (mobile).

### Depoimentos — `#depoimentos`

**Título:** O que dizem sobre a experiência.

3 blockquotes **fictícios demonstrativos**. Grid 3 → 1 colunas.

### Galeria — `#ambiente`

**Título:** Um espaço feito para presença.

| Título | Arquivo |
|--------|---------|
| Cadeira premium | `cadeira-premium.jpg` |
| Área de barba | `area-de-barba.webp` |
| Ambiente reservado | `ambiente-reservado.webp` |
| Finalização | `finalizacao.webp` |

Caminho: `public/showcase/barbearia-royal/ambiente/`

Layout: primeira imagem 21:9 full-width; demais grid 2 colunas 4:3. Hover: scale + cantoneiras douradas.

### Final CTA — `#agendar`

**Título:** Pronto para elevar sua presença?

Botão "Agendar agora". Nota: **demonstração — agendamento ilustrativo, sem envio real.**

### Footer

Logo + tagline · Instagram · WhatsApp · telefone · endereço · copyright · link "Showcase por Dechen Web Studio" → `/#projetos`

## Contato (referência)

| Canal | Valor |
|-------|-------|
| Telefone | (11) 4000-2929 |
| WhatsApp | wa.me/551140002929 |
| E-mail | contato@barbeariaroyal.com.br |
| Instagram | instagram.com/barbeariaroyal |
| Endereço | Rua Augusta, 1840 — Consolação, São Paulo — SP |
| CEP | 01412-000 |

**Horários:** Ter–Sex 10h–20h · Sáb 9h–18h · Dom/Seg fechado.

## Jornada do usuário

Hero → Diferenciais → Serviços → Experiência → Depoimentos → Ambiente → Agendar

## Prioridade da informação

1. Hero (tagline + CTA)
2. Serviços (preços demonstrativos)
3. Agendamento (Final CTA)
4. Diferenciais
5. Experiência
6. Ambiente
7. Depoimentos

Scroll suave entre âncoras. Navbar acessível em qualquer ponto.
