# Sitemap — Royal Growth

**Tipo:** sitemap · **Status:** alinhado ao SITE 2026 · **Versão:** 2.0

Pack: [00-projeto.md](00-projeto.md) · [01-analise-site-atual.md](01-analise-site-atual.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md) · [05-design-system.md](05-design-system.md) · [06-roadmap.md](06-roadmap.md) · Esboço: [`SITE 2026/0.1 - ESTRUTURA.md`](SITE%202026/0.1%20-%20ESTRUTURA.md)

## Objetivo

Definir a arquitetura de páginas e seções do novo site. Substituir a hipótese anterior baseada só no site legado.

## Site atual (legado — a substituir)

```text
/ · /solucoes/ · /sobre-nos/ · /contato/ · /verdadeiro-marketing/
```

CTA antigo: Falar com um assessor.

## Novo site (2026)

### Menu global

| Item | Rota |
|------|------|
| Início | `/` |
| Sistema | `/sistema/` |
| Resultados | `/resultados/` |
| Conteúdo | `/conteudo/` |
| Sobre | `/sobre/` |
| Contato | `/contato/` |

**CTA global:** Solicitar diagnóstico → `/contato`

### Árvore de URLs

```text
royalgrowth.com.br/
├── /                 → Home
├── /sistema/         → Sistema (oferta / fluxo operacional)
├── /resultados/      → Cases
├── /conteudo/        → Hub de conteúdo (+ posts em fase 2)
│   └── /conteudo/[slug]/
├── /sobre/           → Sobre / trajetória
├── /contato/         → Diagnóstico (form qualificatório)
├── /privacidade/
└── /termos/
```

### Redirects sugeridos (legado → novo)

| Antigo | Novo |
|--------|------|
| `/solucoes/` | `/sistema/` |
| `/sobre-nos/` | `/sobre/` |
| `/verdadeiro-marketing/` | `/contato/` |

## Home — seções

Fonte: `SITE 2026/1 - HOME.md` + `0.1 - ESTRUTURA.md`

| # | Seção | Função |
|---|--------|--------|
| 1 | Hero | Título + subtítulo + CTA + menção RD Diamond |
| 2 | Abertura | O crescimento que começa a custar demais |
| 3 | Desenvolvimento | Improviso que impede escala |
| 4 | O que fazemos | Escopo de atuação |
| 5 | Contexto | Gargalo na operação, não no mercado |
| 6 | RD Station | Credencial silenciosa |
| 7 | Operação | Teto quando depende demais de pessoas |
| 8 | Clareza operacional | Escala como sistema |
| 9 | Encerramento | CTA |

Opcional no MVP (se houver assets): faixa curta de logos / prova após o hero.

Copy: `03-copy.md` → Home.

## Sistema — seções

Fonte: `SITE 2026/2 - SISTEMA.md`

| # | Seção |
|---|--------|
| 1 | Título + introdução |
| 2 | Leitura da operação |
| 3 | Organização do fluxo |
| 4 | Continuidade |
| 5 | Automação |
| 6 | Integração (RD, ERP, CRM, APIs) |
| 7 | Resultado |
| 8 | Encerramento + CTA |

### Espinha do sistema

1. Geração de demanda
2. Conversão e continuidade
3. Automação e padronização
4. Integração com operação
5. Escala sem aumento proporcional de time

## Resultados — seções

Fonte: `SITE 2026/3 - RESULTADOS.md`

| # | Seção |
|---|--------|
| 1 | Título + introdução |
| 2 | Cases (blocos separados) |
| 3 | Encerramento + CTA |

### Cases no material (12)

| # | Cliente | Ângulo |
|---|---------|--------|
| 1 | Pitney Bowes Brasil | Integração / dados / RD + Protheus |
| 2 | Colégio Arcádia | Atendimento → fluxo rastreável |
| 3 | Minas Pet Shop | Padronização comercial / WhatsApp |
| 4 | Eben Empreendimentos | Volume + IA no início do atendimento |
| 5 | Portal Créditos | Continuidade / anti-duplicidade via API |
| 6 | Revanche Jeans | Migração sem ruptura da lógica comercial |
| 7 | Alpha Strong | Qualificação antes da venda |
| 8 | Você no Shape | Social selling → processo |
| 9 | Movement Equipamentos Fitness | Distribuição multiunidade |
| 10 | SBIE | Ações isoladas → base contínua |
| 11 | FranklinCovey Brasil | Mudança de modelo + sustentação |
| 12 | CEAGESP Festivais | Intenção → presença (automações) |

MVP: publicar apenas os liberados. Não inventar métricas além do texto autorizado.

## Conteúdo — seções

Fonte: `SITE 2026/4 - CONTEÚDO.md`

| # | Seção |
|---|--------|
| 1 | Título + introdução |
| 2 | O que você vai encontrar |
| 3 | Como ler |
| 4 | Temas recorrentes |
| 5 | Relação com a Royal |
| 6 | Encerramento + CTAs |

Posts individuais: fase 2, salvo acervo pronto no go-live.

## Sobre — seções

Fonte: `SITE 2026/5 - SOBRE.md`

| # | Seção |
|---|--------|
| 1 | Título + introdução |
| 2 | Trajetória (Maurício / 2010 → 2020 → 2021) |
| 3 | Expansão (2022–2023) |
| 4 | Mudança de direção (automação / IA) |
| 5 | Hoje |
| 6 | O que essa história sustenta |
| 7 | Sobre a Royal (síntese) |
| 8 | Encerramento + CTA |

## Contato — seções

Fonte: `SITE 2026/6 - CONTATO.md`

| # | Seção |
|---|--------|
| 1 | Título + introdução (triagem) |
| 2 | Quando vale abrir a conversa |
| 3 | O que acontece depois do envio |
| 4 | Formulário |
| 5 | Encerramento + CTA “Enviar para análise” |

### Campos do formulário

- Nome
- Empresa
- Cargo
- WhatsApp
- E-mail corporativo
- Faixa de faturamento mensal
- Quantos leads, em média, por mês?
- Onde percebe mais perda: entrada / atendimento / follow-up / comercial / gestão?
- Quais ferramentas fazem parte da operação hoje?
- Descreva brevemente a operação comercial atual

## Decisões fechadas

- Menu e nomes de página do `SITE 2026`
- CTA principal: **Solicitar diagnóstico**
- Conteúdo e Sobre entram no MVP (páginas); blog profundo pode ser fase 2

## Decisões pendentes

- Hex oficial do azul royal / logos
- Quais cases liberar no dia 1
- Destino técnico do formulário
