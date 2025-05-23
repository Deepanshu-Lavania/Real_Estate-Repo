// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realestate-612fd.firebaseapp.com",
  projectId: "mern-realestate-612fd",
  storageBucket: "mern-realestate-612fd.firebasestorage.app",
  messagingSenderId: "128900015689",
  appId: "1:128900015689:web:972c3ecac3ab1dd1eb0198",
  measurementId: "G-TGXPVTMPC1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);