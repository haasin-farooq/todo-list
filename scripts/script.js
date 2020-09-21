let addTaskButton = document.querySelector('.add-task-button');
let taskInput = document.querySelector('.task-input');
let taskContainer = document.querySelector('.task-container')

class Task {
  // Constructor that calls the createTask function
  constructor(taskTitle, time) {
    this.createTask(taskTitle, time);
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

    editTaskButton.addEventListener('click', () => this.editTask(taskTitleInput));

    completeTaskButton.addEventListener('click', () => this.completeTask(taskDiv));

    deleteTaskButton.addEventListener('click', () => this.deleteTask(taskDiv));
  }

  // Function that toggles the disabled property of taskTitleInput
  editTask(taskTitleInput) {
    taskTitleInput.disabled = !taskTitleInput.disabled;
  }

  // Function that adds/removes the class completed to the taskDiv
  completeTask(taskDiv) {
    taskDiv.classList.toggle('completed'); // opacity = 0.5
  }

  // Function that removes the taskDiv from the taskContainer
  deleteTask(taskDiv) {
    taskContainer.removeChild(taskDiv);
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

// Function that creates a new Task object
function addTask() {
  if (taskInput.value) {
    var currentDate = new Date();
    var dateTime = currentDate.toLocaleDateString() + " @ " + currentDate.toLocaleTimeString();
    new Task(taskInput.value, dateTime);
  }
}
