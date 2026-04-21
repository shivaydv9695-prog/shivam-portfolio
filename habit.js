let habits = JSON.parse(localStorage.getItem("habits")) || [];

function displayHabits() {
  let list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" ${habit.done ? "checked" : ""} 
      onchange="toggleHabit(${index})">
      ${habit.name}
    `;

    list.appendChild(li);
  });
}

function addHabit() {
  let input = document.getElementById("habitInput");
  if (input.value === "") return;

  habits.push({ name: input.value, done: false });
  localStorage.setItem("habits", JSON.stringify(habits));

  input.value = "";
  displayHabits();
}

function toggleHabit(index) {
  habits[index].done = !habits[index].done;
  localStorage.setItem("habits", JSON.stringify(habits));
  displayHabits();
}

displayHabits();