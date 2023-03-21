// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG_BWWzj2jqCPMOyjjX5rZ5SS9uPwpXuI",
  authDomain: "fir-practice-10f50.firebaseapp.com",
  projectId: "fir-practice-10f50",
  storageBucket: "fir-practice-10f50.appspot.com",
  messagingSenderId: "925288766469",
  appId: "1:925288766469:web:cd1ecc40012d7e51ef906c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();