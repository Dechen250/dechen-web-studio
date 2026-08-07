# API — Sistema de Captação

**Tipo:** API · **Status:** ativo · **Versão:** 2.0

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
Cliente → Formulário → Validação frontend → POST /api/contact → Validação API → Supabase → Resend → Resposta ao usuário
```

## Payload

```json
{
  "nome": "",
  "empresa": "",
  "email": "",
  "whatsapp": "",
  "servico": "",
  "objetivo": "",
  "prazo": "",
  "orcamento": "",
  "mensagem": ""
}
```

## Validações

### Campos obrigatórios

- Nome
- E-mail
- WhatsApp
- Serviço
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

Após validação, criar registro na tabela `leads`:

| Campo | Valor inicial |
|-------|---------------|
| `status` | `novo` |
| `origem` | `website` |

Ver schema completo em [02-banco.md](./02-banco.md).

## E-mail

Após salvar, enviar notificação para `contato@dechenwebstudio.com.br` via Resend com todas as informações do lead. Detalhes em [04-email.md](./04-email.md).

## Segurança

- Validar todos os dados no servidor
- Impedir campos vazios
- Limitar tamanho das mensagens
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
