import {TaskList} from './tasklist.js';

export class TodoApp {
  constructor(todoInput, listContainer, listSelect) {
    this.todoInput = todoInput;
    this.listContainer = listContainer;
    this.listSelect = listSelect;
    this.taskLists = {};
    this.currentTaskList = null;

    this.loadTaskLists();
    this.setupEventListeners();
    this.updateListSelect();
    this.loadCurrentList();
  }

  setupEventListeners() {
    document
      .getElementById('add-task-btn')
      .addEventListener('click', () => this.addTask());
    this.todoInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') this.addTask();
    });
    document
      .getElementById('primary-btn')
      .addEventListener('click', () => this.createNewList());
    this.listSelect.addEventListener('change', (event) =>
      this.switchList(event.target.value),
    );
    document
      .getElementById('delete-btn')
      .addEventListener('click', () => this.deleteList());
  }

  createNewList() {
    const newListName = prompt('Enter list name:');
    if (newListName && !this.taskLists[newListName]) {
      this.taskLists[newListName] = new TaskList(newListName);
      this.updateListSelect();
      this.saveTaskListNames();
      this.switchList(newListName);
      this.listSelect.value = newListName;
    }
  }

  updateListSelect() {
   this.listSelect.innerHTML =
     '<option value="">Create new list</option>';
    Object.keys(this.taskLists).forEach((listName) => {
      const option = document.createElement('option');
      option.value = option.textContent = listName;
      this.listSelect.appendChild(option);
    });
  }

  switchList(listName) {
    if (listName) {
      this.currentTaskList = this.taskLists[listName];
      this.listSelect.value = listName;
    } else {
      this.currentTaskList = null;
      this.listSelect.value = '';
    }
    this.renderTasks();
    this.saveCurrentList();
  }

  deleteList() {
    if (!this.currentTaskList) {
      alert('Select list first');
      return;
    }

    const confirmDelete = confirm(
      `Are you shure you want to delete ${this.currentTaskList.name}?`,
    );
    if (confirmDelete) {
      localStorage.removeItem(this.currentTaskList.name);
      delete this.taskLists[this.currentTaskList.name];
      this.saveTaskListNames();
      this.updateListSelect();
    }

    const remainingLists = Object.keys(this.taskLists);
    if (remainingLists.length > 0) {
      this.switchList(remainingLists[0]);
    } else {
      this.currentTaskList = null;
      this.renderTasks();
    }
  }

  renderTasks() {
    this.listContainer.innerHTML = '';
    if (this.currentTaskList) {
      this.currentTaskList.tasks.forEach((taskText, index) => {
        this.createTaskElement(taskText, index);
      });
    }
  }

  createTaskElement(taskText, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <span class="icon edit">&#x270E;</span>
      <span class="icon delete">&#x2715;</span>
    `;

    li.querySelector('.task-text').addEventListener('click', (event) =>
      event.target.classList.toggle('checked-items'),
    );
    li.querySelector('.delete').addEventListener('click', () =>
      this.removeTask(index),
    );
    li.querySelector('.edit').addEventListener('click', () =>
      this.editTask(index, taskText),
    );

    this.listContainer.appendChild(li);
  }

  editTask(index, taskText) {
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      this.currentTaskList.updateTask(index, newTaskText);
      this.renderTasks();
    }
  }

  addTask() {
    const taskValue = this.todoInput.value.trim();
    if (taskValue === '' || !this.currentTaskList) {
      alert('Please, enter your task or select a list');
      return;
    }

    this.currentTaskList.addTask(taskValue);
    this.todoInput.value = '';
    this.renderTasks();
  }

  removeTask(index) {
    this.currentTaskList.removeTask(index);
    this.renderTasks();
  }

  saveTaskListNames() {
    localStorage.setItem(
      'taskListNames',
      JSON.stringify(Object.keys(this.taskLists)),
    );
  }

  saveCurrentList() {
    localStorage.setItem(
      'currentList',
      this.currentTaskList ? this.currentTaskList.name : '',
    );
  }

  loadTaskLists() {
    const taskListNames =
      JSON.parse(localStorage.getItem('taskListNames')) || [];
    taskListNames.forEach((name) => {
      this.taskLists[name] = new TaskList(name);
    });
  }

  loadCurrentList() {
    const currentListName = localStorage.getItem('currentList');
    if (currentListName && this.taskLists[currentListName]) {
      this.switchList(currentListName);
    } else if (Object.keys(this.taskLists).length > 0) {
      this.switchList(Object.keys(this.taskLists)[0]);
    } else {
      this.switchList('');
    }
  }
}
