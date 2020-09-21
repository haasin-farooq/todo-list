let addTaskButton = document.querySelector('.add-task-button');
let taskInput = document.querySelector('.task-input');
let taskContainer = document.querySelector('.task-container');
let tasks = [];

class Task {
  // Constructor that calls the createTask function
  constructor(taskTitle, time, completed) {
    this.taskTitle = taskTitle;
    this.taskTime = time;
    this.completed = completed;
  }

  // Function to create the task div
  createTask(taskTitle, time) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    let taskRow1Div = document.createElement('div');
    taskRow1Div.classList.add('task-row-1');

    let taskIcon = document.createElement('i');
    taskIcon.classList.add('fas');
    taskIcon.classList.add('fa-tasks');
    taskIcon.classList.add('icon');

    let taskTitleInput = document.createElement('input');
    taskTitleInput.type = "text";
    taskTitleInput.value = taskTitle;
    taskTitleInput.disabled = true;
    taskTitleInput.classList.add('task-title-input');

    let taskTime = document.createElement('p');
    taskTime.classList.add('task-time');
    taskTime.innerHTML = time;

    let taskRow2Div = document.createElement('div');
    taskRow2Div.classList.add('task-row-2');

    let editTaskButton = document.createElement('button');
    editTaskButton.type = "button";
    editTaskButton.classList.add('btn');
    editTaskButton.classList.add('btn-sm');
    editTaskButton.classList.add('btn-outline-dark');
    editTaskButton.classList.add('button');
    editTaskButton.classList.add('button-square');
    editTaskButton.classList.add('edit-task-button');
    editTaskButton.innerHTML = '<i class="fas fa-pencil-alt icon"></i>';

    let completeTaskButton = document.createElement('button');
    completeTaskButton.type = "button";
    completeTaskButton.classList.add('btn');
    completeTaskButton.classList.add('btn-sm');
    completeTaskButton.classList.add('btn-outline-dark');
    completeTaskButton.classList.add('button');
    completeTaskButton.classList.add('button-square');
    completeTaskButton.classList.add('complete-task-button');
    completeTaskButton.innerHTML = '<i class="fas fa-check icon"></i>';

    let deleteTaskButton = document.createElement('button');
    deleteTaskButton.type = "button";
    deleteTaskButton.classList.add('btn');
    deleteTaskButton.classList.add('btn-sm');
    deleteTaskButton.classList.add('btn-outline-dark');
    deleteTaskButton.classList.add('button');
    deleteTaskButton.classList.add('button-square');
    deleteTaskButton.classList.add('delete-task-button');
    deleteTaskButton.innerHTML = '<i class="fas fa-times icon"></i>';

    taskContainer.appendChild(taskDiv);
    taskDiv.appendChild(taskRow1Div);
    taskRow1Div.appendChild(taskIcon);
    taskRow1Div.appendChild(taskTitleInput);
    taskRow1Div.appendChild(taskTime);
    taskDiv.appendChild(taskRow2Div);
    taskRow2Div.appendChild(deleteTaskButton);
    taskRow2Div.appendChild(completeTaskButton);
    taskRow2Div.appendChild(editTaskButton);

    this.completed ? taskDiv.classList.add('completed') : taskDiv.classList.remove('completed');

    taskInput.value = "";

    editTaskButton.addEventListener('click', () => this.editTask(taskTitleInput));

    completeTaskButton.addEventListener('click', () => this.completeTask(taskDiv));

    deleteTaskButton.addEventListener('click', () => this.deleteTask(taskDiv));
  }

  // Function that toggles the disabled property of taskTitleInput
  editTask(taskTitleInput) {
    taskTitleInput.disabled = !taskTitleInput.disabled;
    let index = tasks.findIndex((task) => task.taskTitle === this.taskTitle); // Testing function that returns index of the first element that satisfies the condition
    tasks[index].taskTitle = taskTitleInput.value;
    saveTasksLocally();
  }

  // Function that adds/removes the class completed to the taskDiv
  completeTask(taskDiv) {
    this.completed = !this.completed;
    taskDiv.classList.toggle('completed'); // opacity = 0.5
    let index = tasks.findIndex(task => task.taskTitle === this.taskTitle);
    tasks[index].completed = !tasks[index].completed;
    saveTasksLocally();
  }

  // Function that removes the taskDiv from the taskContainer
  deleteTask(taskDiv) {
    taskContainer.removeChild(taskDiv);
    let index = tasks.findIndex(task => task.taskTitle === this.taskTitle);
    tasks.splice(index, 1); // Remove 1 element from position 'index'
    saveTasksLocally();
  }
}

// Event fired when Add Task button is clicked
addTaskButton.addEventListener('click', addTask);

// Event fires when Enter key is pressed
window.addEventListener('keyup', (e) => {
  if(e.keyCode == 13 && taskInput.value) {
    addTask();
  }
});

// Initialize
getTasksLocally();
listTasks();


// Functions

// Function that creates a new Task object
function addTask() {
  if (taskInput.value) {
    var currentDate = new Date();
    var dateTime = currentDate.toLocaleDateString() + " @ " + currentDate.toLocaleTimeString();
    var task = new Task(taskInput.value, dateTime, false);
    task.createTask(task.taskTitle, task.taskTime, task.completed);
    tasks.push(task);
    saveTasksLocally();
  }
}

// Function that creates all the tasks in the tasks array
function listTasks() {
  for(let i = 0; i < tasks.length; i++) {
    var task = new Task(tasks[i].taskTitle, tasks[i].taskTime, tasks[i].completed);
    task.createTask(task.taskTitle, task.taskTime, task.completed);
  }
}

// Function that saves tasks to local storage
function saveTasksLocally() {
  var strTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", strTasks);
}

// Function that gets data from local storage
function getTasksLocally() {
  var strTasks = localStorage.getItem("tasks");
  tasks = JSON.parse(strTasks);
  if(!tasks) {
    tasks = [];
  }
}

