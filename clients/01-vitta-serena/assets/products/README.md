# Products — fotos por SKU

**Tipo:** assets (staging) · **Status:** em andamento · **Versão:** 2.0

Índice: [../README.md](../README.md) · Guia completo: [../../04-assets.md](../../04-assets.md) · Cadastro: [../cadastro/README.md](../cadastro/README.md)

## Objetivo

Organizar fotografias de cada peça em **uma pasta por SKU**.

## Estrutura

```text
products/
└── br-001/          ← SKU em minúsculas
    ├── 01-principal.webp
    ├── 02-detalhe.webp
    ├── 03-uso.webp
    └── 04-embalagem.webp   ← opcional
```

## Ordem das imagens

| Arquivo | Uso no site |
|---------|-------------|
| `01-principal` | Card + primeira da galeria |
| `02-detalhe` | Close / acabamento |
| `03-uso` | Em uso ou referência de escala |
| `04-…` | Fecho, lateral, embalagem, composição |

Mínimo por produto: **principal + detalhe + uso/escala**.

## Padrão sugerido de SKU (confirmar na operação)

- `br-001` brincos
- `cl-001` colares
- `pl-001` pulseiras
- `an-001` anéis
- `kt-001` kits

## Nomenclatura

- Pasta = SKU em minúsculas
- Arquivos numerados, WebP preferencial
- Minúsculas, hífen, sem acentos

## Regra

**Nunca inventar** pastas com SKU fictício. Esperar planilha oficial ou definição pós-fornecedores.

Enquanto isso, deixe originais em `../_inbox/` com lista ligando cada foto ao nome provisório da peça.

## Checklist

- [ ] Pasta criada somente para SKU confirmado
- [ ] Mínimo 3 imagens por produto
- [ ] Cor fiel, fundo limpo, sem marca d’água
- [ ] Caminhos registrados em `../cadastro/produtos.csv`
