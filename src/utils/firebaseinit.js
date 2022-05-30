// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAeyRaNJgYXlFjklDVeN8UZR0ruxYR3jw",
  authDomain: "web32v2.firebaseapp.com",
  projectId: "web32v2",
  storageBucket: "web32v2.appspot.com",
  messagingSenderId: "466267194963",
  appId: "1:466267194963:web:806747dfb5a00daffc68a6",
  measurementId: "G-PKMCEVE7PN"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase_app);

export default firebase_app;