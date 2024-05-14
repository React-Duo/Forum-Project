import database from '../config/firebase-config.js';
import { ref, get, set, update, query, equalTo, orderByChild, goOnline } from "firebase/database";

/**
 * Retrieves the list of users from the database.
 * @returns {Promise<Object|String>} A promise that resolves to the list of users if successful, or an error message if unsuccessful.
 */
export const getUsers = async () => {
  goOnline(database);

  try {
    const snapshot = await get(ref(database, "users"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Data not found!");
    }
  } catch (error) {
    return error.message;
    } 
};

/**
 * Retrieves the posts from the database.
 * @returns {Promise<Array<[string, any]>>} A promise that resolves to an array of post entries, where each entry is an array with a string key and any value.
 */
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
};


/**
 * Retrieves comments from the database.
 * @returns {Promise<any>} A promise that resolves with the comments data if successful, or rejects with an error message if unsuccessful.
 */
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
  };

/**
 * Retrieves comments by post ID from the database.
 * @param {string} postId - The ID of the post.
 * @returns {Promise<Object>} - A promise that resolves to the comments data if found, or throws an error if not found.
 */
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

/**
 * Retrieves a single comment from the database.
 * @param {string} commentId - The ID of the comment to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the retrieved comment or rejects with an error message.
 */
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

/**
 * Updates the likes of a post.
 * @param {string} postId - The ID of the post to update.
 * @param {Array<string>} postLikedBy - The array of user who liked the post.
 * @returns {Promise<string|undefined>} - A promise that resolves to the updated post or an error message.
 */
export const updatePostLikes = async (postId, postLikedBy) => {
  try {
    return await update(ref(database, `posts/${postId}`), {postLikedBy});
  } catch (error) {
    return error.message;
  }
}

/**
 * Updates the likes of a comment in the database.
 * @param {string} commentId - The ID of the comment to update.
 * @param {Array<string>} commentLikedBy - An array of user who liked the comment.
 * @returns {Promise<string|undefined>} - A promise that resolves to the updated comment or an error message.
 */
export const updateCommentLikes = async (commentId, commentLikedBy) => {
  try {
    return await update(ref(database, `comments/${commentId}`), {commentLikedBy});
  } catch (error) {
    return error.message;
  }
}

/**
 * Checks if a user exists in the database.
 * @param {string} username - The username of the user to check.
 * @returns {Promise<Snapshot | string>} - A promise that resolves to a snapshot of the user data if the user exists, or an error message if the user does not exist.
 */
export const checkIfUserExists = async (username) => {
  goOnline(database);
  try {
    const snapshot = await get(ref(database, `users/${username}`));
    return snapshot;
  } catch (error) {
      return error.message;
    } 
}

/**
 * Creates a new user in the database.
 * @param {Object} userDetails - The details of the user to be created.
 * @returns {Promise<string|undefined>} - A promise that resolves to the created user's details or an error message if an error occurs.
 */
export const createUser = async (userDetails) => {
  try {
    return await set(ref(database, `users/${userDetails.username}`), userDetails);
  } catch (error) {
    return error.message;
  }
}

/**
 * Searches for a user in the database based on the provided search string and search term.
 * @param {string} searchString - The string to search for.
 * @param {string} searchTerm - The term to search for (e.g., "name", "email").
 * @returns {Promise<any>} - A promise that resolves to the user data if found, or throws an error if not found.
 */
export const searchUser = async (searchString, searchTerm) => {
  try {
    const filteredUsers = query(ref(database, "users"), orderByChild(searchTerm), equalTo(searchString));
    const snapshot = await get(filteredUsers);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Data not found!");
    }
  } catch (error) {
    return error.message;
  }
}

/**
 * Retrieves a post by its ID from the database.
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the post data if it exists, or rejects with an error message if not found.
 */
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

/**
 * Creates a new post in the database.
 * @param {Object} postDetails - The details of the post to be created.
 * @returns {Promise<string|undefined>} - A promise that resolves to the created post or an error message.
 */
export const createPost = async (postDetails) => {
  try {
    return await set(ref(database, `posts/${postDetails.Id}`), postDetails);
  } catch (error) {
    return error.message;
  }
}

/**
 * Creates a new comment in the database.
 * @param {Object} commentDetails - The details of the comment to be created.
 * @returns {Promise<string|undefined>} - A promise that resolves to the created comment or an error message.
 */
export const createComment = async (commentDetails) => {
  try {
    return await set(ref(database, `comments/${commentDetails.id}`), commentDetails);
  } catch (error) {
    return error.message;
  }
}

/**
 * Likes a post.
 * @param {string} postId - The ID of the post to be liked.
 * @param {string} user - The user who is liking the post.
 * @returns {Promise<boolean|string>} - A promise that resolves to a boolean value indicating whether the post was liked successfully, or an error message if an error occurred.
 */
export const likePost = async (postId, user) => {
  try {
    return await set(ref(database, `posts/${postId}/postLikedBy/${user}`), true);
  } catch (error) {
    return error.message;
  }
};


/**
 * Removes the user's like from a post.
 * @param {string} postId - The ID of the post.
 * @param {string} user - The username of the user who liked the post.
 * @returns {Promise<string|undefined>} - A promise that resolves to undefined if the operation is successful, or an error message if an error occurs.
 */
export const unlikePost = async (postId, user) => {
  try {
    return await set(ref(database, `posts/${postId}/postLikedBy/${user}`), null);
  } catch (error) {
    return error.message;
  }
}

/**
 * Removes a post from the database.
 * @param {string} postId - The ID of the post to be removed.
 * @returns {Promise<string>} - A promise that resolves to a success message or rejects with an error message.
 */
export const removePost = async (postId) => {
  try {
    return await set(ref(database, `posts/${postId}`), null);
  } catch (error) {
    return error.message;
  }
}

/**
 * Removes a comment from the database.
 * @param {string} commentId - The ID of the comment to be removed.
 * @returns {Promise<string|undefined>} - A promise that resolves to the result of the removal operation or an error message.
 */
export const removeComment = async (commentId) => {
  try {
    return await set(ref(database, `comments/${commentId}`), null);
  } catch (error) {
    return error.message;
  }
}

/**
 * Updates the content of a post.
 * @param {string} postId - The ID of the post to update.
 * @param {string} newContent - The new content for the post.
 * @returns {Promise<string|undefined>} - A promise that resolves to the updated post content or an error message.
 */
export const updatePostContent = async (postId, newContent) => {
  try {
    return await update(ref(database, `posts/${postId}`), { postContent: newContent });
  } catch (error) {
    return error.message;
  }
}

/**
 * Edits a user's credential in the database.
 * @param {string} user - The user's username.
 * @param {string} credential - The name of the credential to be edited.
 * @param {string} newCredential - The new value for the credential.
 * @returns {Promise<string>} - A promise that resolves to the updated credential value or an error message.
 */
export const editCredential  = async (user, credential, newCredential) => {
  try {
    return await update(ref(database, `users/${user}`), { [credential]: newCredential });
  } catch (error) {
    return error.message;
  }
}