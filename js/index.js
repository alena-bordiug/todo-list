import {TodoApp} from './todoapp.js';

let todoApp = new TodoApp(
  document.getElementById('add-task-input'),
  document.getElementById('list-items'),
  document.getElementById('lists'),
);