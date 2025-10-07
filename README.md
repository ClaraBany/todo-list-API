# 📋 To-do List API
O projeto To-do List API trata-se do desenvolvimento da minha primeira API REST

Foi desenvolvido com foco principal no aprendizado e consolidação de conceitos básicos do desenvolvimento WEB.

## 🛠️ Tecnologias Utilizadas

- Linguagem: Node.js
- Framework:	Express
- Banco de Dados:	SQLite
- Query Builder:	Knex.js

## 🚀 Exxecutando com o Docker
Siga estes passos para configurar e iniciar a API em seu ambiente local.

### 1. Baixar a imagem

    docker pull clarabany/todo-api:latest

### 2. Executar o container

    docker run -d -p 3000:3000 --name todo-container clarabany/todo-api:latest

* Saída esperada: Example app listening on port 3000

## 🗺️ Endpoints da API

GET	/todo	Lista todas as tarefas, ordenadas por ID.

GET	/todo/statistic	Retorna a contagem total de tarefas completed e pending.

POST	/todo	Cria uma nova tarefa. Requer { "title": "..." } no corpo.

PATCH	/todo/:id/checked	Alterna o status completed (true/false) de uma tarefa específica.

DELETE	/todo/:id/	Remove permanentemente uma tarefa com o ID fornecido.
