// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxRGdtnDNA4dJr22yFF-WDdf272fQ-Gi4",
  authDomain: "insta-2point0.firebaseapp.com",
  projectId: "insta-2point0",
  storageBucket: "insta-2point0.appspot.com",
  messagingSenderId: "806169365420",
  appId: "1:806169365420:web:460c2feaab34458ba88809",
  measurementId: "G-WBK5K2M5S9"
};

// Initialize Firebase
const app = !getApps().length ?  initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}
// const analytics = getAnalytics(app);