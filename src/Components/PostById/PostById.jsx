import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPost } from '../../service/request-service.js';
import AllComments from '../AllComments/AllComments.jsx';
import { assets } from "../../assets/assets";
import "./PostById.css";

const PostById = () => {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(null);

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
  }, [post]);

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
           {post.likes.length}
          </p>
          <p>
            <i className="fa-solid fa-comment fa-lg"></i>
            {post.comments.length}
          </p>
          <p>{post.date}</p>
        </div>
      </div>
      <AllComments comments={post.comments} />
    </div>
  );
};

export default PostById;
