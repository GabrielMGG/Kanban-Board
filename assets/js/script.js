/*=================================================
    VARIAVEIS GLOBAIS
===================================================*/
//variavel que recebe o  usuario que esta logado
let currentUser = null;

/*=================================================
    CONFIGURAÇOES DA ABERTURA E FECHAMENTO DO MODAL
===================================================*/

//Pega todos os botoes que tem a class (open-modal)
const btnOpenModal = document.querySelectorAll('.open-modal');

//Percorre a lista de botoes com a classe e captura o botao que foi clicado
btnOpenModal.forEach((botao) => {
    botao.addEventListener('click', () => {
        const modalId = botao.getAttribute('data-modal');//pega o data-modal(id do modal)
        const modal = document.getElementById(modalId);//aqui passa o id do modal que vai ser aberto

        modal.showModal();// abre o modal


    });
});

const btnCloseModal = document.querySelectorAll('.close-modal');

btnCloseModal.forEach((botao) => {
    botao.addEventListener('click', () => {
        const modalId = botao.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.close();


    });
});


const conteinerTaskList = document.querySelectorAll('.task-list');

conteinerTaskList.forEach((conteiner) => {
    conteiner.addEventListener('click', async (e) => {
        // Identifica qual botão foi clicado
        const menuBtn = e.target.closest('.card-menu');
        const editBtn = e.target.closest('.dropdown-item');
        const deleteBtn = e.target.closest('.delete');
        const card = e.target.closest('.card')



        if (menuBtn) {
            e.stopPropagation();
            menuBtn.parentElement.classList.toggle('active');
        }
        if (editBtn) {
            document.getElementById('edit-title').value = card.dataset.title;
            document.getElementById('edit-desc').value = card.dataset.description;
            document.getElementById('edit-status').value = card.dataset.status;
            document.getElementById('edit-priority').value = card.dataset.priority;
            document.getElementById('edit-date').value = card.dataset.dueDate;

            //vai passar o id pro formEdit, assim da pegar o id do card que estou atualizando os dados, e passar pro banco de dados
            formEdit.dataset.id = card.dataset.id;

            const modalId = editBtn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();

        }

        if (deleteBtn) {
            const taskId = deleteBtn.dataset.id;
            card.remove();
            await deleteTask(taskId);

        }





    });


});

const columnTask = document.querySelectorAll('.col-add-btn');

columnTask.forEach((e) => {
    e.addEventListener('click', (button) => {
        const modalId = e.getAttribute('data-modal');
        const columnTodo = button.target.closest('#col-todo');
        const columnInpo = button.target.closest('#col-inprogress');
        const columnDone = button.target.closest('#col-done');

        if (columnTodo) {
            document.getElementById('task-status').value = "todo";

            const modal = document.getElementById(modalId);
            modal.showModal();
        }
        if (columnInpo) {
            document.getElementById('task-status').value = "inprogress";

            const modal = document.getElementById(modalId);
            modal.showModal();
        }
        if (columnDone) {
            document.getElementById('task-status').value = "done";

            const modal = document.getElementById(modalId);
            modal.showModal();
        }

    });
});


// Atualiza as tarefas e envia a auteração pro banco de dados e renderiza os novos dados
const formEdit = document.getElementById('form-edit');

formEdit.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-desc').value
    const status = document.getElementById('edit-status').value;
    const priority = document.getElementById('edit-priority').value;
    const date = document.getElementById('edit-date').value;
    const taskId = formEdit.dataset.id;


    const dadoTask = {
        title: title,
        description: description,
        status: status,
        priority: priority,
        due_date: date,
        user_id: currentUser.id
    }

    await updateTask(taskId, dadoTask);
    await renderTasks(currentUser.id);

    const closeModal = document.getElementById('edit-modal');
    closeModal.close();


});



const form = document.querySelector('form');

form.addEventListener('submit', async (botao) => {
    botao.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const status = document.getElementById('task-status').value;
    const priority = document.getElementById('task-priority').value;
    const date = document.getElementById('task-date').value;

    const dadoTask = {
        title: title,
        description: description,
        status: status,
        priority: priority,
        due_date: date,
        user_id: currentUser.id
    }

    await createTask(dadoTask);
    await renderTasks(currentUser.id);

    //Pega o id e fecha o modal de criaçao de tarefa
    const closeModal = document.getElementById('task-modal');
    closeModal.close();

    //Vai limpar os valores dos inputs e colocar o valor padrão do select
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-status').selectedIndex = 0;
    document.getElementById('task-priority').selectedIndex = 0;
    document.getElementById('task-date').value = '';
});

const btnUserMenu = document.getElementById('userMenuBtn');

btnUserMenu.addEventListener('click', () => {
    const UserDropdownMenu = document.getElementById('userDropdown');

    UserDropdownMenu.classList.toggle('open');


});

const logout = document.querySelector('.logout-btn');

logout.addEventListener('click', async () => {
    await signOut();
    window.location.href = 'login.html'

});

async function init() {
    // Pega o elemento do loader no HTML
    const loader = document.getElementById('page-loader');

    try {
        // Executa a checagem atual e joga na variável global
        currentUser = await checkSession();

        // se nao tiver user logado, expulsa imediatamente
        if (!currentUser) {
            window.location.href = 'login.html';
            return; // Corta a execução aqui para não rodar o renderTasks à toa
        }

        // se o user estiver logado, vai renderizar as tarefas dele
        await renderTasks(currentUser.id);

        //Se tudo deu certo remove o travamento e esconde o loader
        document.body.classList.remove('loading');
        if (loader) loader.classList.add('hidden');

    } catch (error) {
        console.error("Erro crítico na inicialização:", error);
        window.location.href = 'login.html'; // Qualquer erro de rede joga pro login por segurança
    }
}

init();