import database from '../config/firebase-config.js';
import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey, goOnline, goOffline } from "firebase/database";

export const getUsers = async () => {
  goOnline(database);

  try {
    const snapshot = await get(ref(database, "users"));
    if (snapshot.exists()) {
      // goOffline(database);
      return snapshot.val();
    } else {
      throw new Error("Data not found!");
    }
  } catch (error) {
    // goOffline(database);
    return error.message;
    } 
};

export const getPosts = async () => {
  goOnline(database);
  try {
    const snapshot = await get(ref(database, "posts"));

    console.log(snapshot);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }else {
        throw new Error('Data not found!');
  }
  } catch (error) {
    return error.message;
  } 
  // finally{
  //   goOffline(database);
  // }
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
    // finally{
    //   goOffline(database);
    // }
  };


export const checkIfUserExists = async (username) => {
  goOnline(database);
  try {
    const snapshot = await get(ref(database, `users/${username}`));
    //goOffline(database);
    return snapshot;
  } catch (error) {
      //goOffline(database);
      return error.message;
    } 
}

export const createUser = async (userDetails) => {
  try {
    return await set(ref(database, `users/${userDetails.username}`), userDetails);
  } catch (error) {
    return error.message;
  }
}

export const getPostById = async (postId) => {
  try {
    const snapshot = await get(ref(database, `posts/${postId}`));
    if (snapshot.exists()) {
      // goOffline(database);
      return snapshot.val();
    } else {
      throw new Error("Data not found!");
    }
  } catch (error) {
    return error.message;
  }
}


export const createPost = async (postDetails) => {
  try {
    return await set(ref(database, `posts/${postDetails.Id}`), postDetails);
  } catch (error) {
    return error.message;
  }
}


export const likePost = async (postId, user) => {
  try {
    return await set(ref(database, `posts/${postId}/postLikedBy/${user}`), true);
  } catch (error) {
    return error.message;
  }
};

export const unlikePost = async (postId, user) => {
  try {
    return await set(ref(database, `posts/${postId}/postLikedBy/${user}`), null);
  } catch (error) {
    return error.message;
  }
}