// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMO6kvSbChmMJyiAFLU1Ilkz9IkWMVFKk",
  authDomain: "camp7-18400.firebaseapp.com",
  projectId: "camp7-18400",
  storageBucket: "camp7-18400.appspot.com",
  messagingSenderId: "23467939028",
  appId: "1:23467939028:web:4f0020ceee05639b369741",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
