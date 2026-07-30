# Roadmap — Barbearia Royal

## Objetivo

Este documento define a evolução planejada do projeto Barbearia Royal.

Ele garante que futuras melhorias respeitem a identidade da marca e mantenham a qualidade do projeto.

---

# Status Atual

## Concluído

- Briefing do projeto

- Brand Guide

- Sitemap

- Copy

- Assets

- Prompts

- Estrutura da documentação (docs pack completo — 7 arquivos)

- Desenvolvimento v1.0 (site shipped)

---

# Versão 1.0

**Status: Concluído**

Objetivo:

Criar uma demonstração completa e profissional de barbearia premium.

### Homepage

- Hero (atmosfera abstrata escura + grain + geométricos dourados)

- Diferenciais (4 cards)

- Serviços (6 cards com preços)

- Experiência (4 etapas)

- Depoimentos (3 blockquotes)

- Galeria / Ambiente (4 imagens)

- Final CTA (agendamento demonstrativo)

- Footer (contato + créditos)

### Funcionalidades

- Navbar fixa com scroll-aware background

- Menu mobile responsivo

- Scroll suave entre âncoras

- Cards de serviços com preços demonstrativos

- Galeria com hover scale e overlay

- Links WhatsApp e Instagram

- Schema.org HairSalon

- Metadata e Open Graph

- Animações fadeInUp

- Suporte a prefers-reduced-motion

- Responsividade completa

### Stack

- Next.js App Router

- Tailwind CSS v4

- Playfair Display + DM Sans (Google Fonts)

- Dados em `src/data/barbearia-royal.ts`

- Componentes em `src/components/barbearia-royal/`

- CSS scoped em `barbearia-royal.css`

- Rota: `/showcase/barbearia-royal`

---

# Versão 1.1

Melhorias de UX

- Refinar microinterações nos cards

- Melhorar animações de entrada (stagger opcional)

- Refinar responsividade em breakpoints intermediários

- Melhorar acessibilidade (skip link, focus trap no menu mobile)

- Revisão de performance (Lighthouse)

- Otimizar carregamento de imagens da galeria

---

# Versão 1.2

Experiência

- Agendamento simulado com feedback visual

- Confirmação elegante pós-clique

- Loader personalizado na transição

- Melhorias nas transições entre seções

- Integração do botão "Agendar" com WhatsApp (link direto com mensagem pré-preenchida)

---

# Versão 2.0

Experiência Premium

- Galeria com lightbox em tela cheia

- Fotos em alta resolução adicionais

- Scroll animations com Intersection Observer

- Parallax sutil no hero (respeitando reduced-motion)

- Seção de barbeiros / equipe

- Vídeo curto de ambiente (opcional, não no hero)

---

# Versão 3.0

Projeto Completo

- Agendamento integrado (calendário real)

- Google Maps embed

- Avaliações de clientes reais

- Blog / dicas de grooming

- Pacotes sazonais (Dia dos Pais, formaturas)

- Multi-idioma (PT/EN)

---

# Melhorias Futuras

## Hero

Manter atmosfera abstrata.

Opcional: animação sutil nos círculos geométricos dourados.

Nunca substituir por foto hero.

---

## Serviços

Adicionar filtros por categoria (corte, barba, pacotes).

Destaque visual para "Dia do noivo".

---

## Galeria

Lightbox em tela cheia.

Mais fotos de ambiente (produtos, detalhes, recepção).

Lazy loading otimizado.

---

## Agendamento

Integração com calendário (Calendly, Google Calendar ou similar).

Confirmação automática por WhatsApp.

Formulário com validação.

---

## Performance

Nota acima de 95 no Lighthouse.

Core Web Vitals verdes.

---

## SEO

Otimização completa.

Schema.org HairSalon expandido (openingHours, geo).

Open Graph com imagem de preview.

Meta Tags completas.

Sitemap XML.

---

# Critérios de Qualidade

Antes de considerar uma versão concluída:

- Responsividade perfeita

- Performance acima de 90 (ideal 95+)

- SEO configurado

- Código organizado

- Componentes reutilizáveis

- Experiência premium

- Animações suaves

- Tema escuro consistente

- Sem bugs conhecidos

- Documentação atualizada

---

# Objetivo Final

O projeto Barbearia Royal deve parecer um site desenvolvido para uma barbearia real de alto padrão.

Ele deve servir como demonstração oficial da qualidade da Dechen Web Studio no segmento de beleza masculina premium e convencer futuros clientes de que somos capazes de desenvolver experiências digitais completas, sofisticadas e profissionais.

A identidade escura e dourada, o hero atmosférico e a copy de precisão e respeito devem permanecer intactos em todas as evoluções futuras.
