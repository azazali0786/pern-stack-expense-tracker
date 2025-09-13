// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQAec4_CwIOMdHa19JIf2pkwnvIBQpWCI",
  authDomain: "expence-app-9c47f.firebaseapp.com",
  projectId: "expence-app-9c47f",
  storageBucket: "expence-app-9c47f.firebasestorage.app",
  messagingSenderId: "786474351427",
  appId: "1:786474351427:web:aeae93159b035288084df6",
  measurementId: "G-R1KRTMDNPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export {app, auth};