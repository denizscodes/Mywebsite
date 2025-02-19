import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCV6E-YLnxigqioP63kw_g0Msar9RAep_I",
  authDomain: "portfolio-dc806.firebaseapp.com",
  projectId: "portfolio-dc806",
  storageBucket: "portfolio-dc806.firebasestorage.app",
  messagingSenderId: "219197226963",
  appId: "1:219197226963:web:eb3e4919ca9e0e37c4b926",
  measurementId: "G-HGTMLZQCPP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
