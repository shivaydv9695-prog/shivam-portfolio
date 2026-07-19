let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function displayHabits() {

    const list = document.getElementById("habitList");

    list.innerHTML = "";

    habits.forEach((habit, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <input 
                type="checkbox"
                ${habit.done ? "checked" : ""}
                onchange="toggleHabit(${index})"
            >

            <span class="habit-name ${habit.done ? "completed" : ""}">
                ${habit.name}
            </span>

            <button 
                class="delete-btn"
                onclick="deleteHabit(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    updateProgress();
}

function addHabit() {

    const input = document.getElementById("habitInput");

    const habitName = input.value.trim();

    if (habitName === "") {
        return;
    }

    habits.push({
        name: habitName,
        done: false
    });

    saveHabits();

    input.value = "";

    displayHabits();
}

function toggleHabit(index) {

    habits[index].done = !habits[index].done;

    saveHabits();

    displayHabits();
}

function deleteHabit(index) {

    habits.splice(index, 1);

    saveHabits();

    displayHabits();
}

function updateProgress() {

    const completed = habits.filter(habit => habit.done).length;

    document.getElementById("progressText").innerText =
        `Completed: ${completed} / ${habits.length}`;
}

/* Add habit by pressing Enter */

document
    .getElementById("habitInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addHabit();
        }

    });

displayHabits();