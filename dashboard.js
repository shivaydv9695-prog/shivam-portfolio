const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

let currentUser = null;


// CHECK LOGIN
auth.onAuthStateChanged((user) => {

  if (user) {

    currentUser = user;

    // Login hone ke baad files show karo
    loadFiles("result");
    loadFiles("fee");
    loadFiles("certificate");

  } else {

    // Login nahi hai to login page
    window.location.href = "login.html";

  }

});


// UPLOAD FILE
function uploadFile(type) {

  if (!currentUser) {
    alert("Please login first");
    return;
  }

  let input;

  if (type === "result") {
    input = document.getElementById("resultFile");
  }

  if (type === "fee") {
    input = document.getElementById("feeFile");
  }

  if (type === "certificate") {
    input = document.getElementById("certificateFile");
  }

  const file = input.files[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  document.getElementById("status").innerText =
    "Uploading... Please wait ⏳";

  // Har user ka alag folder
  const filePath =
    `users/${currentUser.uid}/${type}/${Date.now()}_${file.name}`;

  const storageRef = storage.ref(filePath);

  storageRef.put(file)

    .then(() => {

      document.getElementById("status").innerText =
        "File uploaded successfully ✅";

      input.value = "";

      loadFiles(type);

    })

    .catch((error) => {

      console.error(error);

      document.getElementById("status").innerText =
        "Upload failed ❌ " + error.message;

    });

}


// SHOW / VIEW FILES
function loadFiles(type) {

  const list = document.getElementById(type + "List");

  list.innerHTML = "Loading...";

  const folderRef =
    storage.ref(`users/${currentUser.uid}/${type}`);

  folderRef.listAll()

    .then((result) => {

      list.innerHTML = "";

      if (result.items.length === 0) {

        list.innerHTML =
          "<p>No documents uploaded yet.</p>";

        return;
      }

      result.items.forEach((itemRef) => {

        itemRef.getDownloadURL()

          .then((url) => {

            const link =
              document.createElement("a");

            link.href = url;

            link.target = "_blank";

            link.innerText =
              "📄 View " +
              itemRef.name.replace(/^\d+_/, "");

            list.appendChild(link);

          });

      });

    })

    .catch((error) => {

      console.error(error);

      list.innerHTML =
        "Unable to load documents.";

    });

}


// LOGOUT
function logout() {

  auth.signOut()

    .then(() => {

      window.location.href =
        "login.html";

    });

}