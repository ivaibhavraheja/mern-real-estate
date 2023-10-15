// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-3f605.firebaseapp.com",
  projectId: "mern-real-estate-3f605",
  storageBucket: "mern-real-estate-3f605.appspot.com",
  messagingSenderId: "1003270708900",
  appId: "1:1003270708900:web:c831a4dd181a5a241b9031"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);