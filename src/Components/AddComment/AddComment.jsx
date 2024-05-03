import React from "react";
import "./AddComment.css";

const AddComment = () => {
  return (
    <div className="addComment">
      <h4>Add comment</h4>
      <textarea placeholder="Write your comment here"></textarea>
      <button className="buttonSend">
        Button
        <span></span>
      </button>
    </div>
  );
};

export default AddComment;
