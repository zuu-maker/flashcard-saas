// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "flashcards-5a8e8.firebaseapp.com",
  projectId: "flashcards-5a8e8",
  storageBucket: "flashcards-5a8e8.appspot.com",
  messagingSenderId: "989099649573",
  appId: "1:989099649573:web:f4f1cca57d4f6770602dcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;