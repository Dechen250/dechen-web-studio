# Ingestão de leads no CRM

**Tipo:** ops · **Status:** ativo · **Versão:** 1.0

O agente do site da DWS grava no CRM Core (`crm.dechenwebstudio.com.br`) um **contato** e uma **empresa** por lead.

O código do endpoint vive em [`integrations/crm-core/`](../../integrations/crm-core/) e é copiado para `/opt/crm-core` na VPS.

## Contrato

```txt
POST /api/ingest/leads
Authorization: Bearer <CRM_INGEST_SECRET>
```

Cria a empresa se o nome (ou o site) ainda não existir. Cria o contato se e-mail ou WhatsApp for novo; se já existir, atualiza e liga à empresa.

Origem: `website` (formulário) ou `ops-descoberta` (console).

## Variáveis no CRM

- `CRM_INGEST_SECRET`
- `CRM_INGEST_ORG_ID` — organização Dechen Web Studio
- `CRM_INGEST_OWNER_ID` — dono que recebe o cadastro
