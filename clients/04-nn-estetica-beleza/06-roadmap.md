# Roadmap — NN Estética e Beleza

**Tipo:** roadmap · **Status:** lead / planejamento · **Versão:** 0.1

Pack: [00-projeto.md](00-projeto.md) · [01-analise-presenca-digital.md](01-analise-presenca-digital.md) · [07-descoberta.md](07-descoberta.md)

## Objetivo

Ordenar o trabalho da DWS do lead até o site no ar, sem pular descoberta nem inventar fato comercial.

## Status da documentação

- [x] [00-projeto.md](00-projeto.md) — brief e diagnóstico inicial
- [x] [01-analise-presenca-digital.md](01-analise-presenca-digital.md)
- [x] [02-sitemap.md](02-sitemap.md) — estrutura proposta
- [x] [03-copy.md](03-copy.md) — rascunho
- [x] [04-assets.md](04-assets.md) — lista de pedidos
- [x] [05-brand-guide.md](05-brand-guide.md) — hipótese visual
- [x] [07-descoberta.md](07-descoberta.md) — roteiro da reunião
- [ ] Logo e dados operacionais da lead
- [ ] Proposta comercial (depois da descoberta)

---

## Fase 0 — Agora (planejamento)

**Meta:** pack utilizável internamente e na conversa com a lead.

Entregue neste PR:

- Diagnóstico da presença (Instagram-only, ruído com NN Liso Perfeito)
- Sitemap one-page
- Copy rascunho com placeholders
- Hipótese de marca
- Roteiro de descoberta

Critério de saída: a DWS consegue explicar o projeto em uma reunião sem improvisar estrutura.

---

## Fase 1 — Descoberta

**Meta:** preencher o que o Instagram não diz.

- Reunião com o roteiro de [07-descoberta.md](07-descoberta.md)
- Confirmar ou descartar vínculo com NN Liso Perfeito e com Dra. Tayná
- Recolher conselhos, endereço, WhatsApp, lista de procedimentos
- Pedir assets (logo, fotos)

Critério de saída: diagnóstico validado; placeholders críticos resolvidos ou explicitamente adiados.

---

## Fase 2 — Diagnóstico fechado + proposta

**Meta:** escopo e investimento alinhados.

- Confirmar one-page vs. páginas extras
- Fora de escopo por escrito (booking, blog, e-commerce)
- Cronograma de build
- **Não** nesta fase: código de produção

Critério de saída: proposta enviada (doc de [sales/04-proposta](../../systems/sales/04-proposta.md)).

---

## Fase 3 — MVP (só com contrato)

**Meta:** homepage no ar que agenda pelo WhatsApp.

| Seção | Entrega |
|-------|---------|
| Hero | Full-bleed, marca, CTA |
| Tratamentos | Três pilares (+ lista extra se confirmada) |
| Sobre | Profissionais com registro |
| Como funciona | Três passos |
| Espaço | Só com fotos reais |
| FAQ | Respostas aprovadas |
| Local | NAP confirmado + mapa |
| Footer | Aviso clínico + Instagram |

Stack: Next.js no **repositório próprio**, não em `showcase/`. Deploy VPS/Docker salvo decisão na proposta. Domínio `[confirmar]`.

Critério de saída: no celular, a visitante entende a oferta e abre o WhatsApp em menos de um minuto. Lighthouse o melhor possível no prazo. Zero dado fictício.

---

## Fase 4 — SEO local e Google

- Perfil da Empresa alinhado ao site
- Schema LocalBusiness quando o endereço estiver estável
- OG testado no compartilhamento do Instagram
- Analytics

---

## Fase 5 — Evolução (opcional)

- Página por tratamento se a busca justificar
- Antes/depois com termo
- FAQ expandido
- Integração de agenda só se o WhatsApp virar gargalo
- Privacidade / termos com CNPJ

---

## Fora do horizonte próximo

- App
- E-commerce de dermocosméticos
- Prontuário
- Tráfego pago (pode ser projeto separado; o site só precisa estar pronto para receber)

## Critérios de qualidade (todas as fases)

- Hero full-bleed; marca primeiro; sem cards no hero
- Uma função por seção
- Copy fiel ao que a lead aprovar
- Limites clínicos intactos
- Marca da clínica ≠ salão de cabelo, salvo confirmação
