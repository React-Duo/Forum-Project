import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getPostById,
  getCommentsByPost,
  getUsers,
  removePost,
  updatePostContent,
  updatePostLikes
} from "../../service/request-service.js";
import AllComments from "../AllComments/AllComments.jsx";
import { assets } from "../../assets/assets";
import "./PostById.css";
import AuthContext from "../../Context/AuthContext.jsx";

const PostById = () => {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(null);
  const [user, setUser] = useState();
  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  useEffect(() => {
    const getSinglePost = async () => {
      const singlePost = await getPostById(postId);
      const { postAuthor, postTitle, postContent, date } = singlePost;
      const likes = (singlePost.postLikedBy) ? Object.entries(singlePost.postLikedBy).map(entry => entry[0]) : [];
      const data = await getCommentsByPost(+postId);
      const comments = (data !== "Data not found!") ? Object.entries(data).map(([key, comment]) => comment = {id: key, ...comment}) : [];
      setPost({postAuthor, postTitle, postContent, date, likes, comments});
    }
    getSinglePost();

    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0][0];
        setUser(currentUsername);
      }
    };
    fetchUsers();
  }, [user]);

  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newContent, setNewContent] = useState("");

  const handleEditOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleLikes = async (id) => {
    const users = await getUsers();
    const currentUser = Object.values(users).find(user => user.emailAddress === isLoggedIn.user);
    const post = await getPostById(id);
    if (post.postLikedBy) {
      if(post.postLikedBy[currentUser.username]) {
        delete post.postLikedBy[currentUser.username];
      } else {
        post.postLikedBy = {...post.postLikedBy, [currentUser.username]: true}
      }
    } else {
      post.postLikedBy = {[currentUser.username]: true}
    }
    updatePostLikes(id, post.postLikedBy);
  }

  return (
    post && (
      <div>
        <div className="postById">
          <div className="personDetails">
            <img src={assets.profile}></img>
            <h4>{post.postAuthor}</h4>
          </div>
          <div className="postContent">
            <h3>{post.postTitle}</h3> <br />
            <p>{post.postContent}</p>
          </div>
          <div className="interactions">
            <p>
              <i className="fa-solid fa-thumbs-up fa-lg" onClick={() => handleLikes(postId)}></i>
              {post.likes.length}
            </p>
            <p>
              <i className="fa-solid fa-comment fa-lg"></i>
              {post.comments.length}
            </p>
            <p>{post.date}</p>
            {post.postAuthor === user ? (
              <div className="editOptions">
                <a>
                  <i onClick={handleShowEdit} className="fa-solid fa-pen-to-square"></i>
                </a>
                <a onClick={handleEditOptions}>
                  <i className="fa-solid fa-trash"></i>
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {showEdit && (
          <div className="editPost">
            <textarea
              value={post.postContent}
              placeholder="Content"
              onChange={(e) => {
                setPost({ ...post, postContent: e.target.value })
                setNewContent(e.target.value);
              }
              }
            ></textarea>
            <button className="editBtn" onClick={() => updatePostContent(postId, post.postContent)}>Save</button>
          </div>
        )}
        {showOptions && (
          <div className="deleteConfirm">
            <p>Are you sure you want to delete the post</p>
            <button className="editBtn" onClick={() => removePost(postId)}>Yes</button>
            <button className="editBtn" onClick={handleEditOptions}>No</button>
          </div>
        )}
        <AllComments comments={post.comments} />
      </div>
    )
  );
};

export default PostById;
