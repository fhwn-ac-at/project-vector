// This sample application is using 9.22, make sure you are importing the same version

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging-sw.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAy5yYk8kphsK0s34BUev23PV8lubiUS6k",
    authDomain: "vector-d2098.firebaseapp.com",
    projectId: "vector-d2098",
    storageBucket: "vector-d2098.firebasestorage.app",
    messagingSenderId: "1057153687079",
    appId: "1:1057153687079:web:35a651054ee8670c9cf802"
});

const messaging = getMessaging(firebaseApp);