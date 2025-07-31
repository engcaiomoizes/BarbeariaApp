import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATIwQan9lT4W2C8VxEAJ_cjwxlqGOImiE",
  authDomain: "barbearia-app-cdd3f.firebaseapp.com",
  projectId: "barbearia-app-cdd3f",
  storageBucket: "barbearia-app-cdd3f.firebasestorage.app",
  messagingSenderId: "89113851340",
  appId: "1:89113851340:web:089e7fb9922f0a9e7ad969"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);