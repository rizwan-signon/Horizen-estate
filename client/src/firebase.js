// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "horizen-a3a33.firebaseapp.com",
  projectId: "horizen-a3a33",
  storageBucket: "horizen-a3a33.appspot.com",
  messagingSenderId: "487863430470",
  appId: "1:487863430470:web:5c40706dac0c84afd7c947",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
