# DWS CRM

**Tipo:** ops · **Status:** migração da VPS · **Versão:** 0.1

CRM interno da Dechen Web Studio. Na VPS vivia em `/opt/crm-core` e respondia em `crm.dechenwebstudio.com.br` (porta 3002 no Docker).

O código original não está neste GitHub — a VPS só aceita SSH por chave. Este app recria o contrato que o site já usa:

```
POST /api/ingest/leads
Authorization: Bearer $CRM_INGEST_SECRET
```

Payload (igual ao `POST /api/contact` do site):

```json
{
  "name": "",
  "email": "",
  "whatsapp": "",
  "company": "",
  "segment": "",
  "website": "",
  "message": "",
  "origin": "website"
}
```

## Como rodar

```bash
cp .env.example .env.local
# preencha CRM_INGEST_SECRET e OPS_SECRET
npm install
npm run dev
```

Abre [http://localhost:3002](http://localhost:3002).

## Site institucional

No projeto `dechen-web-studio` (Vercel):

- `CRM_INGEST_URL=https://<este-app>/api/ingest/leads`
- `CRM_INGEST_SECRET=` o mesmo valor daqui

## Destino no GitHub

Este diretório é um app independente. Quando houver permissão para criar repositório:

`Dechen250/dws-crm` ← conteúdo de `apps/crm/`
