# Projeto — Site Royal Growth

**Tipo:** brief · **Status:** documentação alinhada · **Versão:** 2.0

Pack: [01-analise-site-atual.md](01-analise-site-atual.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md) · [05-design-system.md](05-design-system.md) · [06-roadmap.md](06-roadmap.md) · Esboço: [`SITE 2026/`](SITE%202026/)

## Objetivo

Repaginar o site oficial da **Royal Growth** ([royalgrowth.com.br](https://royalgrowth.com.br/)) com base no esboço do cliente em `SITE 2026/`.

O novo site posiciona a Royal como empresa que **estrutura operação para escalar** — aquisição, conversão e operação conectadas por automação, integrações e dados — e não como agência de marketing genérica.

**Próximo passo:** validar visual (azul royal / logos) e implementar MVP.

## Precedência de conteúdo

| Camada | Fonte |
|--------|--------|
| Narrativa, tom, páginas | `SITE 2026/` (esboço do cliente) |
| Diagnóstico do site antigo | `01-analise-site-atual.md` |
| Sitemap, copy, design | `02`, `03`, `05` (este pacote Dechen) |

**Em conflito, o material em `SITE 2026/` prevalece** sobre o discurso do site atual ou sobre versões anteriores deste pack.

> **Nota:** a pasta `SITE 2026/` é mantida e refinada por outro agente. Este pack consolida o que implementação precisa; não duplicar edições desnecessárias lá.

## Contexto do negócio

### Nome

Royal Growth

### Razão social

Royal Growth Marketing Digital LTDA  
CNPJ 40.869.199/0001-03

### Site atual

[https://royalgrowth.com.br/](https://royalgrowth.com.br/)

### Fundador

Maurício Dantas — empreende em marketing digital desde 2010; Royal Growth criada em 2020; virada operacional com automação e IA a partir de 2024. Hoje a estrutura é conduzida com agentes, automações e integrações (operação enxuta).

### O que a Royal entrega

Organiza operações comerciais conectando:

- geração de demanda
- conversão
- continuidade (follow-up / processo)
- automação e padronização
- integração com operação (CRM, ERP, APIs — ex.: RD Station, TOTVS Protheus)
- escala sem aumento proporcional de time

Fora do escopo: ferramenta isolada, marketing genérico, serviços soltos sem lógica de sistema.

### Credencial central

Parceira **RD Station Tier Diamond**, entre as **10 principais operações** do programa (universo com mais de 2.500 empresas).

Credencial silenciosa — reforça profundidade; não define o trabalho sozinha.

### Posicionamento (SITE 2026)

- Escala real = sustentar o que já vende, sem depender de esforço ou time proporcional
- Gargalo costuma estar **dentro da operação**, não no mercado
- Tom maduro, preciso, anti-jargão — sem frases de efeito
- Visual: mais próximo de **infraestrutura tecnológica** do que de agência

### Posicionamento antigo (site atual — a superar)

Tom confrontador (manifesto tipográfico, menta + dark). Mantém-se apenas se o cliente pedir trechos específicos; o esboço 2026 aponta outro caminho.

### Público

Empresas que **já têm demanda e movimento comercial**, mas sentem que crescer exige esforço demais: perda entre marketing e comercial, follow-up manual, processo que varia por pessoa, dados que não sustentam decisão.

Não é o público ideal quem só precisa de mais leads sem operação para absorver.

## Papel estratégico do novo site

O site deve:

- Transmitir **controle, clareza e profundidade operacional**
- Explicar o **Sistema** (fluxo completo), não uma lista de serviços
- Provar com **cases reais** (página Resultados)
- Qualificar leads via **diagnóstico** (formulário de Contato)
- Educar e posicionar via **Conteúdo** (SEO + autoridade)
- Contar a origem em **Sobre** (credibilidade pela trajetória)

Sensação desejada no visitante:

> “Essa empresa não vende marketing. Ela organiza operação.”

## Documentação

```text
clients/
└── 03-Royal-Growth/
    ├── 00-projeto.md
    ├── 01-analise-site-atual.md
    ├── 02-sitemap.md
    ├── 03-copy.md
    ├── 04-assets.md
    ├── 05-design-system.md
    ├── 06-roadmap.md
    ├── SITE 2026/                 ← esboço original do cliente
    └── assets/
        ├── _inbox/
        ├── brand/
        ├── cases/
        └── social-proof/
```

### Implementação

- Repositório do site: `E:\DechenWebStudio\royal-growth` (Git próprio)
- Baseline no Git: pasta `site-atual/` (snapshot do WordPress vigente)
- Stack alvo: Next.js (a scaffoldar) — fora de `showcase/`
- Deploy a definir (VPS / outro)
- Domínio: `royalgrowth.com.br`

Não desenvolver o site real dentro das rotas de `showcase/` da agência.

## Objetivos de negócio

### Objetivo principal

Converter visitantes qualificados em **solicitação de diagnóstico**.

### Objetivos secundários

- Reposicionar a marca (operação / escala, não agência)
- Explicar o sistema de ponta a ponta
- Publicar prova (cases + RD Diamond)
- Gerar autoridade via conteúdo
- Filtrar leads desalinhados no formulário

## Conversão

### Primária

**Solicitar diagnóstico** → página Contato (formulário qualificatório)

### Secundária

CTA **Acessar conteúdos** na página Conteúdo (quando o acervo existir)

### Fluxo pós-envio

1. Leitura do cenário (não proposta automática)
2. Se houver aderência → aprofundar diagnóstico e linha de atuação
3. Se não houver → deixar claro cedo

WhatsApp, e-mail e CRM de destino — **pendentes de asset operacional**.

## Escopo do MVP

### Inclui

- Home
- Sistema
- Resultados (cases do material — com autorização)
- Conteúdo (landing da seção; posts podem ser fase 2 se não houver acervo)
- Sobre
- Contato (form completo)
- SEO técnico, OG, analytics
- Mobile-first
- Design system azul royal (ver `05-design-system.md`)

### Fase 2

- Posts do blog / CMS
- Cases em URLs individuais (se SEO exigir)
- Depoimentos em vídeo
- Landings de campanha

## Tom de voz (obrigatório)

Definido em `SITE 2026/0.0 - REFINO DO TEXTO.md`:

- Linguagem brasileira, natural, madura
- Progressão: observação → entendimento → organização → solução
- Sem jargão de marketing, frases de efeito ou tom de vendedor
- **Não escreva para convencer, escreva para fazer sentido**

## Perguntas restantes (validação curta)

A maior parte do briefing já veio no `SITE 2026`. Resta:

1. Hex / manual oficial do **azul royal** e logos (SVG)
2. Autorização para publicar os **12 cases** com nomes
3. Acervo de **Conteúdo** já existe ou só a página-mãe no MVP?
4. Destino do form (e-mail, CRM, WhatsApp, RD)
5. Prazo e prioridade de go-live

## Princípios de experiência

- Referência de UX: princípios do [n8n.io](https://n8n.io/) (clareza, hierarquia, fluidez) — **sem copiar** o visual
- Progressão: problema → diagnóstico → estrutura → prova → ação
- Hero claro + CTA; uma função por seção
- Cara de produto técnico / infraestrutura, não landing de agência
- Mobile first; sem inventar métricas

## Restrições

- Não inventar cases, números ou depoimentos
- Não publicar case sem autorização
- Não misturar código do cliente com `showcase/` da agência
- Não reintroduzir tom “charlatão / corja” do site antigo, salvo pedido explícito
- Não tratar RD Station como o produto — é credencial e ferramenta dentro do sistema

## Objetivo final

O visitante entende que a Royal **estrutura operação para escala**, vê **prova e método**, e solicita um **diagnóstico** se o cenário dele for o certo — com clareza de empresa técnica, não de agência barulhenta.
