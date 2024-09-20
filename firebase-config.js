  // Import Firebase from CDN
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
  import { getAuth } from "firebase/auth";

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
  