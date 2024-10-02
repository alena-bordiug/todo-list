import {TodoApp} from './todoapp.js';
import {getWeather} from './weather.js';

const addTaskInput = document.getElementById('add-task-input');
const listItems = document.getElementById('list-items');
const lists = document.getElementById('lists');
const weatherElement = document.getElementById('weather');

const todoApp = new TodoApp(addTaskInput, listItems, lists);

if ('geolocation' in navigator) {
  getWeather();
} else {
  weatherElement.textContent = 'Geolocation is not supported by your browser';
}