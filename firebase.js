// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrKpVBJW7_CZbJ-sDO0sDeA1ihzbsqxdE",
    authDomain: "westwood-ranked.firebaseapp.com",
    projectId: "westwood-ranked",
    storageBucket: "westwood-ranked.firebasestorage.app",
    messagingSenderId: "421131337542",
    appId: "1:421131337542:web:a0069558ef5dad316eaf47",
    measurementId: "G-X4TF44GPLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();