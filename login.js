const firebaseConfig = {
  apiKey: "YOUR_EXISTING_API_KEY",
  authDomain: "shivam-productivity-hub.firebaseapp.com",
  projectId: "shivam-productivity-hub",
  storageBucket: "shivam-productivity-hub.firebasestorage.app",
  messagingSenderId: "612139607689",
  appId: "1:612139607689:web:db3a7de04b981ef3d5c858"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


// ==========================
// CREATE ACCOUNT
// ==========================
function signup() {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  if (email === "" || password === "") {
    status.innerText = "Please enter email and password.";
    return;
  }

  if (password.length < 6) {
    status.innerText = "Password must be at least 6 characters.";
    return;
  }

  status.innerText = "Creating account...";

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

      status.innerText = "Account created successfully!";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    })
    .catch((error) => {

      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        status.innerText = "This email already has an account. Please login.";
      }

      else if (error.code === "auth/invalid-email") {
        status.innerText = "Please enter a valid email address.";
      }

      else if (error.code === "auth/weak-password") {
        status.innerText = "Password must be at least 6 characters.";
      }

      else {
        status.innerText = error.message;
      }

    });
}


// ==========================
// LOGIN
// ==========================
function login() {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  if (email === "" || password === "") {
    status.innerText = "Please enter email and password.";
    return;
  }

  status.innerText = "Logging in...";

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

      status.innerText = "Login successful!";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);

    })
    .catch((error) => {

      console.error(error);

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-login-credentials" ||
        error.code === "auth/invalid-credential"
      ) {
        status.innerText = "Incorrect email or password.";
      }

      else if (error.code === "auth/invalid-email") {
        status.innerText = "Please enter a valid email address.";
      }

      else {
        status.innerText = "Login failed. Please check your email and password.";
      }

    });
}