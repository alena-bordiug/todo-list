import { createTodoItem } from './task-updates.js';

const todoValue = document.getElementById('add-task-input');
const listItems = document.getElementById('list-items');
const addTask = document.getElementById('add-task-btn');

addTask.addEventListener('click', function () {
  createTodoItem(todoValue, listItems);
});

todoValue.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    createTodoItem(todoValue, listItems);
  }
});

