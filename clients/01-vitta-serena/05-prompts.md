# Prompts — Vitta Serena

## Objetivo

Reunir os prompts que serão utilizados no Cursor durante o planejamento, desenvolvimento, revisão e publicação do site.

Todos os prompts devem respeitar a documentação desta pasta.

---

# Regra Obrigatória

Antes de gerar qualquer código, a IA deve ler integralmente:

- `00-projeto.md`
- `01-brand-guide.md`
- `02-sitemap.md`
- `03-copy.md`
- `04-assets.md`
- `06-roadmap.md`

Nenhuma decisão pode contradizer esses documentos.

Quando uma informação comercial estiver ausente, utilizar placeholder explícito no ambiente de desenvolvimento e registrar a pendência. Nunca inventar dados.

---

# Prompt 00 — Leitura e Plano

```text
Você é o Lead Product Designer e Front-end Engineer responsável pelo site real da Vitta Serena.

Antes de alterar qualquer arquivo:

1. Leia integralmente os sete documentos em clients/01-vitta-serena.
2. Resuma as decisões obrigatórias.
3. Liste informações pendentes.
4. Analise a estrutura atual do repositório.
5. Proponha um plano de implementação por etapas.
6. Não escreva código nesta primeira etapa.

Regras:
- A Vitta Serena é uma marca real.
- Não invente preços, materiais, prazos, garantias, estoque ou políticas.
- O projeto deve ser mobile first.
- A conversão do MVP será pelo WhatsApp.
- O site real deve ficar em repositório próprio.
- Priorize simplicidade, performance, acessibilidade e manutenção.
```

---

# Prompt 01 — Criar o Projeto

```text
Crie a base do site da Vitta Serena seguindo toda a documentação em clients/01-vitta-serena.

Stack:
- Next.js com App Router
- TypeScript
- Tailwind CSS
- ESLint
- next/image
- next/font
- Sem bibliotecas desnecessárias

Objetivos:
- Estrutura limpa e escalável
- Rotas definidas no sitemap
- Layout mobile first
- Metadados básicos
- Componentes reutilizáveis
- Dados de produtos tipados
- Estados de carregamento e vazio
- Acessibilidade básica

Não implemente checkout nesta versão.
Não use dados falsos como se fossem reais.
Não copie o layout de outra marca.
```

---

# Prompt 02 — Design System

```text
Implemente o design system da Vitta Serena com base no brand guide.

Crie:
- Tokens de cor
- Escala tipográfica
- Espaçamentos
- Raios de borda
- Sombras discretas
- Estados de foco
- Botões
- Inputs
- Badges
- Cards de produto
- Cabeçalhos de seção
- Containers
- Componentes de feedback

Regras:
- Visual claro, delicado e elegante
- Alto contraste
- Mobile first
- No máximo duas famílias tipográficas
- Animações discretas
- Respeitar prefers-reduced-motion
- Não exagerar no dourado ou no rosé
```

---

# Prompt 03 — Homepage

```text
Implemente a homepage da Vitta Serena seguindo o sitemap e a copy aprovados.

Seções:
1. Navbar
2. Hero
3. Coleção em destaque
4. Categorias
5. Benefícios
6. Produtos em destaque
7. Sobre
8. Prova social condicional
9. FAQ
10. CTA final
11. Footer

Regras:
- Usar imagens reais quando disponíveis
- Ocultar prova social se não houver conteúdo real
- Não publicar benefícios ainda não confirmados
- CTA principal deve levar à coleção
- CTA de produto deve levar ao WhatsApp
- Garantir ótima experiência em telas pequenas
```

---

# Prompt 04 — Catálogo

```text
Implemente a página de coleção e as páginas de categoria.

Recursos:
- Grade responsiva
- Filtro por categoria
- Filtro por disponibilidade
- Ordenação
- Estado vazio
- Preservação de filtros quando possível
- Cards acessíveis
- Links compartilháveis
- Performance com imagens otimizadas

Não adicione busca se o catálogo inicial for pequeno.
Não adicione filtros sem utilidade real.
Não simule estoque ou popularidade.
```

---

# Prompt 05 — Página de Produto

```text
Implemente a página dinâmica de produto com base no modelo tipado.

Conteúdo:
- Galeria
- Nome
- SKU
- Preço
- Preço promocional somente quando existir
- Variações
- Disponibilidade
- Descrição
- Material e acabamento, quando confirmados
- Dimensões, quando confirmadas
- Cuidados
- Entrega e troca
- Produtos relacionados
- CTA de WhatsApp

O CTA deve montar uma mensagem com:
- Nome
- SKU
- Variação
- Quantidade
- URL

Estados:
- Disponível
- Últimas unidades somente com dado real
- Indisponível
- Produto inexistente

Adicionar metadados únicos e dados estruturados quando aplicável.
```

---

# Prompt 06 — Páginas Institucionais

```text
Implemente:
- Sobre
- Cuidados
- Entregas
- Trocas e devoluções
- Contato
- Privacidade
- Termos

Use a copy documentada.

Toda informação ainda não definida deve ficar claramente marcada no desenvolvimento e bloquear a publicação da página correspondente.

Não produza políticas definitivas sem dados operacionais revisados.
Crie uma apresentação visual consistente, simples e legível.
```

---

# Prompt 07 — WhatsApp

```text
Implemente a conversão pelo WhatsApp.

Requisitos:
- Número configurado por variável de ambiente
- Mensagem codificada corretamente
- Produto, SKU, variação, quantidade e URL
- CTA desativado para produto indisponível
- Evento de analytics no clique
- Fallback caso a variável não esteja configurada
- Sem expor informação sensível

Crie uma função reutilizável para montar a URL.
Adicione testes unitários para a montagem da mensagem.
```

---

# Prompt 08 — Cadastro de Produtos

```text
Crie uma estrutura tipada para produtos e adicione somente os itens fornecidos na planilha oficial.

Valide:
- Slug único
- SKU único
- Preço válido
- Pelo menos uma imagem
- Categoria válida
- Disponibilidade explícita
- Descrições presentes
- Campos opcionais tratados corretamente

Crie mensagens claras para erros de cadastro.
Não preencha campos desconhecidos por inferência.
```

---

# Prompt 09 — Responsividade e Acessibilidade

```text
Revise integralmente o projeto.

Teste:
- 320 px
- 375 px
- 430 px
- Tablet
- Notebook
- Desktop amplo

Verifique:
- Navegação por teclado
- Ordem de foco
- Contraste
- Labels
- Alt text
- Headings
- Menu mobile
- Modais
- Estados de erro
- Touch targets
- prefers-reduced-motion
- Zoom de texto

Corrija os problemas sem alterar a identidade.
```

---

# Prompt 10 — Performance e SEO

```text
Faça uma revisão técnica completa.

Objetivos:
- Lighthouse alto
- Imagens otimizadas
- Fontes eficientes
- Redução de JavaScript no cliente
- Metadata por rota
- Sitemap XML
- robots.txt
- Canonicals
- Open Graph
- Twitter cards
- Dados estruturados quando aplicáveis
- Sem layout shift relevante
- Sem dependências desnecessárias

Não sacrifique qualidade visual de produto de forma perceptível.
```

---

# Prompt 11 — Analytics

```text
Implemente analytics com consentimento e configuração adequados.

Eventos mínimos:
- view_home
- view_collection
- select_category
- view_product
- click_whatsapp_product
- click_whatsapp_general
- submit_lead
- view_policy

Não enviar dados pessoais na URL ou no nome do evento.
Documentar cada evento.
```

---

# Prompt 12 — Revisão de Conteúdo

```text
Audite todo o conteúdo do site antes do lançamento.

Procure:
- Placeholders
- Dados fictícios
- Informações não confirmadas
- Erros de português
- Inconsistência de preço
- SKU duplicado
- Imagens erradas
- Links quebrados
- Políticas incompletas
- Depoimentos sem autorização

Crie uma lista objetiva de bloqueadores e não publique enquanto houver bloqueador crítico.
```

---

# Prompt 13 — Testes

```text
Crie e execute testes relevantes para o MVP.

Cobrir:
- Utilitário do WhatsApp
- Validação de produto
- Filtros
- Estado indisponível
- Rotas de produto inexistente
- Navegação principal
- Formulários
- Metadados essenciais

Execute:
- lint
- typecheck
- build
- testes automatizados

Relate qualquer falha com causa e correção.
```

---

# Prompt 14 — Deploy (VPS)

```text
Prepare o deploy da Vitta Serena na VPS (não usar Vercel).

Arquitetura esperada:
- Next.js com output standalone
- Docker + Docker Compose
- Reverse proxy (Caddy ou Nginx) com HTTPS
- Variáveis de ambiente no servidor
- Preview/staging separado da produção

Antes de publicar:
- Confirmar repositório correto
- Confirmar DNS do domínio → IP da VPS
- Configurar variáveis no servidor
- Validar WhatsApp
- Validar analytics
- Conferir metadados
- Conferir políticas
- Conferir produtos
- Executar build na VPS ou via CI + imagem
- Testar preview/staging
- Testar em celular real
- Verificar SSL e redirecionamento HTTPS

Não apontar o domínio de produção antes da aprovação final.
Não deixar secrets no Git.
```

---

# Prompt 15 — Melhorias Futuras

```text
Analise o site existente e proponha melhorias sem refazer o projeto.

Priorize:
- Dados reais de conversão
- Clareza da jornada
- Performance
- Acessibilidade
- Manutenção
- Catálogo
- Recompra
- Operação

Não adicionar efeitos ou funcionalidades apenas para parecer mais sofisticado.
Toda melhoria deve ter justificativa de negócio ou experiência.
```

---

# Regras Gerais

- Ler a documentação antes de agir
- Fazer mudanças pequenas e verificáveis
- Não alterar a identidade sem aprovação
- Não inventar informações
- Não instalar bibliotecas sem necessidade
- Não transformar tudo em componente client
- Não misturar dados e interface
- Manter conteúdo editável
- Testar antes de considerar concluído
- Registrar decisões importantes
- Priorizar experiência sobre efeitos
