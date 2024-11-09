// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpZlwnwMbSBXctS9NHf-RNFJfVevqypwg",
  authDomain: "taskfeature.firebaseapp.com",
  projectId: "taskfeature",
  storageBucket: "taskfeature.firebasestorage.app",
  messagingSenderId: "361951719276",
  appId: "1:361951719276:web:8c9b7d60f7d93006bc0d49",
  measurementId: "G-N6ZF3TNK3E"
}; // sử nếu biến môi trường phải sử dụng theo kiểu vite

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);