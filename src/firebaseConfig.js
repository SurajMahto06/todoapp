import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDySBR8nLagSmAtQa2cOIkwTIPssEr2LW4",
  authDomain: "todoapp-8e145.firebaseapp.com",
  projectId: "todoapp-8e145",
  storageBucket: "todoapp-8e145.firebasestorage.app",
  messagingSenderId: "1033011646471",
  appId: "1:1033011646471:web:ee7f802e7e1fa8debfdaa2",
  measurementId: "G-M4LPFCKTV2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
