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
    if (snapshot.exists()) {
      const posts = Object.entries(snapshot.val());
      return posts;
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

export const getCommentsByPost = async (postId) => {
    try {
        const comments = query(ref(database, "comments"), orderByChild("relatedPost"), equalTo(postId));
        const snapshot = await get(comments);
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          throw new Error('Data not found!');
        }
    } catch (error) {
      return error.message;
    }
}

export const getSingleComment = async (commentId) => {
  try {
    const snapshot = await get(ref(database, `comments/${commentId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return error.message;
  }
}

export const updatePostLikes = async (postId, postLikedBy) => {
  try {
    return await update(ref(database, `posts/${postId}`), {postLikedBy});
  } catch (error) {
    return error.message;
  }
}

export const updateCommentLikes = async (commentId, commentLikedBy) => {
  try {
    return await update(ref(database, `comments/${commentId}`), {commentLikedBy});
  } catch (error) {
    return error.message;
  }
}

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

export const createComment = async (commentDetails) => {
  try {
    return await set(ref(database, `comments/${commentDetails.id}`), commentDetails);
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

export const removePost = async (postId) => {
  try {
    return await set(ref(database, `posts/${postId}`), null);
  } catch (error) {
    return error.message;
  }
}

export const updatePostContent = async (postId, newContent) => {
  try {
    return await update(ref(database, `posts/${postId}`), { postContent: newContent });
  } catch (error) {
    return error.message;
  }
}