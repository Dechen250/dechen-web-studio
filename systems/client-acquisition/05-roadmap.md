# Roadmap — Sistema de Captação

**Tipo:** Roadmap · **Status:** ativo · **Versão:** 2.0

## Objetivo

Definir a evolução planejada do Sistema de Captação de Leads. Crescimento gradual, com estabilidade e escalabilidade.

Documentação relacionada: [00-visao.md](./00-visao.md) · [Roadmap Comercial](../sales/08-roadmap.md)

## Status atual

### Em operação agora

- Formulário da homepage
- `POST /api/contact` com validação, honeypot e rate limit
- Persistência em `data/ops/leads/`
- Fila: auditoria PageSpeed + rascunho de Descoberta quando há URL
- WhatsApp como canal de resposta imediata

### Ainda no desenho

- Banco de dados (Supabase)
- Notificação por e-mail (Resend)

## Versão 1.0

**Objetivo:** Receber leads de forma confiável.

**Implementar:**

- Formulário funcional
- API (`POST /api/contact`)
- Banco de dados (Supabase)
- Notificação por e-mail (Resend)
- Validação de campos
- Mensagem de sucesso

**Resultado:** Nenhum lead perdido.

## Versão 1.1

**Melhorias:**

- Loading elegante
- Melhor feedback visual
- Tratamento de erros
- Melhor responsividade
- Melhor acessibilidade

## Versão 1.2

**Segurança:**

- Rate limit
- Proteção contra spam
- Honeypot
- Validações avançadas
- Logs

## Versão 2.0

**CRM inicial:**

- Dashboard administrativo
- Lista de leads
- Pesquisa e filtros
- Alteração de status
- Histórico

**Status disponíveis:** Novo · Contatado · Reunião Marcada · Proposta Enviada · Fechado · Perdido

## Versão 2.5

**Produtividade:**

- Observações internas
- Responsável pelo lead
- Prioridade
- Upload de arquivos
- Histórico de interações

## Versão 3.0

**Automações:**

- Resposta automática
- Follow-up automático
- Lembretes
- Notificações internas
- Agendamento de reuniões

## Versão 4.0

**CRM completo:**

- Pipeline comercial
- Dashboard com métricas
- Conversão por origem
- Receita prevista e fechada
- Tempo médio de fechamento

## Integrações futuras

WhatsApp · Google Calendar · Google Meet · Notion · Slack · Discord · RD Station · Meta Pixel · Google Analytics

## Métricas

- Leads por mês
- Conversão
- Origem dos leads
- Serviços mais solicitados
- Tempo de resposta
- Taxa de fechamento
- Ticket médio

## Objetivo final

Transformar captação em CRM próprio da Dechen Web Studio. Toda a jornada — do primeiro contato à entrega — em um ecossistema integrado com o [Sistema Comercial](../sales/00-visao.md), reduzindo tarefas manuais e fornecendo dados estratégicos.
