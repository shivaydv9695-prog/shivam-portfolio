const firebaseConfig = {
    apiKey: "AIzaSyBGsF1YWPYKBPxOYe2hDB-pPIvPV4P5L4c",
    authDomain: "shivam-productivity-hub.firebaseapp.com",
    projectId: "shivam-productivity-hub",
    storageBucket: "shivam-productivity-hub.firebasestorage.app",
    messagingSenderId: "612139607689",
    appId: "1:612139607689:web:db3a7de04b981ef3d5c858",
    measurementId: "G-2GN8FDVN0X"
  };
// Firebase start
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
let tasks = [];
let userId = null;
auth.onAuthStateChanged(user => {
  if (user) {
    userId = user.uid;
    loadTasks();   // 🔥 yaha call karna hai
  } else {
    window.location.href = "login.html";
  }
});
// ✅ Add Task
function loadTasks() {
  db.collection("tasks")
    .doc(userId)
    .get()
    .then(doc => {
      if (doc.exists) {
        tasks = doc.data().tasks;
      } else {
        tasks = [];
      }
      displayTasks();
    });
}
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value;

  if (task === "") return;

  tasks.push({ name: task, done: false });
  displayTasks();
  input.value = "";
}

// ✅ Show Tasks
function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((t, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})" style="cursor:pointer;">
        ${t.name}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    if (t.done) {
      li.style.textDecoration = "line-through";
    }

    list.appendChild(li);
  });
db.collection("tasks").doc(userId).set({
  tasks: tasks
});
}
// ✅ Toggle Task (done / not done)
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  displayTasks();
}

// ✅ Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// ✅ Page load pe run
displayTasks();

// ✅ Logout
function logout() {
  auth.signOut();
  window.location.href = "login.html";
}