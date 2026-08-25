# CRM — ingestão

**Tipo:** ops · **Status:** ativo · **Versão:** 2.1

O site da DWS captura o lead e grava **contato + empresa** no CRM (`crm.dechenwebstudio.com.br`). O agente BDR está pausado.

O overlay está em [`integrations/crm-core/`](../../integrations/crm-core/) e é copiado para `/opt/crm-core` na VPS. Essa pasta **não entra** no build do site da DWS.

## O que a ingestão faz

1. Cria ou atualiza **empresa + contato** (formulário do site).
2. Não dispara o agente BDR (fica para uma fase seguinte).

## Contrato de ingestão (site → CRM)

```txt
POST /api/ingest/leads
Authorization: Bearer <CRM_INGEST_SECRET>
```

Resposta inclui `contactId` e `companyId`.

## Variáveis no CRM

- `CRM_INGEST_SECRET`
- `CRM_INGEST_ORG_ID` — organização Dechen Web Studio
- `CRM_INGEST_OWNER_ID` — dono que recebe o cadastro

## Variáveis no site da DWS

- `CRM_INGEST_URL=http://172.17.0.1:3002/api/ingest/leads`
- `CRM_INGEST_SECRET` — o mesmo do CRM
