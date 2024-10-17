import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDjsu5W2qG9ezC-qcSZ4h16xG4tTMxUQtY",
  authDomain: "quick-med-fee.firebaseapp.com",
  databaseURL: "https://quick-med-fee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quick-med-fee",
  storageBucket: "quick-med-fee.appspot.com",
  messagingSenderId: "723721140422",
  appId: "1:723721140422:web:2df3ed4ff8a4c503a67fc7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const handleLogout = async () => {
  try {
    await signOut(auth);
    window.location.href = '../html/login.html';
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '../html/dashboard.html';
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const handleSignup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = '../html/dashboard.html';
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};