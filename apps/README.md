# Apps extraídos da VPS

Cada pasta é um app independente (próprio `package.json`). O token deste agente não consegue criar repositórios novos na conta `Dechen250` (HTTP 403). Quando você criar os repos no GitHub, empurre assim:

| Pasta | Host na VPS | Repositório |
|-------|-------------|-------------|
| `crm/` | crm.dechenwebstudio.com.br · `/opt/crm-core` | `Dechen250/dws-crm` |
| `aureon/` | aureon.dechenwebstudio.com.br | `Dechen250/dws-aureon` |
| `helo/` | helo.dechenwebstudio.com.br | `Dechen250/dws-helo` |

```bash
# exemplo
cd apps/crm
git init
git add .
git commit -m "Initial commit from VPS cutover."
git remote add origin https://github.com/Dechen250/dws-crm.git
git push -u origin master
```
