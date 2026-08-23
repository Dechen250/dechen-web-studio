# CRM — ingestão e agente

**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

O agente comercial vive **dentro do CRM** (`crm.dechenwebstudio.com.br`): menu Agente, painel no contato e na empresa. O site da DWS só captura o lead.

O overlay está em [`integrations/crm-core/`](../../integrations/crm-core/) e é copiado para `/opt/crm-core` na VPS. Essa pasta **não entra** no build do site da DWS.

## O que o agente faz no CRM

1. Cria ou atualiza **empresa + contato** (formulário do site ou botão no registro).
2. Lê o HTML do site, quando houver URL.
3. Grava um rascunho de Descoberta em `agent_runs` e no histórico do contato/empresa.
4. Orçamento e prazo ficam `[a confirmar na reunião]`.

Medição PageSpeed só roda se o CRM tiver `PAGESPEED_API_KEY`.

## Contrato de ingestão (site → CRM)

```txt
POST /api/ingest/leads
Authorization: Bearer <CRM_INGEST_SECRET>
```

Resposta inclui `contactId`, `companyId` e `agentRunId`. O rascunho termina em segundo plano.

## Variáveis no CRM

- `CRM_INGEST_SECRET`
- `CRM_INGEST_ORG_ID` — organização Dechen Web Studio
- `CRM_INGEST_OWNER_ID` — dono que recebe o cadastro
- `PAGESPEED_API_KEY` — opcional

## Variáveis no site da DWS

- `CRM_INGEST_URL=http://172.17.0.1:3002/api/ingest/leads`
- `CRM_INGEST_SECRET` — o mesmo do CRM
