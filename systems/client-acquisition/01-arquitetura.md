# Arquitetura — Sistema de Captação

**Tipo:** Arquitetura · **Status:** ativo · **Versão:** 2.0

## Objetivo

Definir o funcionamento técnico da captação de leads da Dechen Web Studio.

Documentação relacionada: [00-visao.md](./00-visao.md) · [02-banco.md](./02-banco.md) · [03-api.md](./03-api.md) · [04-email.md](./04-email.md)

## Fluxo principal

1. Visitante preenche o formulário no site
2. Frontend valida os campos
3. Frontend envia dados para a API
4. API valida novamente (nunca confiar só no frontend)
5. API salva o lead no Supabase
6. API dispara notificação via Resend
7. Usuário recebe mensagem de sucesso

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Formulário de contato (site) |
| API | `POST /api/contact` |
| Banco | Supabase (PostgreSQL) |
| E-mail | Resend |
| Destino | contato@dechenwebstudio.com.br |

## Diagrama

```txt
Homepage
   ↓
Contact Form
   ↓
/api/contact
   ↓
Supabase
   ↓
Resend
   ↓
contato@dechenwebstudio.com.br
```

## Responsabilidades por camada

### Frontend

- Validação inicial de campos obrigatórios
- Envio do payload para `POST /api/contact`
- Feedback visual (sucesso/erro)
- Nunca expor chaves de API

### API

- Validação server-side
- Persistência na tabela `leads` (status `novo`, origem `website`)
- Disparo de e-mail via Resend
- Respostas padronizadas (200, 400, 500)

### Supabase

- Armazenamento persistente de leads
- Base para evolução do CRM ([02-banco.md](./02-banco.md))

### Resend

- Entrega imediata de notificação à equipe ([04-email.md](./04-email.md))

## Escalabilidade

A API é o núcleo do sistema. Novas integrações (CRM, RD Station, Notion, Slack, WhatsApp, Google Calendar) devem ser adicionadas no backend, sem alterar o frontend.

## Princípio

Garantir que nenhum lead seja perdido, mantendo integridade dos dados e permitindo evolução sem mudanças estruturais.
