# Times de Agentes

**Tipo:** estratégia · **Status:** ativo · **Versão:** 1.5

Organograma da IA na Dechen Web Studio. Runtime no **CRM Core** (`/app/agent`). Este chat no Cursor é despachante: um papel por tarefa.

Princípio: **AI-First, Human-Led.** Preço, outreach enviado, contrato e publicar **site** são humanos. Exceção: Instagram da marca DWS (@Maya) quando a Graph API estiver ligada.

## Os quatro times

- **Marketing** — Clara, Maya, Helena, Theo, Nina (marca DWS → Visitante)
- **Comercial** — Rafael, Sofia, Bruno, Lia (Visitante → Proposta)
- **Entrega** — Caio, Alice, Miguel, Beatriz, Vera
- **Ops** — Otto, Noa

Detalhe de faz / não faz: `crm-core/features/agent/catalog.ts` e `crm-core/docs/14-agentes-dws.md`.
