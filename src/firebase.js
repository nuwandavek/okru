import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAHL0vbcWUxeE542F-ROGxw-4IG2OLM9EM",
    authDomain: "okru-4036a.firebaseapp.com",
    databaseURL: "https://okru-4036a.firebaseio.com",
    projectId: "okru-4036a",
    storageBucket: "okru-4036a.appspot.com",
    messagingSenderId: "323122678619",
    appId: "1:323122678619:web:f0624f8e6e26013509287e",
    measurementId: "G-LGV47H0SJQ"
};

firebase.initializeApp(config);
firebase.analytics();
export default firebase;