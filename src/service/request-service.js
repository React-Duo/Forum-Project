import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  get,
  set,
  update,
  query,
  equalTo,
  orderByChild,
  orderByKey,
  goOnline,
  goOffline,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5oOxHK0BHyFKt-v8K5MWVyoNRu_UxA7Y",
  authDomain: "reactduo-forumproject.firebaseapp.com",
  databaseURL:
    "https://reactduo-forumproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactduo-forumproject",
  storageBucket: "reactduo-forumproject.appspot.com",
  messagingSenderId: "815156986137",
  appId: "1:815156986137:web:56e7e5a8cc0e1263b04588",
  measurementId: "G-PEX8JDPXWH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const getUsers = async () => {
  goOnline(database);

  try {
    const snapshot = await get(ref(database, "comments/1"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Data not found!");
    }
  } catch (error) {
    return error.message;
    } finally {
        goOffline(database);
  }
};

const result = await getUsers();
// console.log(result);

export const getPosts = async () => {
  goOnline(database);
  try {
    const snapshot = await get(ref(database, "posts"));
    if (snapshot.exists()) {
      return snapshot.val();
    }else {
        throw new Error('Data not found!');
  }
  } catch (error) {
    return error.message;
  } 
//   finally{
//     goOffline(database);
//   }
};


export const getComments = async () => {
    goOnline(database);
    try {
      const snapshot = await get(ref(database, "comments"));
      if (snapshot.exists()) {
        return snapshot.val();
      }else {
          throw new Error('Data not found!');
    }
    } catch (error) {
      return error.message;
    } 
  //   finally{
  //     goOffline(database);
  //   }
  };