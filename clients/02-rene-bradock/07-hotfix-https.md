# Hotfix HTTPS — renebradock.com.br

**Tipo:** operação · **Status:** resolvido em 18/08/2026 · **Versão:** 1.1

Pack: [00-projeto.md](00-projeto.md) · [06-roadmap.md](06-roadmap.md)

## O que o cliente vê

O navegador tenta `https://renebradock.com.br` e para no aviso de segurança. Se alguém ignora o aviso, cai no **login da AUREON**, não no site do Renê.

## Causa (confirmada em 18/08/2026)

IP do DNS: `72.61.56.103` (nginx 1.27.5 + Next.js).

| Porta | Conteúdo |
|-------|----------|
| 80 (HTTP) | Site correto: *Renê Bradock \| Marido de aluguel em São Paulo e Guarulhos* |
| 3000 | Mesmo site, direto no container |
| 443 (HTTPS) | App **AUREON** (`/login`), certificado autoassinado de `aureon.dechenwebstudio.com.br` |
| 3001 | AUREON, direto no container |

Não falta o site. Falta um `server` no nginx da porta 443 com `server_name renebradock.com.br` e um certificado Let’s Encrypt desse domínio. Hoje o HTTPS cai no vhost padrão, que é a AUREON.

## Resolução

Aplicado na VPS `72.61.56.103` em 18/08/2026:

- Let’s Encrypt em `renebradock.com.br` e `www` (emissor YR1, válido até 16/11/2026)
- `server` 443 no `rene-bradock-proxy` apontando para o container `web:3000`
- HTTP redireciona para HTTPS; ACME permanece na porta 80
- AUREON continua só em `aureon.dechenwebstudio.com.br`
- Hook `certbot renew` recarrega o nginx do proxy

Conferência: `curl https://renebradock.com.br` → 200, título *Renê Bradock | Marido de aluguel em São Paulo e Guarulhos*, `ssl_verify=0`.

Backups no servidor: `nginx.conf.bak-202608180122` e `docker-compose.yml.bak-*`.

A AUREON estava no mesmo proxy por erro de empilhamento — não faz parte deste cliente. A partir de 18/08/2026: não testar este domínio sem ordem explícita; não colocar produto interno nesta stack. Ver [DWS AI OS](../../agency/04-dws-ai-operating-system.md).

## Como aplicar (na VPS)

SSH na máquina `72.61.56.103` e rode os blocos abaixo. Não rode daqui: este ambiente não tem a chave SSH.

### 1. Achar o nginx e o proxy_pass que já funciona na porta 80

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'
# se nginx estiver em container:
NGINX=$(docker ps --format '{{.Names}}' | grep -Ei 'nginx|proxy' | head -1)
echo "container=$NGINX"
docker exec "$NGINX" nginx -T 2>/dev/null | grep -n -E 'server_name|proxy_pass|listen ' | head -80
```

Anote o `proxy_pass` do bloco que já atende `renebradock.com.br` na porta 80 (provavelmente o serviço da porta 3000). Use **esse mesmo** valor no 443. Não invente `localhost:3000` se o nginx estiver em Docker numa rede bridge — aí o alvo é o nome do serviço Compose.

### 2. Certificado (Let’s Encrypt)

O DNS já aponta apex e `www` para este IP. Porta 80 precisa continuar servindo o desafio ACME.

Se o nginx está no **host**:

```bash
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d renebradock.com.br -d www.renebradock.com.br \
  --redirect=false \
  --non-interactive --agree-tos -m contato@dechenwebstudio.com.br
```

`--redirect=false` (ou recusar o redirect no prompt): HTTP permanece no ar até você conferir o cadeado.

Se o nginx está em **Docker**, use webroot montado no mesmo volume que o container lê em `/.well-known/acme-challenge/`. Sem esse location no `server` da porta 80, o Certbot falha.

### 3. Bloco 443 só do Renê

Depois do certificado existir em `/etc/letsencrypt/live/renebradock.com.br/`:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name renebradock.com.br www.renebradock.com.br;

    ssl_certificate     /etc/letsencrypt/live/renebradock.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/renebradock.com.br/privkey.pem;

    location / {
        proxy_pass http://SUBSTITUA_PELO_MESMO_PROXY_PASS_DA_PORTA_80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

A AUREON fica só em `aureon.dechenwebstudio.com.br` (porta 3001). Não use o certificado dela no domínio do cliente.

```bash
docker exec "$NGINX" nginx -t && docker exec "$NGINX" nginx -s reload
# ou, nginx no host:
sudo nginx -t && sudo systemctl reload nginx
```

### 4. Conferir (celular, sem clicar em “avançado”)

```bash
echo | openssl s_client -connect renebradock.com.br:443 -servername renebradock.com.br 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
curl -sSI https://renebradock.com.br | head -15
```

Pronto quando:

- emissor for Let’s Encrypt (ou outro CA público), **não** `CN = aureon.dechenwebstudio.com.br`
- `curl -sS https://renebradock.com.br` devolver a home do Renê, **não** `/login`
- o celular mostrar cadeado e o site de marido de aluguel

Só então ligue redirect 80→443, se quiser.

## O que falar com o cliente

O site está no servidor; o cadeado estava apontando para outro aplicativo da VPS. Correção de certificado e de vhost, não de conteúdo. Qualquer link `https://` volta a abrir quando este hotfix terminar.
