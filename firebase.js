// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo_n8CdH25POGIhflYuQ-epoxuFp2J_uw",
  authDomain: "github-repo-d8bf0.firebaseapp.com",
  projectId: "github-repo-d8bf0",
  storageBucket: "github-repo-d8bf0.firebasestorage.app",
  messagingSenderId: "1057050170499",
  appId: "1:1057050170499:web:536750b7615470194b77b6",
  measurementId: "G-J8QPXRD65L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);