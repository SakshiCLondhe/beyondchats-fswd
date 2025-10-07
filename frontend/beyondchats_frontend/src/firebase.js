// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZH0Q0gs7fVhILynl-oeUSO3xvjluQHks",
  authDomain: "beyondchats-database.firebaseapp.com",
  projectId: "beyondchats-database",
  storageBucket: "beyondchats-database.firebasestorage.app",
  messagingSenderId: "951592538719",
  appId: "1:951592538719:web:4d2405ed9c97cafa1081ea",
  measurementId: "G-HT2Z9C1B9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);