import React from "react";
import PostById from "../../Components/PostById/PostById";
import "./SinglePost.css";
import AllComments from "../../Components/AllComments/AllComments";
import AddComment from "../../Components/AddComment/AddComment";

const SinglePost = () => {
  return (
    <div className="singlePostContainer">
      <PostById />
      <AllComments />
      <AddComment />
    </div>
  );
};

export default SinglePost;
