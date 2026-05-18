async function renderTasks(userId) {

  document.getElementById('loading').style.display = 'block';

  const dadosTask = await getTasks(userId);

  document.getElementById('loading').style.display = 'none';

  if (!dadosTask) {
    return;
  }


  const prioridades = {
    low: "Baixa",
    medium: "Media",
    high: "Urgente"
  }

  const todo = document.querySelectorAll('#col-todo .card').length;
  const inprogress = document.querySelectorAll('#col-inprogress .card').length;
  const done = document.querySelectorAll('#col-done .card').length
  if (todo > 0) document.querySelector('#col-todo .task-list').innerHTML = '';
  if (inprogress > 0) document.querySelector('#col-inprogress .task-list').innerHTML = '';
  if (done > 0) document.querySelector('#col-done .task-list').innerHTML = '';


  dadosTask.forEach(task => {

    const column = document.querySelector(`#col-${task.status} .task-list`);


    //Vai pegar a data de entrega e separar a string, assim dando pra usar cada dado individualmente
    const [ano, mes, dia] = task.due_date.split("-");

    //Faz a condiçao e se for tru ele adiociona um icone no card
    const iconDone = (task.status == "done") ? `<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>` : "";

    const card = document.createElement('article');
    card.classList.add('card');
    card.dataset.id = task.id;
    card.dataset.title = task.title;
    card.dataset.description = task.description;
    card.dataset.status = task.status;
    card.dataset.priority = task.priority;
    card.dataset.dueDate = task.due_date;

    card.draggable = true;
    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('taskId', task.id);
    });
    card.innerHTML = `
                  ${iconDone}
                  <div class="card-title">${task.title}</div>
                  <div class="card-desc">${task.description}</div>
                  <div class="card-footer">
                    <span class="priority priority-${task.priority}">${prioridades[task.priority]}</span>
                    <div class="card-meta">
                      <span class="card-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        ${dia}/${mes}
                      </span>
                      <div class="menu-container">
                        <button class="card-menu">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>
                        <div class="dropdown-menu">
                          <button class="dropdown-item edit open-modal" data-modal="edit-modal" data-id="${task.id}">
                            <span>✎</span> Editar
                          </button>
                          <button class="dropdown-item delete" data-id="${task.id}">
                            <span>✕</span> Deletar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
        `;

    column.appendChild(card);


  });

  updateCount();


}

function updateCount() {
  const colunas = ['todo', 'inprogress', 'done'];

  colunas.forEach(status => {
    // Busca a quantidade de cards e os elementos da coluna atual
    const count = document.querySelectorAll(`#col-${status} .card`).length;
    const counterElement = document.querySelector(`#col-${status} .col-count`);
    const emptyState = document.querySelector(`#col-${status} .empty-state`);

    // Atualiza o número no contador
    if (counterElement) {
      counterElement.textContent = count;
    }

    // Controla o "Empty State" 
    if (emptyState) {
      emptyState.style.display = (count === 0) ? 'flex' : 'none';
    }
  });
}

function zoneDragDrop() {
  const dropZone = document.querySelectorAll('.drop-zone');

  dropZone.forEach((element) => {
    element.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    element.addEventListener('drop', (event) => {
      const taskId = event.dataTransfer.getData('taskId');

      const novoStatus = element.parentElement.id.replace('col-', '')

      const card = document.querySelector(`[data-id="${taskId}"]`);

      const columnMove = document.querySelector(`#col-${novoStatus} .task-list`);

      // Se foi pra done, adiciona o ícone
      if (novoStatus === 'done') {
        card.insertAdjacentHTML('afterbegin', `
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
          </svg>
      `)
        // Se saiu do done, remove o ícone
      } else {
        const icon = card.querySelector('.check-icon')
        if (icon) icon.remove()
      }

      columnMove.appendChild(card);

      updateCount();

      updateTaskStatus(taskId, novoStatus);
    });
  });
}

zoneDragDrop();
