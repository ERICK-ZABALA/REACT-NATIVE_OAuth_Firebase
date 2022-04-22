import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBpXwFoUGUrCz1i49CwX9KT3e4UUMkBdYI",
    authDomain: "essencity.firebaseapp.com",
    projectId: "essencity",
    storageBucket: "essencity.appspot.com",
    messagingSenderId: "340339418299",
    appId: "1:340339418299:web:c111249f57da4fb2ecf59e"
  };
 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  const db = firebase.firestore();
  
  export default {
      firebase,
      db,
  }