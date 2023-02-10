// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBnMj84jbyfRa_igf204NrLV2z8BTIIuE",
  authDomain: "realtor-clone-8f6bb.firebaseapp.com",
  projectId: "realtor-clone-8f6bb",
  storageBucket: "realtor-clone-8f6bb.appspot.com",
  messagingSenderId: "10710831560",
  appId: "1:10710831560:web:8310ed9a3a05d98b1370fd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()