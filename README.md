# 📋 To-do List API
O projeto To-do List API trata-se do desenvolvimento da minha primeira API REST

Foi desenvolvido com foco principal no aprendizado e consolidação de conceitos básicos do desenvolvimento WEB.

## 🛠️ Tecnologias Utilizadas

- Linguagem: Node.js
- Framework:	Express
- Banco de Dados:	SQLite
- Query Builder:	Knex.js

## 🚀 Como Rodar o Projeto
Siga estes passos para configurar e iniciar a API em seu ambiente local.

* Pré-requisitos
Você precisa ter o Node.js e o npm instalados em sua máquina.

### 1. Instalação das Dependências
Na pasta raiz do projeto, instale todos os pacotes necessários:

    npm install

### 2. Configuração do Banco de Dados
Esta API utiliza o Knex para gerenciar o banco de dados. Você deve executar a migration para criar a tabela tasks.

    npx knex migrate:latest

### 3. Iniciar o Backend (API)
Inicie o servidor Express. O backend será executado na porta 3000.

       npm run start

* Saída esperada: Example app listening on port 3000

## 🗺️ Endpoints da API

GET	/todo	Lista todas as tarefas, ordenadas por ID.

GET	/todo/statistic	Retorna a contagem total de tarefas completed e pending.

POST	/todo	Cria uma nova tarefa. Requer { "title": "..." } no corpo.

PATCH	/todo/:id/checked	Alterna o status completed (true/false) de uma tarefa específica.

DELETE	/todo/:id/	Remove permanentemente uma tarefa com o ID fornecido.
