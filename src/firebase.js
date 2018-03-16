import firebase from "firebase"


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZ38u3Qm8M6y9wCBCK1MrcdcxHEvMw7pc",
    authDomain: "chatku-ae945.firebaseapp.com",
    databaseURL: "https://chatku-ae945.firebaseio.com",
    projectId: "chatku-ae945",
    storageBucket: "chatku-ae945.appspot.com",
    messagingSenderId: "751248852371"
  };

  firebase.initializeApp(config);

  const database = firebase.database()

  export {database};
