document.addEventListener('DOMContentLoaded', function () {
  // Retrieve saved tasks from local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render tasks
  renderTasks(tasks);
});

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() !== '') {
    // Create a new task object
    const newTask = {
      id: new Date().getTime(),
      text: taskInput.value.trim(),
      completed: false,
    };

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render tasks
    renderTasks(tasks);

    // Clear the input field
    taskInput.value = '';
  }
}

function deleteTask(id) {
  // Retrieve tasks from local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Remove the task with the specified id
  const updatedTasks = tasks.filter(task => task.id !== id);

  // Save updated tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  // Render tasks
  renderTasks(updatedTasks);
}

function toggleTaskCompletion(id) {
  // Retrieve tasks from local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Toggle completion status for the task with the specified id
  const updatedTasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  // Save updated tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  // Render tasks
  renderTasks(updatedTasks);
}

function clearAllTasks() {
  // Clear all tasks in local storage
  localStorage.removeItem('tasks');

  // Render an empty task list
  renderTasks([]);
}

function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');

  // Clear the existing tasks
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" onclick="toggleTaskCompletion(${task.id})">${task.text}</span>
      <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
    `;
    li.classList.add('task-item');
    taskList.appendChild(li);
  });
}
