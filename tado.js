let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})" 
      class="${task.done ? "completed" : ""}">
        ${task.name}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ name: input.value, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  displayTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

displayTasks();