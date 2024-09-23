//Imports needed functions
import { toggleSettings } from "../backend/page-folders/backend-index.js";
import { sortTabs } from "../backend/page-folders/global-js.js";
import { updateLastName, getLastName, changeTheme, initiateTheme } from "../backend/docs.js";
import { auth, db } from '../backend/firebase.js';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

let defaultUnitInputList = ['g','tsp', 'ea', 'can', 'bunch', 'tbs', 'quart', 'gallon', 'oz', 'clove', 'cup', 'loaf', 'slice', 'lb', 'pack', 'bunch', 'jar'];
let unitInputList = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadUnitInputList(user);
  } else {
  }
});

// Function to load units from Firestore or default to predefined list
export async function loadUnitInputList() {
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, 'users', user.uid, 'data', 'unitList');
    
    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // Get the saved units from Firestore
        unitInputList = docSnap.data().unitList || defaultUnitInputList;
      } else {
        // Use the default list if no custom list is found
        unitInputList = defaultUnitInputList;
      }
    } catch (error) {
      console.error("Error fetching unit list from Firestore:", error);
      // Fallback to default list in case of error
      unitInputList = defaultUnitInputList;
    }
  } else {
    // No user is signed in, use default list
    unitInputList = defaultUnitInputList;
  }
}

// Wrap all your initialization inside an async function that waits for the user authentication
async function initializeApp() {
  // Set persistence for the session
  await setPersistence(auth, browserLocalPersistence)
    .catch((error) => console.error('Error setting persistence:', error.message));

  // Wait for authentication state change
  onAuthStateChanged(auth, async (user) => {
    if (user) {

      // Fetch user data (last name and theme)
      await getLastName();
      await initiateTheme();

      // Update UI to reflect sign-in status
      authLink.innerText = 'Sign Out';
      document.getElementById('settingsContainer').classList.remove('display-off');

      // Load other DOM-related functions
      sortTabs('home', 'home');

    } else {
      authLink.innerText = 'Sign In';
      document.getElementById('settingsContainer').classList.add('display-off');

      // You can initialize the theme and other things for unauthenticated users here if needed
      initiateTheme();
    }
  });
}

// Call this function after DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp(); // Ensure the app initializes after the DOM is ready
});

// Modal and authentication handling logic remains the same
const modal = document.getElementById('authModal');
const authLink = document.getElementById('authLink');
const closeBtn = document.querySelector('.close');
const signInContainer = document.getElementById('sign-in-container');
const signUpContainer = document.getElementById('sign-up-container');
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToSignIn = document.getElementById('switchToSignIn');

// Sign In and Sign Up Buttons
const signInForm = document.getElementById('signInButton');
const signUpForm = document.getElementById('signUpButton');

// Open modal when the sign-in/sign-up link is clicked
authLink.addEventListener('click', (event) => {
  event.preventDefault();
  if (authLink.innerText === 'Sign Out') {
    signOutUser(); // Sign out if user is already signed in
  } else {
    modal.style.display = 'block';
    signInContainer.style.display = 'flex';
    signUpContainer.style.display = 'none';
  }
});

// Close modal when the 'X' is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if user clicks outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Switch between Sign-Up and Sign-In forms
switchToSignUp.addEventListener('click', (event) => {
  event.preventDefault();
  signInContainer.style.display = 'none';
  signUpContainer.style.display = 'flex';
});

switchToSignIn.addEventListener('click', (event) => {
  event.preventDefault();
  signInContainer.style.display = 'flex';
  signUpContainer.style.display = 'none';
});

// Sign Up Function
signUpForm.addEventListener('click', () => {
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      modal.style.display = 'none'; // Close modal on successful sign-up
    })
    .catch((error) => {
      console.error('Error signing up:', error.message);
      alert('Error: ' + error.message);
    });
});

// Sign In Function
signInForm.addEventListener('click', () => {
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      modal.style.display = 'none'; // Close modal on successful sign-in
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        displayError('Error: Invalid email.');
      } else if (errorCode === 'auth/wrong-password') {
        displayError('Error: Incorrect password.');
      } else {
        displayError('Error: ' + errorMessage);
      }
    });
});

// Display error message below input fields
function displayError(message) {
  const errorElement = document.createElement('div');
  errorElement.style.color = 'red';
  errorElement.innerText = message;
  document.getElementById('sign-in-container').appendChild(errorElement);
}

// Sign Out Function
function signOutUser() {
  signOut(auth)
    .then(() => {
      authLink.innerText = 'Sign In';
      document.getElementById('settingsContainer').classList.add('display-off');
      document.getElementById('familyName').innerHTML = 'Your Name Here';
      initiateTheme();
    })
    .catch((error) => {
      console.error('Error signing out:', error.message);
    });
}

// Event Listeners for settings
document.getElementById('settingsImage').addEventListener('click', toggleSettings);
document.getElementById('last-name-indicator').addEventListener('keydown', (event) => updateLastName(event));
document.getElementById('lightTheme').addEventListener('click', () => changeTheme('light'));
document.getElementById('darkTheme').addEventListener('click', () => changeTheme('dark'));
