// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYrcokdYpjlVzoQ0rXVYNzGG89OeEC0IE",
  authDomain: "food-ordering-420013.firebaseapp.com",
  projectId: "food-ordering-420013",
  storageBucket: "food-ordering-420013.appspot.com",
  messagingSenderId: "690918685115",
  appId: "1:690918685115:web:b2b5a021d45b9ef0bf2c9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;
