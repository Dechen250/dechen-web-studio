# Processo de Desenvolvimento

**Tipo:** ops · **Status:** ativo · **Versão:** 2.1

Como construímos depois do kickoff. Detalhe comercial da etapa Build: [`systems/sales/05-build.md`](../systems/sales/05-build.md). Entrega: [`06-entrega.md`](../systems/sales/06-entrega.md).

## Pré-requisitos

- Proposta aprovada
- Contrato assinado
- Pagamento inicial confirmado
- Informações e assets mínimos recebidos (ou placeholders explícitos)

## Fluxo

Kickoff → Planejamento → Design → Desenvolvimento → Testes → Aprovação → Entrega

### Kickoff

Pasta do cliente, docs do pack, cronograma, canais de comunicação.

### Planejamento

Objetivos, estrutura, features, prioridades. Docs típicos do pack: `00-projeto`, brand, sitemap, copy, assets, roadmap.

### Design

Seguir brand do **cliente**. Simplicidade, clareza, responsividade, performance, conversão. Aprovar antes de “codar tudo”.

### Desenvolvimento

Stack padrão do monorepo: **Next.js + TypeScript + Tailwind**. Componentizar, SEO básico, formulários com validação server-side quando houver API.

Toda IA no fluxo segue o [DWS AI OS](04-dws-ai-operating-system.md).

### Testes (mínimo)

Responsividade, links, forms, performance, SEO, a11y, browsers principais. Sem publicar sem revisão.

Ambiente de teste da DWS ou preview do próprio projeto. **Site e domínio de cliente em produção só se o responsável pedir com ordem explícita** — ver [DWS AI OS](04-dws-ai-operating-system.md). Não usar cliente para experimentar produto interno.

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
