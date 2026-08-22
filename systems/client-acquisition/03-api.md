# API — Sistema de Captação

**Tipo:** API · **Status:** ativo · **Versão:** 2.1

## Objetivo

Definir o endpoint que recebe, valida e processa leads do formulário do site.

Documentação relacionada: [01-arquitetura.md](./01-arquitetura.md) · [02-banco.md](./02-banco.md) · [04-email.md](./04-email.md)

## Endpoint

```txt
POST /api/contact
```

Responsável por todos os envios do formulário de contato.

## Fluxo

```
Cliente → Formulário → Validação frontend → POST /api/contact → Validação API → arquivo em data/ops → fila (auditoria + Descoberta) → Resposta → WhatsApp
```

Supabase e Resend entram quando a captação 1.0 completa for ligada. Enquanto isso o lead não se perde: grava no servidor e a pessoa segue no WhatsApp.

## Payload

```json
{
  "nome": "",
  "negocio": "",
  "email": "",
  "whatsapp": "",
  "website": "",
  "mensagem": ""
}
```

`website` é opcional. Se vier preenchido, a API enfileira auditoria PageSpeed e rascunho de Descoberta. `negocio` cobre o campo "tipo de negócio" / serviço.

## Validações

### Campos obrigatórios

- Nome
- E-mail
- WhatsApp
- Tipo de negócio
- Mensagem

### Regras

- E-mail válido
- WhatsApp válido
- Nome não vazio
- Mensagem não vazia
- Limite máximo de caracteres

## Respostas

### Sucesso — `200 OK`

```json
{
  "success": true,
  "message": "Solicitação enviada com sucesso."
}
```

### Erro de validação — `400 Bad Request`

```json
{
  "success": false,
  "message": "Dados inválidos."
}
```

### Erro interno — `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Ocorreu um erro interno."
}
```

## Persistência

Após validação, criar registro do lead (`status` implícito `novo`, origem `website`). Hoje: arquivo JSON em `data/ops/leads/`. Destino planejado: tabela `leads` no Supabase, ver [02-banco.md](./02-banco.md).

## E-mail

Após salvar, enviar notificação para `contato@dechenwebstudio.com.br` via Resend com todas as informações do lead. Detalhes em [04-email.md](./04-email.md).

## Segurança

- Validar todos os dados no servidor
- Impedir campos vazios
- Limitar tamanho das mensagens
- Rate limit por IP
- Honeypot silencioso
- Registrar erros de forma segura

### Futuro

- Rate limit
- CAPTCHA
- Proteção contra bots
- Logs e monitoramento

## Escalabilidade

Integrações futuras (CRM, RD Station, Notion, Slack, Discord, WhatsApp, Google Calendar) no backend, sem alterar o frontend.

## Princípio

A API garante que nenhum lead seja perdido e mantém integridade dos dados para evolução da plataforma.
