import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDj1t_vQpwE3XF38PbuRPWPIQKIOye__SA",
  authDomain: "e-commerce-39f9e.firebaseapp.com",
  projectId: "e-commerce-39f9e",
  storageBucket: "e-commerce-39f9e.appspot.com",
  messagingSenderId: "293392013585",
  appId: "1:293392013585:web:e5d6017467bf45501254b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }