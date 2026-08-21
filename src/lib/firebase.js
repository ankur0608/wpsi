// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM82LY5rcuSrqho72yDUjs_VZVvjFpPbw",
  authDomain: "mcqprepzone-79d4f.firebaseapp.com",
  projectId: "mcqprepzone-79d4f",
  storageBucket: "mcqprepzone-79d4f.firebasestorage.app",
  messagingSenderId: "966740932622",
  appId: "1:966740932622:web:44e7215bc21ef87a3ba45f",
  measurementId: "G-91G24C3FRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);