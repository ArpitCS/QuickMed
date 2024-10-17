
// signup.js
import { handleSignup } from './firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await handleSignup(email, password);
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  });
});