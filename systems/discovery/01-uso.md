# Uso — Preparador de Descoberta

**Tipo:** Guia de uso · **Status:** ativo · **Versão:** 1.0

Visão do sistema: [00-visao.md](./00-visao.md)

## Console web

1. `npm run dev`
2. Abra http://localhost:3000/ops/discovery
3. Preencha nome, e-mail, WhatsApp, empresa e, se existir, o site
4. Aperte **Gerar rascunho**

Em produção o console pede a senha de `OPS_SECRET`. Os packs ficam em `data/ops/discovery/` no servidor e não entram no Git.

## CLI

```bash
npm run discovery -- --name "Maria" --email maria@exemplo.com --whatsapp 11999999999 --company "Exemplo" --website dechenwebstudio.com.br
```

`--out arquivo.md` grava o Markdown. Sem `--out`, o rascunho vai para o stdout.

## Campos obrigatórios da CLI

`--name` · `--email` · `--whatsapp` · `--company`

Opcionais: `--role` · `--segment` · `--message` · `--website`

## Regras de preenchimento

| Campo | Como preenche |
|-------|----------------|
| Nome, empresa, e-mail, WhatsApp | Copia do lead |
| Cargo, público, concorrência, escopo | `[a confirmar na reunião]` se o lead não escreveu |
| Objetivos / problemas | Só uma frase do formulário se ela for explícita; senão, a confirmar |
| Prazo e orçamento | Sempre `[a confirmar na reunião]` |
| Situação atual do site | Título, description, H1, contato e medição observados no HTML |

## Ligação com o formulário público

O formulário da homepage envia `POST /api/contact`. O WhatsApp continua abrindo para a pessoa. Nos bastidores o lead é gravado; se houver URL, a auditoria PageSpeed e o rascunho de Descoberta entram na fila.

Supabase e Resend continuam no desenho de [Captação](../client-acquisition/00-visao.md). Até lá a persistência é arquivo local em `data/ops/`.
