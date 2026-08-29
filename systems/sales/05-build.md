# Build

**Tipo:** Etapa de execução · **Status:** ativo · **Versão:** 2.1

## Objetivo

Transformar planejamento em produto real. Processo organizado, documentado e padronizado.

Posição no funil: [01-funil.md](./01-funil.md) — etapa 7, após **Cliente**.

## Critérios de entrada e saída

| | Condição |
|---|----------|
| **Entrada** | Proposta aprovada · Contrato assinado · Pagamento inicial · Informações do cliente recebidas |
| **Saída** | Projeto aprovado pelo cliente; pronto para [Entrega](./06-entrega.md) |

## Pré-requisitos (início do Build)

- Aprovação da [Proposta](./04-proposta.md)
- Assinatura do contrato
- Confirmação do pagamento inicial
- Recebimento de todas as informações necessárias

## Fluxo

```
Kickoff → Planejamento → Design → Desenvolvimento → Testes → Aprovação → Entrega
```

## Kickoff

**Objetivo:** Organizar oficialmente o projeto.

**Checklist:**

- [ ] Criar pack do cliente em `dechen-web-studio/clients/`
- [ ] Criar repositório **próprio** do site (`E:\DechenWebStudio\<slug>`, Git separado)
- [ ] Documentação com templates oficiais
- [ ] Definir cronograma
- [ ] Registrar informações do projeto
- [ ] Confirmar canais de comunicação

## Planejamento

Transformar [Diagnóstico](./03-diagnostico.md) em plano de execução.

**Definir:** Objetivos · Estrutura do site · Funcionalidades · Prioridades · Cronograma

**Documentos:** Projeto · Brand Guide · Sitemap · Copy · Assets · Roadmap

## Design

Interface alinhada à identidade do cliente.

**Princípios:** Simplicidade · Clareza · Responsividade · Performance · Conversão

Todo design segue o Brand Guide antes da aprovação.

## Desenvolvimento

**Stack padrão:**

- Next.js · TypeScript · Tailwind CSS
- Componentização · Código limpo
- Responsividade · SEO

Implementação conforme documentação do projeto, **no repositório daquele cliente**. Supabase e Resend quando necessário. Não misturar código com outro cliente nem com o monorepo da agência ([isolamento de projetos](../../agency/10-isolamento-de-projetos.md)).

Toda IA segue o DWS AI Operating System.

## Testes (pré-entrega)

- [ ] Responsividade
- [ ] Links e formulários
- [ ] Performance e SEO
- [ ] Acessibilidade
- [ ] Compatibilidade entre navegadores

Nenhum projeto publicado sem revisão.

## Aprovação

Apresentar ao cliente. Registrar ajustes solicitados, melhorias aprovadas e alterações finais. Após aprovação, preparar publicação.

## Critérios de qualidade

- Design consistente · Código organizado
- Performance otimizada · UX sólida
- SEO básico · Responsividade completa
- Componentes reutilizáveis **dentro** do repo daquele cliente

## Ferramentas

Cursor · Git · GitHub · Vercel · Figma (quando necessário) · Supabase (quando necessário) · Resend (quando necessário)

## Resultado esperado

Projeto pronto para publicação, nos padrões da Dechen Web Studio, preparado para [Entrega](./06-entrega.md) segura e profissional.
