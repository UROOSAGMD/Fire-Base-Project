 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBq87VDQ8A6L3xCBcW4BsMIJqKhWw1RDec",
  authDomain: "fb-project-8fd4e.firebaseapp.com",
  projectId: "fb-project-8fd4e",
  storageBucket: "fb-project-8fd4e.firebasestorage.app",
  messagingSenderId: "795606803513",
  appId: "1:795606803513:web:30218441c7c40c5e3f19e8",
  measurementId: "G-WQ3QFN20TP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
};


