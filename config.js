 import firebase from 'firebase'
 require ('@firebase/firestore')
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDa6OZ9Ai96HVyHyJXa5SuWQu_M-fAvFZA",
    authDomain: "project-71-e9138.firebaseapp.com",
    projectId: "project-71-e9138",
    storageBucket: "project-71-e9138.appspot.com",
    messagingSenderId: "783684047398",
    appId: "1:783684047398:web:bdab4b05f7e5f5a8488ce7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()