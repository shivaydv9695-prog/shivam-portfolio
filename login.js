const firebaseConfig = {
  apiKey: "AIzaSyBGsF1YWPYKBPxOYe2hDB-pPIvPV4P5L4c",
  authDomain: "shivam-productivity-hub.firebaseapp.com",
  projectId: "shivam-productivity-hub",
  storageBucket: "shivam-productivity-hub.firebasestorage.app",
  messagingSenderId: "612139607689",
  appId: "1:612139607689:web:db3a7de04b981ef3d5c858"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


// ===============================
// CREATE ACCOUNT
// ===============================

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

      console.log("Account created:", userCredential.user);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    })

    .catch((error) => {

      console.error(error);

      if (error.code === "auth/email-already-in-use") {

        status.innerText =
          "This email already has an account. Please login.";

      }

      else if (error.code === "auth/invalid-email") {

        status.innerText =
          "Please enter a valid email address.";

      }

      else if (error.code === "auth/weak-password") {

        status.innerText =
          "Password must be at least 6 characters.";

      }

      else if (error.code === "auth/operation-not-allowed") {

        status.innerText =
          "Email/Password login is not enabled in Firebase.";

      }

      else {

        status.innerText =
          "Signup failed: " + error.message;

      }

    });

}


// ===============================
// LOGIN
// ===============================

function login() {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  if (email === "" || password === "") {

    status.innerText =
      "Please enter email and password.";

    return;

  }

  status.innerText = "Logging in...";

  auth.signInWithEmailAndPassword(email, password)

    .then((userCredential) => {

      status.innerText = "Login successful!";

      console.log("Logged in:", userCredential.user);

      setTimeout(() => {

        window.location.href =
          "dashboard.html";

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

        status.innerText =
          "Incorrect email or password.";

      }

      else if (error.code === "auth/invalid-email") {

        status.innerText =
          "Please enter a valid email address.";

      }

      else if (error.code === "auth/operation-not-allowed") {

        status.innerText =
          "Email/Password login is not enabled in Firebase.";

      }

      else {

        status.innerText =
          "Login failed: " + error.message;

      }

    });

}