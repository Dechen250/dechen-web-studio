**Tipo:** ops · **Status:** ativo · **Versão:** 3.0

> Estrutura de navegação fictícia — âncoras e jornada orientadas à reserva demonstrativa.

# Divina Cozinha — Sitemap

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md)

## Objetivo

Navegação intuitiva que conduz o visitante à reserva em poucos cliques. Cardápio e ambiente reforçam desejo; reservas convertem.

## Estrutura geral

```
Home
├── Hero bento
├── Marquee
├── Cardápio (#cardapio)
├── Sobre (#sobre)
├── Sabores da casa
├── Ambiente (#ambiente)
├── Ofertas
├── Depoimentos
├── Reservas (#reservas)
├── Localização (#localizacao)
└── Footer
```

## Navbar

**Logo:** Divina Cozinha

| Link | Âncora |
|------|--------|
| Cardápio | `#cardapio` |
| Sobre | `#sobre` |
| Ambiente | `#ambiente` |
| Local | `#localizacao` |

**CTA:** Reservar → `#reservas`

Navbar flutuante (pill glass, `top-6`). Mobile: hamburger, links empilhados com ícones.

## Seções

### Hero

| Elemento | Conteúdo |
|----------|----------|
| Badge | Escolha do Chef |
| Headline | Mais do que uma *refeição* |
| Subheadline | Ingredientes selecionados, ambiente acolhedor e alta gastronomia |
| Visual | Bento: prato principal + sazonal + carta de vinhos |

### Sobre — `#sobre`

**Título:** Uma paixão pela gastronomia.

História da marca, filosofia, ingredientes, experiência gastronômica.

### Cardápio — `#cardapio`

**Título:** Sabores preparados para surpreender.

4 categorias em cards 3:4. Navegação por pills e setas. Sem virada de página.

| Categoria | Itens |
|-----------|-------|
| Entradas | 3 pratos |
| Pratos Principais | 3 pratos |
| Sobremesas | 3 pratos |
| Bebidas | 3 itens |

Preços **demonstrativos** — ver [03-copy.md](03-copy.md). Fotos via Unsplash (fallback editorial).

### Ambiente — `#ambiente`

**Título:** Um ambiente pensado para receber você.

6 imagens: salão, mesas, cozinha aberta, iluminação, decoração, adega.

Caminho: `public/showcase/divina-cozinha/ambiente/`

### Reservas — `#reservas`

**Título:** Reserve sua mesa.

Formulário **demonstrativo** — campos: nome, pessoas, data, horário, telefone.

Confirmação simulada após submit (sem envio real). Nota legal em [03-copy.md](03-copy.md).

### Localização — `#localizacao`

**Título:** Esperamos por você.

Endereço, horários, telefone, WhatsApp, Google Maps embed.

### Footer

Logo · tagline · Instagram · WhatsApp · telefone · endereço · copyright · link "Showcase por Dechen Web Studio" → `/#projetos`

## Contato (referência)

| Canal | Valor |
|-------|-------|
| Telefone | (11) 3456-7890 |
| WhatsApp | wa.me/551134567890 |
| E-mail | reservas@divinacozinha.com.br |
| Instagram | instagram.com/divinacozinha |
| Endereço | Rua das Oliveiras, 128 — Jardins, São Paulo — SP |
| CEP | 01415-000 |

**Horários:** Ter–Qui 12h–15h/19h–23h · Sex–Sáb 12h–00h · Dom 12h–17h · Seg fechado.

## Jornada do usuário

Hero → Sobre → Cardápio → Ambiente → Reservas → Localização

## Prioridade da informação

1. Hero
2. Cardápio
3. Reservas
4. Ambiente
5. Sobre
6. Localização

Scroll suave entre âncoras. Navbar acessível em qualquer ponto.
