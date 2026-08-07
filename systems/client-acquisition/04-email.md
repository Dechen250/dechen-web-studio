# Sistema de E-mail — Sistema de Captação

**Tipo:** E-mail · **Status:** ativo · **Versão:** 2.0

## Objetivo

Definir envio e recebimento de notificações de leads. Todo formulário enviado gera alerta imediato à equipe.

Documentação relacionada: [03-api.md](./03-api.md) · [01-arquitetura.md](./01-arquitetura.md)

## Serviço

| Item | Valor |
|------|-------|
| Provedor | Resend |
| Motivos | Integração Next.js, API moderna, confiabilidade, manutenção simples |

## Endereços

| Tipo | E-mail |
|------|--------|
| Principal (notificações) | contato@dechenwebstudio.com.br |
| Futuro — comercial | comercial@dechenwebstudio.com.br |
| Futuro — suporte | suporte@dechenwebstudio.com.br |
| Futuro — financeiro | financeiro@dechenwebstudio.com.br |

## Fluxo

```
Cliente → Formulário → POST /api/contact → Supabase → Resend → contato@dechenwebstudio.com.br → Equipe
```

## Notificação de novo lead

### Assunto

```txt
Novo Lead — Dechen Web Studio
```

### Corpo (campos incluídos)

- Nome
- Empresa
- E-mail
- WhatsApp
- Serviço
- Objetivo
- Prazo
- Orçamento
- Mensagem
- Data
- Origem

## SLA

Todos os leads enviados imediatamente. Atraso máximo aceitável: poucos segundos.

## Confirmação ao cliente

| Versão | Comportamento |
|--------|---------------|
| Inicial | Sem confirmação automática |
| Futura | E-mail de agradecimento |

### Exemplo futuro

**Assunto:** Recebemos sua solicitação.

**Mensagem:**

> Olá!
>
> Recebemos sua solicitação de orçamento. Nossa equipe analisará seu projeto e entrará em contato o mais breve possível.
>
> Obrigado por escolher a Dechen Web Studio.

## Templates futuros

- Novo Lead
- Confirmação de Recebimento
- Agendamento de Reunião
- Envio de Proposta
- Aprovação do Projeto
- Boas-vindas ao Cliente

## Segurança

- Nunca expor chaves da API no frontend
- Todo envio via `POST /api/contact`

## Logs

Registrar data, hora, destinatário e status do envio. Em falha: registrar erro e permitir nova tentativa.

## Escalabilidade

Integrações futuras: CRM, RD Station, Slack, Discord, WhatsApp, Google Calendar — sem alterar o frontend.

## Objetivo

Comunicação confiável e escalável: cada lead entregue rapidamente à equipe, com infraestrutura pronta para automações comerciais ([05-roadmap.md](./05-roadmap.md)).
