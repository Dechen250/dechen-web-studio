# Processo de Desenvolvimento

**Tipo:** ops · **Status:** ativo · **Versão:** 2.1

Como construímos depois do kickoff. Detalhe comercial da etapa Build: [`systems/sales/05-build.md`](../systems/sales/05-build.md). Entrega: [`06-entrega.md`](../systems/sales/06-entrega.md). Isolamento entre clientes: [`10-isolamento-de-projetos.md`](10-isolamento-de-projetos.md).

## Pré-requisitos

- Proposta aprovada
- Contrato assinado
- Pagamento inicial confirmado
- Informações e assets mínimos recebidos (ou placeholders explícitos)

## Fluxo

Kickoff → Planejamento → Design → Desenvolvimento → Testes → Aprovação → Entrega

### Kickoff

Pack em `dechen-web-studio/clients/`. Repositório **próprio** do site em `E:\DechenWebStudio\<slug>` (Git, `package.json` e deploy só daquele cliente). Cronograma e canais. Não criar app em pasta compartilhada `clientes/` nem dentro do monorepo da agência.

### Planejamento

Objetivos, estrutura, features, prioridades. Docs típicos do pack: `00-projeto`, brand, sitemap, copy, assets, roadmap.

### Design

Seguir brand do **cliente**. Simplicidade, clareza, responsividade, performance, conversão. Aprovar antes de “codar tudo”.

### Desenvolvimento

Stack padrão **do repo daquele cliente**: **Next.js + TypeScript + Tailwind**. Componentizar, SEO básico, formulários com validação server-side quando houver API.

Não importar código de outro cliente. Componentes reutilizáveis valem só dentro daquele repositório.

Toda IA no fluxo segue o [DWS AI OS](04-dws-ai-operating-system.md) e o [isolamento de projetos](10-isolamento-de-projetos.md).

### Testes (mínimo)

Responsividade, links, forms, performance, SEO, a11y, browsers principais. Sem publicar sem revisão.

### Aprovação

Apresentar ao cliente; registrar ajustes; só então deploy.

### Entrega

Deploy (Vercel), domínio/SSL/DNS, testes em produção, treino se necessário, credenciais e docs.

## Ferramentas usuais

Cursor, Git/GitHub, Vercel, Figma (se houver), Supabase/Resend (se houver captação).

## Definition of Done

- Design consistente com o brief
- Código organizado e tipado
- Performance aceitável (meta Lighthouse 95+ em superfícies DWS; em cliente, o melhor possível no prazo)
- UX clara + CTA funcionando
- SEO básico (title, description, headings)
- 100% responsivo no escopo acordado
