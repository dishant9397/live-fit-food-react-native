import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAixSZZcvKI-OPXkSK8pQYA3jJ3a72kUBk",
    authDomain: "finalproject-842af.firebaseapp.com",
    databaseURL: "https://finalproject-842af.firebaseio.com",
    projectId: "finalproject-842af",
    storageBucket: "finalproject-842af.appspot.com",
    messagingSenderId: "877653270100",
    appId: "1:877653270100:web:50e1c5afda38c7b15157c1",
    measurementId: "G-2RPBL4QD29"
  };

  firebase.initializeApp(config);

  const database = firebase.firestore()
  export default database;
