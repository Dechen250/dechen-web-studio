# Projeto — Site Vitta Serena

## Objetivo

Criar o site oficial da **Vitta Serena**, marca real de semijoias da Gabi, transformando sua presença digital em um ativo comercial próprio desde o início.

O site deve apresentar a marca, organizar o catálogo, transmitir confiança e conduzir visitantes até a compra ou o atendimento.

A Vitta Serena não é um showcase fictício. Todas as decisões devem considerar uma operação real: produtos, estoque, preços, atendimento, entrega, políticas comerciais, dados de clientes e crescimento futuro.

---

# Contexto da Marca

## Nome

Vitta Serena

## Instagram

@vittaserena.semijoias

## Segmento

Semijoias femininas para uso cotidiano.

## Posicionamento

Uma marca elegante, delicada e minimalista, criada para ajudar mulheres jovens a se sentirem confiantes e bonitas no dia a dia.

A Vitta Serena deve parecer acessível sem parecer barata e refinada sem parecer distante.

## Público inicial

- Mulheres jovens
- Clientes que usam acessórios no cotidiano
- Pessoas que valorizam delicadeza, versatilidade e bom custo-benefício
- Compradores de presentes acessíveis e elegantes
- Seguidores que descobrem produtos pelo Instagram e procuram segurança antes de comprar

## Hipótese comercial inicial

A faixa de preço inicialmente estudada é de aproximadamente **R$ 20 a R$ 30 por peça**.

Essa faixa ainda é uma hipótese operacional. Ela não deve ser fixada na comunicação institucional até a definição final de fornecedores, custos, margens e coleção.

---

# Papel Estratégico do Site

O site deve:

- Dar legitimidade à marca
- Reduzir a dependência exclusiva do Instagram
- Organizar produtos e coleções
- Facilitar descoberta, comparação e compra
- Apoiar o atendimento pelo WhatsApp
- Capturar contatos de clientes
- Servir como base para um e-commerce completo
- Permitir análise de tráfego e conversão
- Fortalecer a percepção de profissionalismo
- Tornar campanhas e lançamentos mais eficientes

O desenvolvimento será realizado pela Dechen Web Studio, sem custo externo de desenvolvimento para a Vitta Serena. Isso permite tratar o site como um ativo estratégico desde o início.

---

# Decisão de Arquitetura

## Documentação

A documentação pode permanecer no repositório da Dechen Web Studio para centralizar a gestão do projeto e manter o histórico de atendimento.

Caminho definido:

```text
clients/
└── 01-vitta-serena/
    ├── 00-projeto.md
    ├── 01-brand-guide.md
    ├── 02-sitemap.md
    ├── 03-copy.md
    ├── 04-assets.md
    ├── 05-prompts.md
    ├── 06-roadmap.md
    └── assets/                 ← staging de fotos, logos e planilha
        ├── _inbox/
        ├── brand/
        ├── home/
        ├── categories/
        ├── products/
        ├── packaging/
        ├── social-proof/
        └── cadastro/
```

## Implementação

O site real deve possuir um repositório próprio, separado do site da agência.

Estrutura recomendada:

- Projeto Next.js independente
- Repositório GitHub próprio
- Deploy na **VPS própria** (não Vercel)
- Domínio próprio apontando para a VPS
- Analytics próprio
- Variáveis de ambiente no servidor
- Histórico de código separado
- Ambiente de preview/staging antes da produção

Não desenvolver o site real dentro das rotas de `showcase/` da agência.

## Hospedagem (VPS)

Decisão: publicar na VPS da Dechen Web Studio / operação definida pela agência, com controle total de domínio, SSL e processos.

Stack de deploy recomendada:

- **Docker** para build e runtime do Next.js (`output: "standalone"`)
- **Reverse proxy** (Caddy ou Nginx) com HTTPS (Let's Encrypt)
- **Processo estável** via Compose (ou equivalente) com restart automático
- Variáveis sensíveis apenas no servidor (`.env` / secrets), nunca no repositório
- Preview em subdomínio ou porta/staging separado, sem apontar o domínio final até aprovação

Responsabilidades no lançamento:

- DNS do domínio → IP da VPS
- SSL válido
- Healthcheck / restart
- Backup do `.env` e do volume de assets, se aplicável
- Logs acessíveis para diagnóstico

Não usar Vercel neste projeto.

---

# Objetivos de Negócio

## Objetivo principal

Converter interesse em pedidos de forma simples, elegante e confiável.

## Objetivos secundários

- Construir percepção de marca
- Aumentar o valor percebido das peças
- Facilitar lançamentos de coleções
- Criar uma base de clientes recorrentes
- Apoiar campanhas do Instagram
- Melhorar a apresentação dos produtos
- Permitir crescimento sem reconstruir toda a estrutura
- Aprender quais produtos e coleções geram mais interesse

---

# Objetivos da Cliente

A visitante deve conseguir:

- Entender rapidamente o estilo da marca
- Conhecer produtos e preços
- Visualizar detalhes das peças
- Saber se o item está disponível
- Encontrar informações de entrega, troca e cuidados
- Entrar em contato sem dificuldade
- Iniciar uma compra em poucos passos
- Sentir segurança para comprar de uma marca nova
- Descobrir peças relacionadas ao seu estilo

---

# Conversão Principal

## MVP

**Comprar pelo WhatsApp**

O botão deve abrir uma mensagem pré-preenchida contendo:

- Nome do produto
- Código do produto
- Variação selecionada, quando existir
- Quantidade desejada
- Link da página do produto

Exemplo:

```text
Olá! Tenho interesse no produto Brinco Aurora, código BR-001, na cor dourada.
Link: [URL]
```

## Evolução

Adicionar carrinho e checkout online quando estiverem validados:

- Estoque
- Meios de pagamento
- Logística
- Embalagem
- Política de troca
- Processo de separação
- Processo de pós-venda

---

# Escopo do MVP

## Homepage

- Navbar
- Hero
- Coleção em destaque
- Categorias
- Benefícios da marca
- Produtos em destaque
- Sobre a Vitta Serena
- Prova social
- Perguntas frequentes
- CTA final
- Footer

## Catálogo

Categorias inicialmente previstas:

- Brincos
- Colares
- Pulseiras
- Anéis
- Kits e presentes

As categorias devem ser confirmadas após a definição da primeira coleção.

## Página de Produto

- Galeria de imagens
- Nome
- Código
- Preço
- Descrição
- Material e acabamento
- Dimensões
- Variações
- Disponibilidade
- Cuidados
- Informações de entrega e troca
- CTA de compra
- Produtos relacionados

## Páginas institucionais

- Sobre
- Entregas
- Trocas e devoluções
- Cuidados com as peças
- Privacidade
- Termos
- Contato

---

# Funcionalidades do MVP

- Catálogo responsivo
- Filtros simples por categoria
- Página individual de produto
- Compra por WhatsApp com mensagem automática
- Integração com Instagram
- Cadastro de interesse ou novidades
- Produtos armazenados inicialmente em dados locais tipados
- SEO técnico
- Open Graph
- Analytics
- Acessibilidade básica
- Otimização de imagens
- Estados de produto disponível, indisponível e novidade
- Links compartilháveis para cada produto

A busca interna só deve ser adicionada se o tamanho da primeira coleção justificar.

---

# Modelo Inicial de Produto

Cada produto deve possuir, no mínimo:

```ts
type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  promotionalPrice?: number;
  description: string;
  shortDescription: string;
  materials?: string[];
  finish?: string;
  dimensions?: string;
  careInstructions?: string[];
  images: string[];
  variants?: ProductVariant[];
  available: boolean;
  featured: boolean;
  newArrival: boolean;
};
```

Nenhuma propriedade comercial deve ser preenchida com informação inventada.

---

# Requisitos de Conteúdo

Antes da implementação final, reunir:

- Logo em SVG e PNG
- Paleta oficial
- Tipografias aprovadas
- Fotografias da primeira coleção
- Nome e descrição de cada produto
- Código de cada produto
- Preço e estoque
- Materiais e acabamentos
- Dimensões
- Cuidados
- Formas de pagamento
- Regiões e modalidades de entrega
- Política de troca
- Número oficial de WhatsApp
- E-mail comercial
- Dados reais da marca para o footer
- Depoimentos autorizados, quando existirem

Nenhuma informação desconhecida deve ser inventada no site publicado.

---

# Princípios de Experiência

- Mobile first
- Navegação simples
- Poucos passos até o pedido
- Fotografias como elemento central
- Textos curtos e claros
- Elegância sem excesso de efeitos
- Alto contraste e boa legibilidade
- Feedback visível em todas as ações
- Performance prioritária
- Acessibilidade desde o início
- Sem pop-ups agressivos
- Sem falsa urgência

---

# Restrições

- Não parecer marketplace genérico
- Não usar linguagem agressiva de promoção
- Não criar urgência falsa
- Não prometer garantia, banho, material ou durabilidade sem confirmação
- Não divulgar preços provisórios como definitivos
- Não instalar dependências sem necessidade
- Não misturar o código da loja com os showcases da agência
- Não usar fotos de produtos diferentes dos vendidos
- Não esconder custos ou condições importantes
- Não publicar políticas incompletas como definitivas

---

# Indicadores de Sucesso

## Lançamento

- Site publicado sem erros críticos
- Navegação perfeita em celular
- Todos os produtos com conteúdo completo
- Links de compra funcionando
- Políticas acessíveis
- Analytics configurado
- Imagens otimizadas
- Metadados sociais funcionando
- Nenhum dado fictício apresentado como real

## Operação

- Cliques em “Comprar pelo WhatsApp”
- Conversão por produto
- Produtos mais visitados
- Origem dos visitantes
- Cadastros de interesse
- Taxa de retorno
- Tempo médio até o atendimento
- Produtos mais solicitados
- Abandono entre página de produto e WhatsApp

---

# Dependência Operacional Atual

A ida à região da 25 de Março, planejada para **22 de julho de 2026**, deve ajudar a definir fornecedores, produtos e primeira coleção.

Após essa etapa, atualizar esta documentação com dados reais de:

- Catálogo
- Custos
- Preços
- Estoque
- Materiais
- Acabamentos
- Embalagens
- Diferenciais
- Prazos
- Formas de entrega

---

# Objetivo Final

O site deve fazer a Vitta Serena parecer uma marca jovem, organizada e confiável desde o primeiro lançamento.

A visitante deve sentir que cada peça foi escolhida para trazer delicadeza e confiança à rotina — e deve conseguir avançar para a compra sem atrito.
