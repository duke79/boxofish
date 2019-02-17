import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCiquo_zG5wVmyhMUiiBLv7n___xlBA5PU",
  authDomain: "vilokanlabs-e8847.firebaseapp.com",
  databaseURL: "https://vilokanlabs-e8847.firebaseio.com",
  projectId: "vilokanlabs-e8847",
  storageBucket: "vilokanlabs-e8847.appspot.com",
  messagingSenderId: "422886694568"
};
firebase.initializeApp(config);

var email = "pulkitsingh01@gmail.com";
var password = "dynamic"
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

// Get a reference to the database service
export var database = firebase.database();
// var mirror1 = database.ref("TorAssist");
// mirror1.once('value').then((snapshot)=>{
//   var tbp = snapshot.val().TBP;
//   console.log(tbp);
// });

// var mirror1 = database.ref("TorAssist").ref("TBP").ref("mirror1");
// console.log(mirror1)

export function userAlreadyLoggedIn(callback){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        callback();
    }
});
}