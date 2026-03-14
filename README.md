# 🔍 JobHack — Busca Avançada de Vagas

> Ferramenta web para gerar consultas de **Google Hacking** voltadas à busca de vagas de emprego. Monte queries avançadas com filtros, operadores e palavras-chave, e abra direto no buscador de sua preferência.

---

## ✨ Funcionalidades

- **Campo de cargo livre** — digite qualquer função ou área de atuação
- **Sugestões rápidas** — chips clicáveis para preenchimento rápido (Marketing, Dev, UX, Dados, etc.)
- **Palavras-chave extras** — adicione termos como `estratégia`, `gestão`, `remoto` com Enter
- **Escolha do mecanismo de busca** — Google, Bing, DuckDuckGo, Brave ou Yahoo
- **Restrição a portais de vagas** — LinkedIn, Gupy, Catho, InfoJobs, Indeed, Glassdoor e mais
- **Filtros** — regime de trabalho, nível de senioridade e exigência de formação
- **Operadores avançados** — `intitle:`, `inurl:`, `intext:`, `filetype:pdf`
- **Query com syntax highlight** — visualização colorida dos operadores gerados
- **Animação de foco** — borda pulsante verde enquanto houver query pronta
- **Botão Buscar** — abre direto no mecanismo selecionado
- **Botão Copiar** — copia a query com shimmer animado indicando que está pronta
- **Templates prontos** — 6 presets com configurações reais para diferentes perfis
- **Template aleatório** — botão 🎲 para sortear um preset automaticamente
- **Limpar tudo** — reset completo de todos os filtros e query
- **Tutorial interativo** — abre automaticamente para novos usuários, reabrível pelo botão Ajuda
- **Cheatsheet de operadores** — referência rápida para os principais operadores do Google
- **Responsivo** — layout adaptado para desktop e mobile
- **Painéis colapsáveis** — seções recolhíveis no mobile para economizar espaço

---

## 🚀 Como usar

1. **Clone o repositório**

```bash
git clone https://github.com/C-Henrique/jobhack.git
cd jobhack
```

2. **Abra o arquivo no navegador**

Não há dependências ou build necessário. Basta abrir o arquivo diretamente:

```bash
open index.html
# ou arraste o arquivo para o navegador
```

3. **Pronto!** A ferramenta roda 100% no client-side, sem servidor.

---

## 🗂️ Estrutura do projeto

```
jobhack/
|__ css
   |__ main.css # Estilos gerais, pode ser dividido em header.css, layout.css.
   |__ header.css
   |__ layout.css
├── js
   |__ main.js # Lógica de geração de query, interações e presets.
├── icons
   |__ jobhack-icon.svg
├── index.html       # Aplicação principal
└── README.md        # Documentação
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Estilos, animações, responsividade |
| JavaScript (Vanilla) | Lógica de geração de query e interações |
| [Inter](https://fonts.google.com/specimen/Inter) | Fonte principal |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Fonte monospace para código e UI técnica |
| Google Fonts | Carregamento das fontes via CDN |

Sem frameworks, sem dependências, sem build. Arquivo único, abre em qualquer navegador.

---

## 🔎 Operadores suportados

| Operador | Descrição |
|---|---|
| `site:linkedin.com` | Restringe a busca a um domínio específico |
| `intitle:"vaga"` | Busca a palavra no título da página |
| `inurl:jobs` | Busca a palavra na URL |
| `intext:"estratégia"` | Busca a palavra no corpo do texto |
| `"gerente" OR "coordenador"` | Um ou outro termo |
| `"marketing" AND "gestão"` | Ambos os termos obrigatórios |
| `-estagio` | Exclui o termo da busca |
| `filetype:pdf` | Retorna apenas arquivos PDF |
| `after:2024-01-01` | Publicado após uma data |
| `"* de marketing"` | Wildcard — qualquer palavra no lugar do `*` |

---

## 📱 Responsividade

- **Desktop:** layout em duas colunas (sidebar fixa + área de conteúdo)
- **Mobile:** layout empilhado com sidebar rolável e botões fixos na parte inferior
- **Painéis colapsáveis** no mobile: Sugestões Rápidas, Sites de Vagas e Operadores Avançados ficam recolhidos por padrão

---

## 🎨 Design

- Paleta inspirada no macOS — fundo branco gelo `#f5f5f7`, superfícies brancas, sombras sutis
- Accent verde terminal `#1d6f42` para elementos interativos
- Query box com fundo escuro `#1c1c1e` e syntax highlight verde/amarelo
- Três pontinhos macOS no header (decorativos)
- Animações CSS puras: respiração da borda, shimmer no botão copiar, glow no botão buscar


---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<p align="center">Feito com ☕ para caçadores de vagas</p>
