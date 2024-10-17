// login.js
import { handleLogin } from './firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await handleLogin(email, password);
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  });
});