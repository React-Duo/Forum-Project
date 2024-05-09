import React, { useEffect } from "react";
import "./AllComments.css";
import { assets } from "../../assets/assets";

const AllComments = (props) => {

  return (
    <div className="allComments">
      <h5>All comments</h5>
    {props.comments && (props.comments.length ? props.comments.map(comment => {
      return <div className="comment">
          <div className="personDetails">
            <img src={assets.profile}></img>
            <h4>{comment.commentAuthor}</h4>
          </div>
          <div className="commentContent">
              <p>{comment.commentContent}</p>
          </div>
          <div className="interactions">
            <p>
              <i className="fa-solid fa-thumbs-up fa-lg"></i>
            {Object.keys(comment.commentLikedBy).length}
            </p>
            <p>{comment.date}</p>
          </div>
          <hr/>
      </div>
    }) : <h5>No Comments added yet.</h5>)}
    </div>
  )
};

export default AllComments;
