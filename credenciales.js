// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBTZ7OIhm2bpGVePdIPDjgrewyNOIvat0",
  authDomain: "tienda-e41bc.firebaseapp.com",
  projectId: "tienda-e41bc",
  storageBucket: "tienda-e41bc.firebasestorage.app",
  messagingSenderId: "105713052405",
  appId: "1:105713052405:web:a33f9641fb4b9956e8b3bc"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;