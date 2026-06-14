const taskForm = document.getElementById('task-form');    // Capturando o form
const taskInput = document.getElementById('task-input');  //Capturando o input
const taskList = document.getElementById('task-list');    //Capturando Ul
const emptyMessage = document.getElementById('empty-message');  //Capturando o texto de lista vazia

const tasks = [];

function renderTasks() {
  taskList.innerHTML = '';    //Limpando a lista

  tasks.forEach(function (task, index) {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.dataset.index = index;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;

    const text = document.createElement('span');
    text.className = 'task-text' + (task.done ? ' done' : '');
    text.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Excluir';

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteBtn);
    taskList.appendChild(item);
  });

  emptyMessage.classList.toggle('hidden', tasks.length > 0);
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({ text: trimmed, done: false });
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

taskList.addEventListener('click', function (event) {
  const item = event.target.closest('.task-item');
  if (!item) return;

  const index = Number(item.dataset.index);

  if (event.target.classList.contains('task-checkbox')) {
    toggleTask(index);
  }

  if (event.target.classList.contains('btn-delete')) {
    deleteTask(index);
  }
});

renderTasks();
