# Overlay do CRM Core — ingestão

O CRM **não** tem git próprio. Esta pasta é o overlay copiado para `/opt/crm-core`.

A ingestão do site cria **contato + empresa**. O agente BDR está pausado (código fica no overlay para religar depois).

Também neste overlay:

- ficha da negociação no funil de prospecção
- design contemporâneo: cartões 12–16px, botões/chips em pílula, tokens em `app/globals.css`
- `/` redireciona para `/sign-in` (ou o funil, se já autenticado)

Os imports `@/` resolvem **só dentro do CRM**. Não compile esta pasta no Next da DWS.

Depois de copiar as migrations (`0009`–`0011`) e rebuild do compose de produção. Ver [`systems/hosting/01-crm-ingest.md`](../../systems/hosting/01-crm-ingest.md).
