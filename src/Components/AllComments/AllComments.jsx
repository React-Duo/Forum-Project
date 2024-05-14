import React, { useContext, useEffect, useState } from "react";
import "./AllComments.css";
import { assets } from "../../assets/assets";
import {
  getSingleComment,
  getUsers,
  updateCommentLikes,
  removeComment,
} from "../../service/request-service";
import AuthContext from "../../Context/AuthContext";


const AllComments = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [usersDetails, setUserDetails] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false); 

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      const user = Object.values(users).find(
        (user) => user.emailAddress === isLoggedIn.user
      );
      setCurrentUser(user);
    };
    fetchUsers();
  }, []); 
  

  useEffect(() => {
    const fetchComment = async () => {
      const comment = await getSingleComment(commentId);
      if (comment.commentLikedBy) {
        if (comment.commentLikedBy[currentUser.username]) {
          delete comment.commentLikedBy[currentUser.username];
        } else {
          comment.commentLikedBy = {
            ...comment.commentLikedBy,
            [currentUser.username]: true,
          };
        }
      } else {
        comment.commentLikedBy = { [currentUser.username]: true };
      }
      updateCommentLikes(commentId, comment.commentLikedBy);
      setCommentId(null);
      props.fn();
    };

    if (commentId) fetchComment();
  }, [commentId]);

  useEffect(() => {
    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      setUserDetails(users);
    };
    fetchUsers();
  }, [isLoggedIn]);

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="allComments">
      <h5>All comments</h5>
      {props.comments &&
        (props.comments.length ? (
          (showAllComments ? props.comments : props.comments.slice(0, 5)).map((comment) => {
            const thumbsUp =
              comment.commentLikedBy &&
              currentUser &&
              comment.commentLikedBy[currentUser.username]
                ? "fa-solid fa-thumbs-up fa-lg thumbs-up-liked"
                : "fa-solid fa-thumbs-up fa-lg";
            let currentUsername;
            if (usersDetails.length > 0) {
              currentUsername = usersDetails.filter(
                (el) => el[1]?.username === comment?.commentAuthor
              )[0][1];
            }
            return (
              <div className="comment" key={comment.id}>
                <div className="personDetails">
                  <img
                    src={
                      currentUsername ? currentUsername.photo : assets.profile
                    }
                  ></img>
                  <h4>{comment.commentAuthor}</h4>
                </div>
                <div className="commentContent">
                  <p>{comment.commentContent}</p>
                </div>
                <div className="interactions">
                  <p>
                    <i
                      className={thumbsUp}
                      onClick={() => setCommentId(comment.id)}
                    ></i>
                    {comment.commentLikedBy
                      ? Object.keys(comment.commentLikedBy).length
                      : 0}
                  </p>
                  <p>{comment.date}</p>
                  {comment.commentAuthor === currentUser?.username ||
                  currentUser?.role === "admin" ? (
                    <div className="editOptions">
                      <a>
                        <i
                          onClick={() => {
                            removeComment(comment.id);
                            props.fn();
                          }}
                          className="fa-solid fa-trash"
                        ></i>
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <hr />
              </div>
            );
          })
        ) : (
          <h4>No Comments added yet.</h4>
        ))}
        {props.comments && props.comments.length > 5 && (
        <button className="show-more" onClick={toggleShowAllComments}>
          <i className="animation"></i>
          {showAllComments ? "Show Less" : "Show More"}
          <i className="animation"></i>
        </button>
      )}
    </div>
  );
};

export default AllComments;
