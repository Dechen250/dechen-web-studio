# Assets — Renê Bradock

**Tipo:** assets · **Status:** ativo · **Versão:** 2.0

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [06-roadmap.md](06-roadmap.md) · Staging: [assets/brand/README.md](assets/brand/README.md)

## Objetivo

Organizar os arquivos visuais do projeto.

## Disponíveis

| Arquivo | Caminho | Uso |
|---------|---------|-----|
| Arte oficial (flyer) | `assets/brand/rene-bradock-hero.png` | Hero, Sobre, navbar, OG |
| Logo circular (legado) | `assets/brand/logo-rene-bradock.png` | Backup / favicon antigo |

## Staging sugerido

```text
assets/
├── brand/          ← logo e variações
├── home/           ← futuros recortes do hero
└── _inbox/         ← materiais enviados pelo cliente
```

## Pendentes (pós-MVP)

- Fotos reais de serviços / antes-depois
- Foto adicional do Renê em obra (além da logo)
- Favicon derivado da logo
- Imagem Open Graph

## Uso no site

O site Next.js deve copiar a logo para `public/logo-rene-bradock.png` (e favicon derivado).

## Regra

Usar **somente arquivos oficiais recebidos**. Não inventar fotos de obras, depoimentos ou materiais que o cliente ainda não entregou.

## Checklist

- [ ] Logo oficial em `assets/brand/`
- [ ] Hero / flyer mapeado para uso no site
- [ ] Favicon derivado da logo
- [ ] Open Graph configurado quando imagem estiver pronta
