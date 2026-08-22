# Hospedagem — Site da DWS na VPS

**Tipo:** ops · **Status:** ativo · **Versão:** 1.0

O site institucional, o console `/ops` e os agentes (auditoria com Chrome, Descoberta, fila do formulário) rodam **na VPS da agência**, não na Vercel.

A Vercel não executa Chrome nem guarda `data/ops` entre deploys. Na VPS os dois existem.

## Isolamento

Esta stack é só de `dechenwebstudio.com.br`. Compose, Nginx e certificado **não se misturam** com site de cliente. Cliente tem pack em `clients/` e, quando for o caso, compose próprio.

## O que sobe

| Peça | Função |
|------|--------|
| `Dockerfile` | Next.js em produção + Chromium para o Lighthouse |
| `docker-compose.yml` | Processo com restart, volume de leads/jobs, porta só em `127.0.0.1:3000` |
| `deploy/nginx.dechenwebstudio.conf` | HTTPS na frente do container |

## Variáveis (`.env` na VPS)

Copie [`.env.example`](../../.env.example). Obrigatórias em produção:

- `OPS_SECRET` — senha do `/ops` (mínimo 8 caracteres)
- `SITE_AUDIT_ENABLED=1` — liga o Chrome no console

Opcionais: `PAGESPEED_API_KEY` (auditoria pública `/auditoria`).

CRM interno (`crm.dechenwebstudio.com.br`, porta 3002):

- `CRM_INGEST_URL=http://172.17.0.1:3002/api/ingest/leads`
- `CRM_INGEST_SECRET` — o mesmo segredo do CRM

Cada lead do formulário ou da Descoberta cria ou atualiza **empresa + contato** no CRM. Se o CRM estiver fora, o lead continua em `data/ops` e o WhatsApp abre.

## Porta nesta VPS

| Serviço | Porta no host |
|---------|----------------|
| René Bradock (cliente) | 3000 — não usar |
| AUREON | 3001 — não usar |
| CRM | 3002 — não usar |
| Site da DWS | **3003** (`DWS_PUBLISH=172.17.0.1:3003`) |

80/443 já pertencem ao proxy da borda. A DWS entra só como `server_name` novo, sem virar o vhost padrão.

## Primeiro deploy

Pasta só desta aplicação: `/opt/dechen-web-studio`.

```bash
cp .env.example .env
# OPS_SECRET e DWS_PUBLISH=172.17.0.1:3003
mkdir -p data/ops reports
docker compose up -d --build
```

Cole os blocos de `deploy/nginx.dechenwebstudio.conf` no Nginx da borda. Não edite os `server_name` do cliente.

## DNS

Enquanto o Cloudflare apontar o origin para a Vercel, o público continua no site antigo. O A (origin) de `dechenwebstudio.com.br` precisa ser o IP desta VPS. Com proxy laranja, SSL em modo Full.

## Atualizar

```bash
git pull
docker compose up -d --build
```

Leads e rascunhos ficam em `./data/ops` no host. Não apague esse diretório no deploy.

## Conferência

- http://127.0.0.1:3000/api/health → `{ "ok": true }`
- https://dechenwebstudio.com.br/ — site
- https://dechenwebstudio.com.br/ops — pede a senha de `OPS_SECRET`
- https://dechenwebstudio.com.br/auditoria — PageSpeed público

## Chrome no container

A imagem instala Chromium (`CHROME_PATH=/usr/bin/chromium`). O Compose reserva 1 GB de `/dev/shm`. Sem isso o Lighthouse costuma morrer calado.

## O que esta pasta não faz

Não publica site de cliente. Não aponta domínio de cliente para este container. Não reutiliza certificado de outro vhost como padrão.
