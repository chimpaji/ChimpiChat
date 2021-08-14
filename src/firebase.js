import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNwOoZHeNEP-0SjZf2bVVprqHsb-Fq0Ig",
  authDomain: "kieng-ddb81.firebaseapp.com",
  databaseURL: "https://kieng-ddb81.firebaseio.com",
  projectId: "kieng-ddb81",
  storageBucket: "kieng-ddb81.appspot.com",
  messagingSenderId: "756304258143",
  appId: "1:756304258143:web:88341b2e56ae86db2a27ea",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
console.log("firebase", firebase);

export default firebase;
export const auth = firebase.auth;
