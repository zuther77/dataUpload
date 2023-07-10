// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDniH-SsBpegbCaPlQaPoXOXVS9EURQCmU",
  authDomain: "trekit-1e9d1.firebaseapp.com",
  projectId: "trekit-1e9d1",
  storageBucket: "trekit-1e9d1.appspot.com",
  messagingSenderId: "996473435961",
  appId: "1:996473435961:web:3986703d9f35c3cc6a9ae8",
  measurementId: "G-S55QG3TES2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const firestoreDB = getFirestore(app)

