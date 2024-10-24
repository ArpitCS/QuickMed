// dashboard.js
import { auth, handleLogout } from './firebase-auth.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');
  const userInfoElement = document.getElementById('user-info');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userInfoElement.textContent = user.email;
    } else {
      window.location.href = '../html/login.html';
    }
  });

  logoutButton.addEventListener('click', handleLogout);
});