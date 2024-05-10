import React, { useContext } from "react";
import "./AllComments.css";
import { assets } from "../../assets/assets";
import { getSingleComment, getUsers, updateCommentLikes } from "../../service/request-service";
import AuthContext from '../../Context/AuthContext';

const AllComments = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  const handleLikes = async (commentId) => {
    const users = await getUsers();
    const currentUser = Object.values(users).find(user => user.emailAddress === isLoggedIn.user);
    const comment = await getSingleComment(commentId);

    if (comment.commentLikedBy) {
      if(comment.commentLikedBy[currentUser.username]) {
        delete comment.commentLikedBy[currentUser.username];
      } else {
        comment.commentLikedBy = {...comment.commentLikedBy, [currentUser.username]: true}
      }
    } else {
      comment.commentLikedBy = {[currentUser.username]: true}
    }

    updateCommentLikes(commentId, comment.commentLikedBy);
  }

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
              <i className="fa-solid fa-thumbs-up fa-lg" onClick={() => handleLikes(comment.id)}></i>
            { comment.commentLikedBy ? Object.keys(comment.commentLikedBy).length : 0 }
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
