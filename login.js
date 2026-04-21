const firebaseConfig = {
    apiKey: "AIzaSyBGsF1YWPYKBPxOYe2hDB-pPIvPV4P5L4c",
    authDomain: "shivam-productivity-hub.firebaseapp.com",
    projectId: "shivam-productivity-hub",
    storageBucket: "shivam-productivity-hub.firebasestorage.app",
    messagingSenderId: "612139607689",
    appId: "1:612139607689:web:db3a7de04b981ef3d5c858",
    measurementId: "G-2GN8FDVN0X"
  };
// Firebase init
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup
function signup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("status").innerText = "Signup Success ✅";
    })
    .catch(err => alert(err.message));
}

// Login
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
     window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

// Logout
function logout() {
  auth.signOut();
  document.getElementById("status").innerText = "Logged Out ❌";
}