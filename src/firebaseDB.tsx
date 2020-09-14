import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFFfpW5QNobVSOlb340rHkljGwqRkQ3ck",
  authDomain: "facebook-e2ff6.firebaseapp.com",
  databaseURL: "https://facebook-e2ff6.firebaseio.com",
  projectId: "facebook-e2ff6",
  storageBucket: "facebook-e2ff6.appspot.com",
  messagingSenderId: "840295614408",
  appId: "1:840295614408:web:dc54f8128d290944ac22fd",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
