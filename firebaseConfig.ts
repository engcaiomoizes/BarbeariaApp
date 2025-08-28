import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
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

// Inicialize o Auth com persistência usando o AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);