import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
