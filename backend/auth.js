import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { getLastName, initiateTheme } from './docs.js';

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

// Set persistence when the app initializes
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local.');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error.message);
  });

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
      console.log('User signed up:', userCredential.user);
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
      console.log('User signed in:', userCredential.user);
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
      console.log('User signed out');
      authLink.innerText = 'Sign In';
      document.getElementById('settingsContainer').classList.add('display-off');
      document.getElementById('familyName').innerHTML = "Your Name Here"
      initiateTheme()
    })
    .catch((error) => {
      console.error('Error signing out:', error.message);
    });
}

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('settingsContainer').classList.remove('display-off');
    console.log('User is signed in:', user);
    authLink.innerText = 'Sign Out';
    getLastName();   // Fetch last name from Firestore
    initiateTheme(); // Apply the user's theme
  } else {
    console.log('User is signed out');
    authLink.innerText = 'Sign In';
    document.getElementById('settingsContainer').classList.add('display-off');
  }
});
