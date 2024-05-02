import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB5oOxHK0BHyFKt-v8K5MWVyoNRu_UxA7Y",
    authDomain: "reactduo-forumproject.firebaseapp.com",
    databaseURL: "https://reactduo-forumproject-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reactduo-forumproject",
    storageBucket: "reactduo-forumproject.appspot.com",
    messagingSenderId: "815156986137",
    appId: "1:815156986137:web:56e7e5a8cc0e1263b04588",
    measurementId: "G-PEX8JDPXWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);





