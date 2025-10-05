// app.js (FRONTEND)

// O endereço base da nossa API
const API_URL = 'http://localhost:3000/todo'; 

// Elementos do DOM que vamos manipular
const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');

// --- FUNÇÃO PRINCIPAL: CARREGAR TAREFAS (GET /todo) ---
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const tasks = await response.json();
        
        // Limpa a lista existente e renderiza as novas
        taskList.innerHTML = ''; 
        tasks.forEach(task => renderTask(task));

    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        // Exibe uma mensagem de erro na lista se a API falhar
        taskList.innerHTML = '<li>Erro ao carregar a lista. Verifique se o servidor Node.js está rodando.</li>';
    }
}

// --- FUNÇÃO PARA INSERIR UMA TAREFA NO DOM ---
function renderTask(task) {
    const listItem = document.createElement('li');
    listItem.id = `task-${task.id}`;
    
    // Define a classe CSS se a tarefa estiver concluída
    if (task.completed) {
        listItem.classList.add('completed');
    }

    // Botão/Texto para alternar estado (Toggle)
    const toggleBtn = document.createElement('span');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = task.completed ? '✅' : '⬜';
    // O evento de click chama a rota PATCH
    toggleBtn.onclick = () => toggleTask(task.id); 
    
    // Título da tarefa
    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;

    // Botão de Deleção
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    // O evento de click chama a rota DELETE
    deleteBtn.onclick = () => deleteTask(task.id); 

    // Monta a estrutura 
    listItem.appendChild(toggleBtn);
    listItem.appendChild(titleSpan);
    listItem.appendChild(deleteBtn);
    
    taskList.appendChild(listItem);
}

// --- HANDLER PARA ADICIONAR TAREFA (POST /todo) ---
addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    const title = taskInput.value.trim();

    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        });

        // A API agora retorna 201 Created
        if (response.status === 201) {
            taskInput.value = ''; // Limpa o input
            // Re-renderiza a lista para mostrar o novo item
            fetchTasks(); 
        } else {
            console.error("Falha ao adicionar tarefa.");
            alert("Erro ao adicionar tarefa. Verifique o servidor.");
        }
    } catch (error) {
        console.error("Erro na requisição POST:", error);
        alert("Erro de conexão com o servidor.");
    }
});

// --- HANDLER PARA DELETAR TAREFA (DELETE /todo/:id/delete) ---
async function deleteTask(id) {
    // URL completa para a rota de deleção
    const url = `${API_URL}/${id}/delete`; 

    if (!confirm("Tem certeza que deseja deletar esta tarefa?")) return;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        // A API retorna 204 No Content em caso de sucesso
        if (response.status === 204) {
            // Se deletou com sucesso, remove o item do DOM sem recarregar tudo
            const item = document.getElementById(`task-${id}`);
            if (item) {
                item.remove();
            }
        } else if (response.status === 404) {
             alert(`Tarefa com ID ${id} não encontrada.`);
             fetchTasks(); // Recarrega para limpar o item que não deveria estar ali
        } else {
            console.error("Falha ao deletar tarefa. Status:", response.status);
            alert("Erro ao deletar tarefa.");
        }
    } catch (error) {
        console.error("Erro na requisição DELETE:", error);
        alert("Erro de conexão ao tentar deletar.");
    }
}

// --- HANDLER PARA ALTERNAR ESTADO (PATCH /todo/:id/checked) ---
async function toggleTask(id) {
    // URL completa para a rota de alternância
    const url = `${API_URL}/${id}/checked`; 

    try {
        const response = await fetch(url, {
            method: 'PATCH'
        });

        if (response.ok) {
            // Se a alteração funcionar (retorno 200 OK), recarrega a lista
            fetchTasks(); 
        } else {
            console.error("Falha ao alternar status.");
        }
    } catch (error) {
        console.error("Erro na requisição PATCH:", error);
    }
}


// --- INICIALIZAÇÃO: CARREGA AS TAREFAS QUANDO A PÁGINA É ABERTA ---
document.addEventListener('DOMContentLoaded', fetchTasks);