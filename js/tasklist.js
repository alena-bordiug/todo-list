export class TaskList {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.loadFromLocalStorage();
  }

  addTask(taskText) {
    this.tasks.push(taskText);
    this.saveToLocalStorage();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.saveToLocalStorage();
  }

  updateTask(index, newTaskText) {
    this.tasks[index] = newTaskText;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.name, JSON.stringify(this.tasks));
  }

  loadFromLocalStorage() {
    const savedTasks = localStorage.getItem(this.name);
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}

