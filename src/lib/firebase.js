// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEVkOPrNUHTkLHarXlKuaiBWQlxTGhzvQ",
    authDomain: "novaris-eaaf2.firebaseapp.com",
    projectId: "novaris-eaaf2",
    storageBucket: "novaris-eaaf2.appspot.com",
    messagingSenderId: "624984763897",
    appId: "1:624984763897:web:44270738cbba6c11f92128"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)