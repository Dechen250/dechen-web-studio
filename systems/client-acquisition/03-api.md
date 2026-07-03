# API — Sistema de Captação

## Objetivo

Definir o funcionamento da API responsável por receber, validar e processar todos os leads enviados pelo formulário da Dechen Web Studio.

A API deve ser segura, organizada e preparada para crescimento.

---

# Endpoint

```txt

POST /api/contact

```

Este endpoint será responsável por receber todos os formulários enviados pelo site.

---

# Fluxo

Cliente

↓

Preenche formulário

↓

Frontend valida os dados

↓

POST /api/contact

↓

API valida novamente

↓

Salva no banco de dados

↓

Envia e-mail para a agência

↓

Retorna sucesso ao usuário

---

# Payload

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

---

# Validações

Campos obrigatórios:

- Nome

- Email

- WhatsApp

- Serviço

- Mensagem

Validações:

- Email válido

- WhatsApp válido

- Nome não vazio

- Mensagem não vazia

- Limite máximo de caracteres

---

# Resposta de Sucesso

Status

```txt

200 OK

```

Exemplo

```json

{

  "success": true,

  "message": "Solicitação enviada com sucesso."

}

```

---

# Resposta de Erro

Status

```txt

400 Bad Request

```

Exemplo

```json

{

  "success": false,

  "message": "Dados inválidos."

}

```

---

# Resposta de Erro Interno

Status

```txt

500 Internal Server Error

```

Exemplo

```json

{

  "success": false,

  "message": "Ocorreu um erro interno."

}

```

---

# Segurança

A API deve:

- validar todos os dados recebidos;

- nunca confiar apenas na validação do frontend;

- impedir campos vazios;

- limitar tamanho das mensagens;

- registrar erros de forma segura.

Futuramente implementar:

- Rate Limit

- CAPTCHA

- Proteção contra bots

- Logs

- Monitoramento

---

# Banco de Dados

Após validar os dados, a API deve criar um novo registro na tabela:

```txt

leads

```

Status inicial:

```txt

novo

```

Origem:

```txt

website

```

---

# Integração com E-mail

Após salvar o lead no banco:

Enviar uma cópia para:

```txt

[contato@dechenwebstudio.com.br](mailto:contato@dechenwebstudio.com.br)

```

O e-mail deve conter todas as informações enviadas pelo cliente.

---

# Escalabilidade

A API deve ser construída para permitir futuras integrações com:

- CRM próprio

- RD Station

- Notion

- Slack

- Discord

- WhatsApp

- Google Calendar

Sem necessidade de alterar o frontend.

---

# Princípio

A API é o núcleo do sistema de captação.

Ela deve garantir que nenhum lead seja perdido, mantendo a integridade dos dados e permitindo a evolução da plataforma sem mudanças estruturais.