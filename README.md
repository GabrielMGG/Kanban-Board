# TaskFlow — Kanban Board

Kanban Board fullstack com autenticação, persistência em banco de dados real e drag and drop.

🔗 **[Ver projeto online](https://projeto-task-flow.netlify.app/)**

---

## Sobre o projeto

Primeiro projeto fullstack desenvolvido do zero com JavaScript puro e Supabase. O objetivo foi construir um gerenciador de tarefas completo, com foco em aprender arquitetura fullstack, autenticação real e boas práticas de desenvolvimento.

---

## Funcionalidades

- Autenticação com cadastro via OTP (código de 6 dígitos por email)
- Login e logout com proteção de rotas
- Criar, editar e deletar tarefas
- Drag and drop entre colunas com Optimistic Update
- Tarefas isoladas por usuário (cada usuário vê só as suas)
- Prioridade e data de entrega por tarefa
- Contagem de tarefas por coluna
- Empty state e loading state
- Layout responsivo

---

## Stack

- HTML
- CSS
- JavaScript puro
- Supabase (autenticação + banco de dados)
- PostgreSQL (Row Level Security)
- Netlify (deploy)

---

## Arquitetura

```
login.html / confirm.html     → autenticação e verificação OTP
index.html                    → board principal

js/
├── config.js                 → configuração do Supabase 
├── auth.js                   → funções de autenticação
├── api.js                    → comunicação com o banco de dados
├── ui.js                     → renderização e manipulação do DOM
├── script.js                 → inicialização e eventos
├── utils.js                  → funções utilitárias
├── login.js                  → lógica da tela de login
└── confirm.js                → lógica da verificação OTP
```

---

## Como rodar localmente

1. Clone o repositório
```bash
git clone https://github.com/GabrielMGG/Kanban-Board.git
```

2. Abra o `login.html` com Live Server

---

## Aprendizados

- Modelagem de banco de dados com PostgreSQL
- Row Level Security (RLS) no Supabase
- Autenticação com OTP
- Drag and Drop nativo com HTML5
- Optimistic Update
- Separação de responsabilidades entre arquivos
- Manipulação de DOM e eventos
- async/await na prática

---

Desenvolvido por [GabrielMGG](https://gabrieldev.io/)
