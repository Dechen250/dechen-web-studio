# Sistema de E-mail — Sistema de Captação

## Objetivo

Definir o funcionamento do sistema de envio e recebimento de e-mails da Dechen Web Studio.

Todo lead enviado pelo formulário deve gerar uma notificação imediata para a equipe da agência.

O sistema deve ser confiável, rápido e preparado para futuras automações.

---

# Serviço

Serviço recomendado

Resend

Motivos

- Excelente integração com Next.js

- API moderna

- Alta confiabilidade

- Fácil manutenção

- Boa documentação

---

# E-mail Oficial

Principal

[contato@dechenwebstudio.com.br](mailto:contato@dechenwebstudio.com.br)

Futuro

[comercial@dechenwebstudio.com.br](mailto:comercial@dechenwebstudio.com.br)

[suporte@dechenwebstudio.com.br](mailto:suporte@dechenwebstudio.com.br)

[financeiro@dechenwebstudio.com.br](mailto:financeiro@dechenwebstudio.com.br)

---

# Fluxo

Cliente

↓

Envia formulário

↓

API recebe os dados

↓

Banco de dados

↓

Resend

↓

E-mail da agência

↓

Equipe recebe a notificação

---

# Conteúdo do E-mail

Assunto

Novo Lead — Dechen Web Studio

---

Informações

Nome

Empresa

E-mail

WhatsApp

Serviço

Objetivo

Prazo

Orçamento

Mensagem

Data

Origem

---

# Prioridade

Todos os leads devem ser enviados imediatamente.

O atraso máximo aceitável é de poucos segundos.

---

# Confirmação ao Cliente

Versão Inicial

Não enviar confirmação automática.

Versão Futura

Enviar um e-mail de confirmação agradecendo pelo contato.

Exemplo

Assunto

Recebemos sua solicitação.

Mensagem

Olá!

Recebemos sua solicitação de orçamento.

Nossa equipe analisará seu projeto e entrará em contato o mais breve possível.

Obrigado por escolher a Dechen Web Studio.

---

# Templates

Futuramente criar templates para:

- Novo Lead

- Confirmação de Recebimento

- Agendamento de Reunião

- Envio de Proposta

- Aprovação do Projeto

- Boas-vindas ao Cliente

---

# Segurança

Nunca expor chaves da API no frontend.

Todo envio deve acontecer através da API:

POST /api/contact

---

# Logs

Registrar:

- Data

- Hora

- Destinatário

- Status do envio

Em caso de falha:

Registrar o erro e permitir nova tentativa.

---

# Escalabilidade

O sistema deve permitir futuras integrações com:

- CRM próprio

- RD Station

- Slack

- Discord

- WhatsApp

- Google Calendar

Sem alterar a estrutura do frontend.

---

# Objetivo Final

Criar um sistema de comunicação confiável, profissional e escalável, garantindo que cada novo lead seja entregue rapidamente à equipe da Dechen Web Studio e preparando a infraestrutura para futuras automações comerciais.