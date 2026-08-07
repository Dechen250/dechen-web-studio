# Cadastro — planilha de produtos

**Tipo:** assets (staging) · **Status:** em andamento · **Versão:** 2.0

Índice: [../README.md](../README.md) · Guia completo: [../../04-assets.md](../../04-assets.md) · Fotos: [../products/README.md](../products/README.md)

## Objetivo

Manter a fonte única de dados dos produtos antes da implementação no site.

## Como usar

1. Copie `produtos-template.csv` para `produtos.csv`.
2. Preencha **somente** o que estiver confirmado.
3. Colunas vazias = ainda não definido.

## Caminhos de imagem

Em `imagem_01`, `imagem_02`, `imagem_03`, use caminho relativo após organizar:

```text
products/br-001/01-principal.webp
```

## Categorias previstas (confirmar com a coleção)

- brincos
- colares
- pulseiras
- aneis
- kits-presentes

## Valores booleanos

`disponivel`, `destaque`, `novidade`: `sim` ou `nao`.

## Regra

**Nunca inventar** preços, materiais, estoque, dimensões ou SKUs. Campos desconhecidos permanecem vazios.

## Checklist

- [ ] `produtos.csv` criado a partir do template
- [ ] SKUs alinhados às pastas em `../products/`
- [ ] Somente dados confirmados preenchidos
- [ ] Caminhos de imagem conferidos
