# Patch do CRM Core — ingestão de leads

Arquivos para copiar em `/opt/crm-core` (o CRM **não** está neste git).

- `app/api/ingest/leads/route.ts` → `/opt/crm-core/app/api/ingest/leads/route.ts`
- `features/ingest/site-lead.ts` → `/opt/crm-core/features/ingest/site-lead.ts`

Os imports `@/` resolvem **só dentro do CRM**. Não compile esta pasta no Next da DWS.

Depois de copiar: rebuild do compose de produção do CRM. Ver [`systems/hosting/01-crm-ingest.md`](../../systems/hosting/01-crm-ingest.md).
