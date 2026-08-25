# Overlay do CRM Core — agente + ingestão

O CRM **não** tem git próprio. Esta pasta é o overlay copiado para `/opt/crm-core`.

O agente comercial (Descoberta + leitura do site) é **função do CRM**, não um produto ao lado. Aparece em:

- `/app/agent` — histórico e botão de rodar
- contato e empresa — painel **Agente**
- ingestão do site — cria contato/empresa e dispara o agente
- extração de e-mail, telefone e WhatsApp públicos do HTML → Contatos + negociação no funil

Os imports `@/` resolvem **só dentro do CRM**. Não compile esta pasta no Next da DWS.

Depois de copiar: `0009_agent_runs.sql` e `0010_agent_findings.sql` (migrate) e rebuild do compose de produção. Ver [`systems/hosting/01-crm-ingest.md`](../../systems/hosting/01-crm-ingest.md).
