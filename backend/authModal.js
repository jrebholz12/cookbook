// Get modal and close button elements
const modal = document.getElementById('authModal');
const authLink = document.getElementById('authLink');
const closeBtn = document.querySelector('.close');

// Get sign-in and sign-up containers
const signInContainer = document.getElementById('sign-in-container');
const signUpContainer = document.getElementById('sign-up-container');

// Get the toggle links
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToSignIn = document.getElementById('switchToSignIn');

// Open modal when the sign-in/sign-up link is clicked
authLink.addEventListener('click', (event) => {
  event.preventDefault();
  let text = document.getElementById('authLink').innerHTML
  if(text == "Sign Out"){
    modal.style.display = 'none'
    console.log('nonono')
  } else
  modal.style.display = 'block';
  signInContainer.style.display = 'flex'; // Show sign-in form by default
  signUpContainer.style.display = 'none';  // Hide sign-up form by default
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

// Switch to the Sign-Up form
switchToSignUp.addEventListener('click', (event) => {
  event.preventDefault();
  signInContainer.style.display = 'none';
  signUpContainer.style.display = 'flex';
});

// Switch back to the Sign-In form
switchToSignIn.addEventListener('click', (event) => {
  event.preventDefault();
  signInContainer.style.display = 'flex';
  signUpContainer.style.display = 'none';
});
