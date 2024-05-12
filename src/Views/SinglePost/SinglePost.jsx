import React from "react";
import PostById from "../../Components/PostById/PostById";
import "./SinglePost.css";
import AddComment from "../../Components/AddComment/AddComment";

const SinglePost = () => {
  return (
    <div className="singlePostContainer">
      <PostById />
    </div>
  );
};

export default SinglePost;
