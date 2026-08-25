# Hospedagem — Site da DWS na VPS

**Tipo:** ops · **Status:** ativo · **Versão:** 1.1

O site institucional, o console `/ops` e os agentes (auditoria com Chrome, Descoberta, fila do formulário) rodam **na VPS da agência**, não na Vercel.

A Vercel não executa Chrome nem guarda `data/ops` entre deploys. Na VPS os dois existem. O formulário público também precisa da VPS: a ingestão fala com o CRM em `172.17.0.1:3002`, endereço que a Vercel não alcança.

## Isolamento

Esta stack é só de `dechenwebstudio.com.br`. Compose, Nginx e certificado **não se misturam** com site de cliente. Cliente tem pack em `clients/` e, quando for o caso, compose próprio.

## O que sobe

| Peça | Função |
|------|--------|
| `Dockerfile` | Next.js em produção + Chromium para o Lighthouse |
| `docker-compose.yml` | Processo com restart, volume de leads/jobs, porta só em `172.17.0.1:3003` nesta VPS |
| `deploy/nginx.dechenwebstudio.conf` | HTTPS na frente do container (colar no Nginx da borda) |

## Variáveis (`.env` na VPS)

Copie [`.env.example`](../../.env.example). Obrigatórias em produção:

- `OPS_SECRET` — senha do `/ops` (mínimo 8 caracteres)
- `SITE_AUDIT_ENABLED=1` — liga o Chrome no console
- `DWS_PUBLISH=172.17.0.1:3003`

Opcionais: `PAGESPEED_API_KEY` (auditoria pública `/auditoria`).

CRM interno (`crm.dechenwebstudio.com.br`, porta 3002):

- `CRM_INGEST_URL=http://172.17.0.1:3002/api/ingest/leads`
- `CRM_INGEST_SECRET` — o mesmo segredo do CRM

Cada lead do formulário cria ou atualiza **empresa + contato** no CRM. O agente BDR está pausado. Se o CRM estiver fora, o lead continua em `data/ops` e o WhatsApp abre. O `/ops` do site da DWS não é o produto.

## Porta nesta VPS

| Serviço | Porta no host |
|---------|----------------|
| René Bradock (cliente) | 3000 — não usar |
| AUREON | 3001 — não usar |
| CRM | 3002 — não usar |
| Site da DWS | **3003** (`DWS_PUBLISH=172.17.0.1:3003`) |

80/443 já pertencem ao proxy da borda. A DWS entra só como `server_name` novo, sem virar o vhost padrão (`renebradock.com.br` continua `default_server` em 443).

## Primeiro deploy

Pasta só desta aplicação: `/opt/dechen-web-studio`. Essa pasta **não é um git**; copie o código deste repositório por cima, sem apagar `.env` nem `data/ops`.

```bash
cp .env.example .env
# OPS_SECRET, CRM_INGEST_SECRET e DWS_PUBLISH=172.17.0.1:3003
mkdir -p data/ops reports
docker compose up -d --build
```

Cole os blocos de `deploy/nginx.dechenwebstudio.conf` no Nginx da borda (`/opt/rene-bradock/deploy/nginx.conf`). Não edite os `server_name` do cliente. Recarregue só o proxy:

```bash
docker exec rene-bradock-proxy nginx -t && docker exec rene-bradock-proxy nginx -s reload
```

## DNS (corte Vercel → VPS)

O container e o vhost HTTPS já ficam na origem. Enquanto o Cloudflare apontar o origin para a Vercel (`x-vercel-id` no response), o público continua no site antigo.

No Cloudflare da zona `dechenwebstudio.com.br`, o mesmo padrão do CRM:

1. **SSL/TLS → Overview:** modo **Full** (não Flexible; **não Full Strict** enquanto o certificado de origem for self-signed).
2. **DNS → Records** — troque CNAME/`cname.vercel-dns.com` por A:
   - `A` `@` (apex) → `72.61.56.103` · Proxied (nuvem laranja)
   - `A` `www` → `72.61.56.103` · Proxied
3. Não mexa em `crm`, `aureon` nem em `renebradock.com.br`.
4. Depois do corte, em **Vercel → Project → Settings → Domains**, remova `dechenwebstudio.com.br` e `www` para o projeto não reassumir o DNS.

Conferência pública (sem `x-vercel-id`, com `x-dws-origin: vps`):

```bash
curl -sI https://dechenwebstudio.com.br | tr -d '\r' | grep -iE 'HTTP/|location:|x-vercel|x-dws-origin|cf-ray'
curl -sI https://www.dechenwebstudio.com.br | tr -d '\r' | grep -iE 'HTTP/|x-vercel|x-dws-origin'
```

## Atualizar

```bash
# Preserve .env e data/ops. Não use --delete nesses caminhos.
rsync -az --delete \
  --exclude '.env' --exclude 'data/' --exclude 'reports/' \
  --exclude '.git' --exclude 'node_modules' --exclude '.next' \
  --exclude 'integrations' --exclude 'clients' \
  ./ /opt/dechen-web-studio/
cd /opt/dechen-web-studio
docker compose up -d --build
```

Leads e rascunhos ficam em `./data/ops` no host. Não apague esse diretório no deploy. A build instala Chromium e leva alguns minutos.

## Conferência na origem (antes do DNS)

O publish é `172.17.0.1:3003`, não `127.0.0.1`.

```bash
curl -sS http://172.17.0.1:3003/api/health
# { "ok": true }

curl -sk --resolve dechenwebstudio.com.br:443:127.0.0.1 \
  -D - -o /dev/null https://dechenwebstudio.com.br/api/health
# 200 + x-dws-origin: vps
```

Depois do DNS:

- https://dechenwebstudio.com.br/ — site
- https://dechenwebstudio.com.br/ops — pede a senha de `OPS_SECRET`
- https://dechenwebstudio.com.br/auditoria — PageSpeed público
- Formulário da home `POST /api/contact` → CRM (empresa + contato)

## Chrome no container

A imagem instala Chromium (`CHROME_PATH=/usr/bin/chromium`). O Compose reserva 1 GB de `/dev/shm`. Sem isso o Lighthouse costuma morrer calado.

## O que esta pasta não faz

Não publica site de cliente. Não aponta domínio de cliente para este container. Não reutiliza certificado de outro vhost como padrão. Não altera a porta 3000 nem o `default_server` do René.
