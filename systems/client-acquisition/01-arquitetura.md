# Arquitetura — Sistema de Captação

## Objetivo

Definir como o sistema de captação de leads da Dechen Web Studio funciona tecnicamente.

---

# Fluxo Principal

Visitante preenche o formulário no site.

↓

Frontend valida os campos.

↓

Frontend envia os dados para a API.

↓

API valida os dados novamente.

↓

API salva o lead no banco de dados.

↓

API envia uma notificação para o e-mail da empresa.

↓

Usuário recebe mensagem de sucesso.

---

# Arquitetura

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

[contato@dechenwebstudio.com.br](mailto:contato@dechenwebstudio.com.br)