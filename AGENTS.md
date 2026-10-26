# AGENTS.md

## Cursor Cloud specific instructions

Public marketing site for **Dechen Web Studio** — Next.js 16 App Router, React 19, Tailwind 4, Geist. Language: Portuguese (`pt-BR`).

Production is Vercel on `master` (`www.dechenwebstudio.com.br`). Do not invent commercial facts. Brand dark `#050505`, accent `#0070F3`.

### Run

Dependencies install with `npm ci`. Node 22 / npm 10.

- Dev: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Build: `npm run build`
- Prod: `npm start` (after build)

The contact form posts to `/api/contact` and can forward leads to the CRM ingest API when `CRM_INGEST_SECRET` is set. Local runs work without that secret.

### Notable routes

- `/` — homepage
- `/auditoria` — site audit
- `/showcase/divina-cozinha`, `/showcase/barbearia-royal`, `/showcase/instituto-harmonia`, `/showcase/vertex-consultoria`
- `/proposta/nn-estetica-beleza` — client preview (not a sold product page)
- `/portfolio/[slug]`

Do not present the CRM as a sellable product on the public site.

### Extra apps

`apps/crm`, `apps/aureon`, and `apps/helo` are extractable stubs. They are excluded from the root TypeScript and ESLint configs. Do not merge them into the marketing homepage.
