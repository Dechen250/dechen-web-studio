# Projeto — Site Renê Bradock

## Objetivo

Criar o site oficial do **Renê Bradock**, profissional de pequenos reparos residenciais e comerciais (marido de aluguel / serviços de acabamento), para gerar confiança, organizar a oferta de serviços e converter visitantes em pedidos de orçamento via WhatsApp.

Este é o primeiro pedido pago da Dechen Web Studio.

---

# Contexto do Negócio

## Nome

Renê Bradock

## Segmento

Serviços de manutenção e acabamento — marido de aluguel.

## Serviços principais

- Elétrica
- Hidráulica
- Móveis
- Serviços de acabamento
- Pequenos reparos residenciais e comerciais

## Posicionamento

Um profissional acessível e confiável que resolve o dia a dia da casa e do comércio: elétrica, hidráulica, móveis e acabamentos, com atendimento próximo em São Paulo e região.

## Público inicial

- Moradores de São Paulo e região que precisam de reparos rápidos
- Proprietários de imóveis e síndicos
- Comércios locais com demandas pontuais
- Pessoas que valorizam confiança, clareza e praticidade no atendimento

## Referência de gosto do cliente

O cliente gostou da estrutura e do tom de [Roma Madeiras](https://romamadeiras.com.br/): hero forte, blocos de confiança, mix claro e contato evidente.

A inspiração é estrutural e de tom — não de conteúdo de madeireira.

---

# Papel Estratégico do Site

O site deve:

- Dar legitimidade profissional ao Renê
- Apresentar os serviços de forma clara
- Facilitar o pedido de orçamento
- Reduzir fricção para o WhatsApp
- Servir como cartão de visitas digital compartilhado

---

# Documentação

Caminho no repositório da agência:

```text
clients/
└── 02-rene-bradock/
    ├── 00-projeto.md
    ├── 01-brand-guide.md
    ├── 02-sitemap.md
    ├── 03-copy.md
    ├── 04-assets.md
    ├── 06-roadmap.md
    └── assets/
        └── brand/
```

## Implementação

O site real deve possuir um repositório próprio, separado do site da agência.

- Projeto Next.js independente em `E:\DechenWebStudio\rene-bradock`
- Deploy independente na Vercel
- Domínio próprio quando entrar no escopo comercial

Não desenvolver o site real dentro das rotas de `showcase/` da agência.

---

# Objetivos de Negócio

## Objetivo principal

Converter visitantes em pedidos de orçamento pelo WhatsApp.

## Objetivos secundários

- Transmitir confiança e profissionalismo
- Deixar claro o que ele faz
- Facilitar o primeiro contato
- Apoiar indicações e compartilhamento

---

# Conversão Principal

## MVP

**Pedir orçamento pelo WhatsApp**

Número: `+55 11 95254-1429`

Link base:

```text
https://wa.me/5511952541429?text=
```

Mensagem sugerida:

```text
Olá, Renê! Vim pelo site e gostaria de um orçamento.
```

## Conversão secundária

Formulário de orçamento na seção de contato, que redireciona ou monta mensagem para o WhatsApp.

---

# Área de Atendimento

São Paulo e região (DDD 11).

---

# Domínio

Sugestão: `renebradock.com.br`

Status: **placeholder** — não incluso no orçamento atual. Deploy inicial via URL da Vercel.

---

# Contatos oficiais

| Canal | Valor |
|-------|--------|
| WhatsApp | +55 11 95254-1429 |
| Área | São Paulo e região |
| Domínio | Placeholder |

---

# Escopo do MVP

Inclui:

- Landing one-page
- Hero com marca e CTAs
- Serviços
- Confiança / diferenciais
- Como funciona
- Contato + WhatsApp
- SEO local básico
- Responsivo mobile-first

Fora do MVP:

- Domínio customizado
- Galeria de obras
- CMS / área admin
- E-mail profissional
