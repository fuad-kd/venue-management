// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this object with your actual Firebase config keys!
const firebaseConfig = {
  apiKey: "AIzaSyDjMQ3mkhJa2g4J6cHjMm4neLjVID-eTEY",
  authDomain: "community-venue-project-2026.firebaseapp.com",
  projectId: "community-venue-project-2026",
  storageBucket: "community-venue-project-2026.firebasestorage.app",
  messagingSenderId: "215062755508",
  appId: "1:215062755508:web:5f359fa6ce109a71c5bfe1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them so other files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
// Inside your firebase.js
import { getStorage } from "firebase/storage";
// ... your other imports

export const storage = getStorage(app);
// ... your other exports

export default app;