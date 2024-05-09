import React from "react";
import "./AllComments.css";
import { assets } from "../../assets/assets";

const AllComments = (props) => {

  return (
    <div className="allComments">
      <h5>All comments</h5>
    {props.comments && (props.comments.length ? props.comments.map((comment) => {
      return <div className="comment" key={comment.id}>
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
            { comment.commentLikedBy ? Object.keys(comment.commentLikedBy).length : 0 }
            {console.log(comment)}

            {console.log(comment.commentLikedBy)}
            </p>
            <p>{comment.date}</p>
          </div>
          <hr/>
      </div>
    }) : <h4>No Comments added yet.</h4>)}
    </div>
  )
};

export default AllComments;
