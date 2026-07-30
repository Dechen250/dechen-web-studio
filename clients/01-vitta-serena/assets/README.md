# Assets — Área de recebimento (Vitta Serena)

Pasta de **staging** no repositório da Dechen Web Studio.

Quando o site tiver repositório próprio, estes arquivos devem ser copiados para:

```text
public/vitta-serena/
```

Não inventar produtos, preços, materiais ou fotos de banco de imagem como se fossem da coleção.

---

## Como entregar as fotos

### Opção A — Rápida (recomendado no início)

1. Coloque tudo em `_inbox/` (originais, ZIP, nomes de câmera etc.).
2. Aviste a DWS.
3. A equipe organiza, renomeia e move para as pastas corretas.

### Opção B — Já organizada

Coloque cada arquivo direto na pasta certa, com o nome final (veja abaixo).

---

## Onde colocar cada tipo

| Pasta | O que vai aqui | Nomes esperados |
|-------|----------------|-----------------|
| `brand/` | Logo e símbolo | `logo-principal.svg`, `logo-clara.svg`, `logo-escura.svg`, `simbolo.svg`, `favicon.png` |
| `home/` | Hero, sobre, coleção | `hero.webp`, `sobre.webp`, `colecao-destaque.webp` |
| `categories/` | Uma imagem por categoria com produto | `brincos.webp`, `colares.webp`, `pulseiras.webp`, `aneis.webp`, `kits-presentes.webp` |
| `products/[sku]/` | Fotos de cada peça | `01-principal.webp`, `02-detalhe.webp`, `03-uso.webp`, `04-embalagem.webp` (opcional) |
| `packaging/` | Embalagem definitiva | nomes livres, minúsculas com hífen |
| `social-proof/` | Depoimentos/fotos autorizadas | só com autorização explícita |
| `cadastro/` | Planilha de produtos | `produtos.csv` (usar o template) |
| `_inbox/` | Entrega bruta | qualquer formato temporário |

Categorias só devem receber imagem se existirem produtos reais nessa categoria.

---

## Produtos — pasta por SKU

Exemplo (SKU real, não inventar):

```text
products/br-001/
  01-principal.webp
  02-detalhe.webp
  03-uso.webp
  04-embalagem.webp   ← opcional
```

Padrão sugerido de SKU (confirmar na operação):

- `br-001` brincos  
- `cl-001` colares  
- `pl-001` pulseiras  
- `an-001` anéis  
- `kt-001` kits  

Mínimo por produto: **principal + detalhe + uso/escala**.

---

## Regras de nome

- Minúsculas, sem espaços, sem acentos  
- Separar com hífen  
- Não usar `IMG_1234`, `foto final`, `sem título`  
- Preferir **WebP** (PNG/JPG originais podem ir em `_inbox/` para conversão)  
- Cor fiel, fundo limpo, sem marca d’água  

Metas de peso (orientação, não destruir qualidade):

- Card: preferencialmente abaixo de 200 KB  
- Principal: preferencialmente abaixo de 400 KB  


---

## Cadastro junto com as fotos

Preencha `cadastro/produtos.csv` (copie de `produtos-template.csv`).

Só preencha campos **confirmados**. Deixe vazio o que ainda não souber — não invente.

---

## Checklist rápido antes de considerar “entregue”

- [ ] Fotos das peças da primeira coleção  
- [ ] Pelo menos 3 imagens por produto (ou raw em `_inbox/` + lista de SKUs)  
- [ ] Planilha `cadastro/produtos.csv` iniciada  
- [ ] Logos oficiais em `brand/` (quando disponíveis)  
- [ ] Nenhuma foto de produto que não será vendida  
- [ ] Direitos de uso confirmados  
