  // Import Firebase from CDN
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBnAzn18yGCVuWLUCx3KVC9Sf656MicZ38",
    authDomain: "rebzlist.firebaseapp.com",
    projectId: "rebzlist",
    storageBucket: "rebzlist.appspot.com",
    messagingSenderId: "319668133045",
    appId: "1:319668133045:web:bf7bc4fc3d1781db75f2fc",
    measurementId: "G-48186NQYRC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Example Firestore document save
  const saveUserData = async () => {
    try {
      await setDoc(doc(db, "users", "user123"), {
        name: "John Doe",
        email: "john@example.com"
      });
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  };

  saveUserData();

  const lastName = localStorage.getItem("lastName");

// Function to store localStorage data to Firestore
const saveToFirestore = async (lastName) => {
  if (lastName) {
    try {
      // Create a new document in Firestore (or update if it exists)
      await setDoc(doc(db, "users", lastName), {
        lastname: lastName
      });
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  } else {
    console.log("No data found in localStorage");
  }
};

// Call the function to save data
saveToFirestore(lastName);



