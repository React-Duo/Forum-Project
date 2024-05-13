import React, { useContext, useEffect, useState } from "react";
import "./AllComments.css";
import { assets } from "../../assets/assets";
import { getSingleComment, getUsers, updateCommentLikes } from "../../service/request-service";
import AuthContext from '../../Context/AuthContext';

const AllComments = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [commentId, setCommentId] = useState(null);

  useEffect(() => {
      const fetchUsers = async () => {
        const users = await getUsers();
        const user = Object.values(users).find(user => user.emailAddress === isLoggedIn.user);
        setCurrentUser(user);
      }
      fetchUsers();
  }, []);

  useEffect(() => {
      const fetchComment = async () => {
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
        props.fn();
      }
    if (commentId) fetchComment();
  }, [commentId]);

  return (
    <div className="allComments">
      <h5>All comments</h5>
    {props.comments && (props.comments.length ? props.comments.map((comment) => {
      const thumbsUp = comment.commentLikedBy && currentUser && comment.commentLikedBy[currentUser.username] 
                        ? ("fa-solid fa-thumbs-up fa-lg thumbs-up-liked") 
                        : ("fa-solid fa-thumbs-up fa-lg");
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
              <i className={thumbsUp} onClick={() => setCommentId(comment.id)}></i>
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
