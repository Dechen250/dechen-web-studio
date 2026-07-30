# AGENTS.md

## Cursor Cloud specific instructions

This is a single **Next.js 16** (App Router, Turbopack) frontend app — "Dechen Web Studio", a Portuguese-language web-studio portfolio/showcase site. There is no backend, database, or external service; forms (e.g. the Divina Cozinha reservation form) are simulated client-side with `setTimeout`, so no API keys or env vars are required to run or test.

Dependencies are installed automatically by the startup update script (`npm ci`). Node 22 / npm 10 are available in the environment.

Standard commands (see `package.json` scripts):

- Dev server: `npm run dev` (serves at http://localhost:3000)
- Lint: `npm run lint` (currently passes with 1 non-blocking `@next/next/no-img-element` warning in `src/components/divina-cozinha/MenuBook.tsx`)
- Build: `npm run build`
- Prod start (after build): `npm start`

Notable routes for manual testing: `/`, `/showcase/divina-cozinha` (has the reservation form), `/showcase/barbearia-royal`, `/portfolio/clinica`, `/portfolio/empresa`.

Note: `next.config.ts` only allows remote images from `images.unsplash.com`; adding images from other hosts requires updating `images.remotePatterns`.
