importScripts('/assets/firebase-app.js');
importScripts('/assets/firebase-messaging.js');


firebase.initializeApp({
    /* apiKey: "AIzaSyAy5yYk8kphsK0s34BUev23PV8lubiUS6k",
     authDomain: "vector-d2098.firebaseapp.com",
     projectId: "vector-d2098",
     storageBucket: "vector-d2098.firebasestorage.app",*/
    messagingSenderId: "1057153687079",
    //   appId: "1:1057153687079:web:35a651054ee8670c9cf802"
});

const messaging = firebase.messaging();
