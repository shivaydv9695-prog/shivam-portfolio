// ==========================================
// SHIVAM PRODUCTIVITY HUB - DASHBOARD
// ==========================================

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGsF1YWPYKBPxOYe2hDB-pPIvPV4P5L4c",
  authDomain: "shivam-productivity-hub.firebaseapp.com",
  projectId: "shivam-productivity-hub",
  storageBucket: "shivam-productivity-hub.firebasestorage.app",
  messagingSenderId: "612139607689",
  appId: "1:612139607689:web:db3a7de04b981ef3d5c858",
  measurementId: "G-2GN8FDVN0X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

let currentUser = null;


// ==========================================
// CHECK LOGIN
// ==========================================

auth.onAuthStateChanged((user) => {

  if (user) {

    currentUser = user;

    console.log("Logged in:", user.email);

    // Show existing documents
    loadFiles("result");
    loadFiles("fee");
    loadFiles("certificate");

  } else {

    currentUser = null;

    // Not logged in -> login page
    window.location.href = "login.html";
  }

});


// ==========================================
// UPLOAD FILE
// ==========================================

function uploadFile(type) {

  if (!currentUser) {
    alert("Please login first.");
    return;
  }

  let input;

  // Select correct input
  if (type === "result") {
    input = document.getElementById("resultFile");
  }

  if (type === "fee") {
    input = document.getElementById("feeFile");
  }

  if (type === "certificate") {
    input = document.getElementById("certificateFile");
  }

  if (!input) {
    alert("File input not found.");
    return;
  }

  const file = input.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  // Maximum 10 MB
  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {
    alert("File size must be less than 10 MB.");
    return;
  }

  const status = document.getElementById("status");

  if (status) {
    status.innerText = "Uploading... Please wait";
  }


  // Each user gets separate folder
  const safeFileName = file.name.replace(/[^\w.\-]/g, "_");

  const filePath =
    `users/${currentUser.uid}/${type}/${Date.now()}_${safeFileName}`;

  const storageRef = storage.ref(filePath);


  // Upload
  storageRef.put(file)

    .then(() => {

      if (status) {
        status.innerText = "File uploaded successfully ✅";
      }

      // Clear file input
      input.value = "";

      // Refresh list
      loadFiles(type);

    })

    .catch((error) => {

      console.error("Upload error:", error);

      if (status) {
        status.innerText =
          "Upload failed ❌ " + error.message;
      }

    });

}


// ==========================================
// LOAD / SHOW FILES
// ==========================================

function loadFiles(type) {

  if (!currentUser) {
    return;
  }

  const list = document.getElementById(type + "List");

  if (!list) {
    console.error(type + "List element not found.");
    return;
  }

  list.innerHTML = "Loading...";


  const folderRef =
    storage.ref(`users/${currentUser.uid}/${type}`);


  folderRef.listAll()

    .then((result) => {

      list.innerHTML = "";

      // No files
      if (result.items.length === 0) {

        list.innerHTML =
          "<p>No documents uploaded yet.</p>";

        return;
      }


      // Display every file
      result.items.forEach((itemRef) => {

        itemRef.getDownloadURL()

          .then((url) => {

            // Container
            const fileBox =
              document.createElement("div");

            fileBox.style.marginBottom = "12px";


            // File link
            const link =
              document.createElement("a");

            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            // Remove timestamp from displayed name
            const displayName =
              itemRef.name.replace(/^\d+_/, "");

            link.innerText =
              "📄 View " + displayName;


            // Delete button
            const deleteButton =
              document.createElement("button");

            deleteButton.innerText = "Delete";

            deleteButton.style.marginLeft = "10px";


            deleteButton.onclick = function () {

              const confirmDelete =
                confirm(
                  "Are you sure you want to delete this document?"
                );

              if (!confirmDelete) {
                return;
              }


              itemRef.delete()

                .then(() => {

                  if (document.getElementById("status")) {
                    document.getElementById("status").innerText =
                      "Document deleted successfully.";
                  }

                  loadFiles(type);

                })

                .catch((error) => {

                  console.error(
                    "Delete error:",
                    error
                  );

                  alert(
                    "Unable to delete file: " +
                    error.message
                  );

                });

            };


            fileBox.appendChild(link);
            fileBox.appendChild(deleteButton);

            list.appendChild(fileBox);

          })

          .catch((error) => {

            console.error(
              "Download URL error:",
              error
            );

          });

      });

    })

    .catch((error) => {

      console.error(
        "Unable to load documents:",
        error
      );

      list.innerHTML =
        "<p>Unable to load documents.</p>";

    });

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

  auth.signOut()

    .then(() => {

      window.location.href = "login.html";

    })

    .catch((error) => {

      console.error("Logout error:", error);

      alert(
        "Logout failed: " + error.message
      );

    });

}