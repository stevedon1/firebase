// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABqMVx1IRuh94ToKZAqpaX4AUL_H8XoeM",
  authDomain: "tutorial1-69e1d.firebaseapp.com",
  projectId: "tutorial1-69e1d",
  storageBucket: "tutorial1-69e1d.appspot.com",
  messagingSenderId: "1074960362083",
  appId: "1:1074960362083:web:eea5b7cb52f57643242656",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Export Firestore instance
