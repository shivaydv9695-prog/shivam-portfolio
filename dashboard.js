const firebaseConfig = {
  apiKey: "AIzaSyBGsF1YWPYKBPxOYe2hDB-pPIvPV4P5L4c",
  authDomain: "shivam-productivity-hub.firebaseapp.com",
  projectId: "shivam-productivity-hub",
  storageBucket: "shivam-productivity-hub.firebasestorage.app",
  messagingSenderId: "612139607689",
  appId: "1:612139607689:web:db3a7de04b981ef3d5c858",
  measurementId: "G-2GN8FDVN0X"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let tasks = [];
let userId = null;


// CHECK LOGIN STATUS
auth.onAuthStateChanged((user) => {

  if (user) {

    userId = user.uid;

    // Load user's tasks
    loadTasks();

  } else {

    // User login nahi hai
    window.location.href = "login.html";

  }

});


// LOAD TASKS FROM FIREBASE
function loadTasks() {

  db.collection("tasks")
    .doc(userId)
    .get()
    .then((doc) => {

      if (doc.exists) {

        tasks = doc.data().tasks || [];

      } else {

        tasks = [];

      }

      displayTasks();

    })
    .catch((error) => {

      console.error("Error loading tasks:", error);

    });

}


// SAVE TASKS TO FIREBASE
function saveTasks() {

  if (!userId) return;

  db.collection("tasks")
    .doc(userId)
    .set({
      tasks: tasks
    })
    .catch((error) => {

      console.error("Error saving tasks:", error);

    });

}


// ADD TASK
function addTask() {

  const input = document.getElementById("taskInput");

  const taskName = input.value.trim();

  if (taskName === "") {
    return;
  }

  tasks.push({
    name: taskName,
    done: false
  });

  input.value = "";

  saveTasks();

  displayTasks();

}


// DISPLAY TASKS
function displayTasks() {

  const list = document.getElementById("taskList");

  list.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    li.innerHTML = `
      <span
        onclick="toggleTask(${index})"
        style="
          cursor: pointer;
          ${task.done ? "text-decoration: line-through;" : ""}
        "
      >
        ${task.name}
      </span>

      <button onclick="deleteTask(${index})">
        ❌
      </button>
    `;

    list.appendChild(li);

  });

}


// TOGGLE TASK
function toggleTask(index) {

  tasks[index].done = !tasks[index].done;

  saveTasks();

  displayTasks();

}


// DELETE TASK
function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();

  displayTasks();

}


// PRESS ENTER TO ADD TASK
document
  .getElementById("taskInput")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

      addTask();

    }

  });


// LOGOUT
function logout() {

  auth.signOut()
    .then(() => {

      window.location.href = "login.html";

    });

}