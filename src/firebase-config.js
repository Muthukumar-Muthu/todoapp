import { getFirestore } from "firebase/firestore";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyArliA2hS75Ut2ABVkmpvzNqfpkFG5cb20",
  authDomain: "to-do-ca959.firebaseapp.com",
  projectId: "to-do-ca959",
  storageBucket: "to-do-ca959.appspot.com",
  messagingSenderId: "584771455473",
  appId: "1:584771455473:web:7825610b4c37231e0b5c50",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { app, db };
