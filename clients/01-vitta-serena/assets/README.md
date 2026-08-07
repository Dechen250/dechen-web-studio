# Assets — staging Vitta Serena

**Tipo:** assets (staging) · **Status:** em andamento · **Versão:** 2.0

Guia completo: [../04-assets.md](../04-assets.md) · Pack: [../00-projeto.md](../00-projeto.md) · [../03-copy.md](../03-copy.md)

## Objetivo

Pasta de **staging** no repositório da Dechen Web Studio. Receber, organizar e validar arquivos antes de copiar para o repositório do site.

Destino final quando o repo existir:

```text
public/vitta-serena/
```

## Mapa de pastas

```text
assets/
├── README.md          ← este guia
├── _inbox/            ← entrega bruta
├── brand/
├── home/
├── categories/
├── products/          ← uma pasta por SKU
├── packaging/
├── social-proof/
└── cadastro/
    ├── produtos-template.csv
    └── produtos.csv
```

| Pasta | Conteúdo | README |
|-------|----------|--------|
| `_inbox/` | Originais, ZIP, nomes de câmera | [_inbox/README.md](_inbox/README.md) |
| `brand/` | Logos e símbolo | [brand/README.md](brand/README.md) |
| `home/` | Hero, sobre, coleção | [home/README.md](home/README.md) |
| `categories/` | Uma imagem por categoria | [categories/README.md](categories/README.md) |
| `products/` | Fotos por SKU | [products/README.md](products/README.md) |
| `packaging/` | Embalagem definitiva | [packaging/README.md](packaging/README.md) |
| `social-proof/` | Depoimentos autorizados | [social-proof/README.md](social-proof/README.md) |
| `cadastro/` | Planilha de produtos | [cadastro/README.md](cadastro/README.md) |

## Como entregar

### Opção A — Rápida (recomendado no início)

1. Coloque tudo em `_inbox/` (originais, ZIP, nomes de câmera etc.).
2. Avise a DWS.
3. A equipe organiza, renomeia e move para as pastas corretas.

### Opção B — Já organizada

Coloque cada arquivo direto na pasta certa, com o nome final (veja nomenclatura abaixo).

## Nomenclatura

- Minúsculas, sem espaços, sem acentos
- Separar palavras com hífen
- Não usar `IMG_1234`, `foto final`, `sem título`
- Preferir **WebP** (PNG/JPG originais podem ir em `_inbox/` para conversão)
- Cor fiel, fundo limpo, sem marca d’água

Metas de peso (orientação, não destruir qualidade):

- Card: preferencialmente abaixo de 200 KB
- Principal: preferencialmente abaixo de 400 KB

## Fluxo

1. Entregar fotos em `_inbox/` ou já renomeadas nas pastas finais.
2. Preencher `cadastro/produtos.csv` só com dados confirmados.
3. Quando o repo `vitta-serena` existir, copiar o conteúdo organizado para `public/vitta-serena/`.

## Regra

**Nunca inventar** produtos, preços, materiais ou fotos de banco de imagem como se fossem da coleção.

Categorias só devem receber imagem se existirem produtos reais nessa categoria.

## Checklist antes de considerar “entregue”

- [ ] Fotos das peças da primeira coleção
- [ ] Pelo menos 3 imagens por produto (ou raw em `_inbox/` + lista de SKUs)
- [ ] Planilha `cadastro/produtos.csv` iniciada
- [ ] Logos oficiais em `brand/` (quando disponíveis)
- [ ] Nenhuma foto de produto que não será vendida
- [ ] Direitos de uso confirmados
