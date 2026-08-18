# Uso — Auditoria Técnica de Site

**Tipo:** Guia de uso · **Status:** ativo · **Versão:** 1.1

Visão do sistema: [00-visao.md](./00-visao.md)

A interface interna, com tela ao vivo do Chrome, está em `/ops/audit` no site da DWS. É o jeito de assistir o agente trabalhar. A auditoria pública, sem Chrome, está em `/auditoria`.

## Console web

1. `npm run dev`
2. Abra http://localhost:3000/ops/audit
3. Cole o domínio e aperte **Auditar**

A página mostra a tela do Chrome ao vivo, o log de cada passo e o relatório quando a medição termina. Em produção o console só liga com `SITE_AUDIT_ENABLED=1` e pede a senha de `OPS_SECRET`. Não entra no menu público e não é indexado.

Histórico e rascunhos de Descoberta ficam em `/ops`. Leads e jobs são gravados em `data/ops/` (fora do Git).

## Auditoria pública (PageSpeed)

1. `npm run dev`
2. Abra http://localhost:3000/auditoria
3. Cole o domínio

A medição vai para a API do PageSpeed Insights. Chave opcional: `PAGESPEED_API_KEY`. Sem Chrome no servidor, então esta rota é a que o Vercel consegue hospedar. Há limite por IP.

## Requisito

Google Chrome instalado na máquina. A ferramenta o localiza sozinha e o roda em modo headless — nenhuma janela abre e o navegador do dia a dia não é usado.

Se o Chrome estiver em caminho fora do padrão, aponte com a variável `CHROME_PATH`.

## Comando

```bash
npm run audit -- <url> [opções]
```

O `--` é obrigatório: separa os argumentos do npm dos da ferramenta.

## Opções

| Opção | Efeito |
|-------|--------|
| `--desktop` | Simula desktop em vez de celular |
| `--out <pasta>` | Pasta de saída (padrão: `reports`) |
| `--json` | Salva também o resultado bruto em JSON |
| `--strict` | Sai com código 1 se houver achado crítico |
| `--visible` | Abre o Chrome com janela (demonstração local) |
| `-h`, `--help` | Mostra a ajuda |

O padrão é celular porque é de onde vem a maior parte do tráfego dos negócios atendidos. Use `--desktop` quando o site tiver público majoritariamente de escritório.

## Exemplos

```bash
# Prospect, medição padrão em celular
npm run audit -- dechenwebstudio.com.br

# Desktop, guardando o JSON para comparar depois
npm run audit -- https://exemplo.com.br --desktop --json

# Verificação de qualidade que falha em achado crítico
npm run audit -- exemplo.com.br --strict
```

## Saída

Um arquivo Markdown em `reports/`, nomeado `<dominio>-<dispositivo>-<data>.md`. Relatórios bloqueados saem como `<dominio>-bloqueado-<data>.md`.

A pasta `reports/` não é versionada: relatório de prospect é dado de terceiro e não deve entrar no Git sem motivo. Para arquivar a auditoria de um cliente, mova o arquivo para o pack dele em `clients/`.

No terminal aparecem as quatro notas e a lista de achados críticos. O relatório completo fica no arquivo.

## Situações no relatório

| Situação | Significado |
|----------|-------------|
| OK | Dentro do alvo de referência |
| Atenção | Fora do ideal, sem impedir o funcionamento |
| Crítico | Prejudica acesso, indexação ou contato — trate primeiro |

## Quando o relatório sai bloqueado

Acontece quando o domínio não resolve em DNS, o servidor não completa a conexão, ou o certificado SSL é inválido. Não é erro da ferramenta: é o achado. O relatório traz a evidência técnica e o que precisa ser corrigido antes de qualquer medição fazer sentido.

## Uso em CI

`--strict` devolve código 1 em achado crítico, o que permite rodar a auditoria como etapa de verificação antes de publicar. Vale para o site da DWS e para sites de clientes com manutenção contratada.
