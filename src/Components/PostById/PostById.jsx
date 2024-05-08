import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { getPostById } from '../../service/request-service.js';
import { assets } from "../../assets/assets";
import "./PostById.css";

const PostById = () => {
  const { isLoggedIn, setLoginState } = useContext(AuthContext);
  const params = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);

  console.log(isLoggedIn);

  useEffect(() => {
    const getSinglePost = async () => {
      const singlePost = await getPostById(params.id);
      setPost(singlePost);
    }
    getSinglePost();
  }, []);

  useEffect(() => {
    if (post) {
      console.log(post);
      const likes = Object.keys(post.postLikedBy);
      console.log(likes);
      setLikes(likes);
    }
  }, [post]);

  
  const viewLikes = (event) => {
    event.preventDefault();

    console.log(likes);

    alert(likes);

    



  }

  return (
    post && 
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
            <i className="fa-solid fa-thumbs-up fa-lg"></i>
            {likes.length && <a href="" onClick={viewLikes}>{likes.length}</a>}
          </p>
          <p>
            <i className="fa-solid fa-comment fa-lg"></i>
            3
          </p>
          <p>{post.date}</p>
        </div>
      </div>
    </div>
  );
};

export default PostById;
