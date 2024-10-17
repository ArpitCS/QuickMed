// Import Firebase services using CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyDjsu5W2qG9ezC-qcSZ4h16xG4tTMxUQtY",
    authDomain: "quick-med-fee.firebaseapp.com",
    projectId: "quick-med-fee",
    storageBucket: "quick-med-fee.appspot.com",
    messagingSenderId: "723721140422",
    appId: "1:723721140422:web:2df3ed4ff8a4c503a67fc7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = 'en';


export { app, db, auth };