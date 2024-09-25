export function completeTask() {
  const listItem = document.querySelectorAll('.task-text');

  listItem.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.target.classList.toggle('checked-items');
    });
  });
}

export function createTodoItem() {
  const todoValue = document.getElementById('add-task-input');
  const listItems = document.getElementById('list-items');

  if (todoValue.value === '') {
    alert('Please, enter your task');
  } else {
    const li = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = todoValue.value;
    li.appendChild(taskText);

    const editIcon = document.createElement('span');
    editIcon.classList.add('icon');
    editIcon.innerHTML = '&#x270E;';
    li.appendChild(editIcon);

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('icon');
    deleteIcon.innerHTML = '&#x2715;';
    li.appendChild(deleteIcon);

    listItems.appendChild(li);
    todoValue.value = '';

    deleteIcon.addEventListener('click', function () {
      li.remove();
    });

    editIcon.addEventListener('click', function () {
      const newTaskText = prompt('Edit task:', taskText.textContent);
      if (newTaskText !== null && newTaskText.trim() !== '') {
        taskText.textContent = newTaskText;
      }
    });

    taskText.addEventListener('click', function () {
      taskText.classList.toggle('checked-items');
    });
  }
}
