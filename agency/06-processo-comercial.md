# Processo Comercial

**Tipo:** estratégia · **Status:** ativo · **Versão:** 2.0

Visão executiva do comercial DWS. Detalhamento por etapa: [`systems/sales/`](../systems/sales/00-visao.md).

## Princípio

Não vender rápido. Compreender o negócio e construir a melhor solução. Fechamento é consequência de processo bom.

## Jornada canônica (10 etapas)

1. **Visitante** — conhece a DWS (Google, Instagram, indicação, portfólio…)
2. **Lead** — demonstra interesse (form, WhatsApp, e-mail…) → registro no sistema
3. **Descoberta** — escuta profunda ([doc](../systems/sales/02-descoberta.md)) — sem apresentar solução ainda
4. **Diagnóstico** — define o problema e o escopo recomendado ([doc](../systems/sales/03-diagnostico.md))
5. **Proposta** — objetivos, escopo, cronograma, investimento, próximos passos ([doc](../systems/sales/04-proposta.md))
6. **Cliente** — contrato, pagamento inicial, kickoff
7. **Build** — planejamento → design → dev → testes → aprovação ([doc](../systems/sales/05-build.md))
8. **Entrega** — deploy, treino, handoff ([doc](../systems/sales/06-entrega.md))
9. **Pós-venda** — suporte na garantia, feedback, oportunidades ([doc](../systems/sales/07-pos-venda.md))
10. **Cliente recorrente** — novos projetos, manutenção, indicação

## Integração com captação

Leads do site entram via formulário → `POST /api/contact` → Supabase → e-mail `contato@dechenwebstudio.com.br`. Ver [`systems/client-acquisition/`](../systems/client-acquisition/00-visao.md).

## KPIs (acompanhar)

Leads, taxa de conversão, tempo de resposta, tempo até proposta, tempo de fechamento, ticket médio, projetos entregues, clientes recorrentes, indicações.

## Roadmap comercial

Ver [08-roadmap do sales](../systems/sales/08-roadmap.md) e [Roadmap da agência](09-roadmap.md).
