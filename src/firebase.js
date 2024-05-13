// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-clone-nextjs-35328.firebaseapp.com",
  projectId: "insta-clone-nextjs-35328",
  storageBucket: "insta-clone-nextjs-35328.appspot.com",
  messagingSenderId: "858135116547",
  appId: "1:858135116547:web:f012090c82253568dc0736",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
