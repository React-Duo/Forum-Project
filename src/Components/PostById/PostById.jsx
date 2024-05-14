import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getPostById,
  getCommentsByPost,
  getUsers,
  removePost,
  updatePostContent,
  updatePostLikes,
  removeComment
} from "../../service/request-service.js";
import AllComments from "../AllComments/AllComments.jsx";
import AddComment from '../AddComment/AddComment.jsx';
import { assets } from "../../assets/assets";
import "./PostById.css";
import AuthContext from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


const PostById = () => {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [photo, setPhoto] = useState();

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

    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0];
        setRole(currentUsername[1].role);
        setUser(currentUsername[0]);
      }
    };
    fetchUsers();
  }, [user, status]);


  useEffect(() => {
    const getPhoto = async () => {
      const users = await getUsers();
      const currentUser = Object.entries(users).filter(el => el[1]?.username === post?.postAuthor)
      if(currentUser[0]){
        setPhoto(currentUser[0][1]?.photo);
      }
    }
    getPhoto();
  }, [post])
 

  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleEditOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const updateState = () => {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  const deleteComments = async () => {
    if(post.comments) {
      post.comments.forEach(async comment => {
        await removeComment(comment.id);
      });
    }
  };

  const handleLikes = async (id) => {
    const users = await getUsers();
    const currentUser = Object.values(users).find(user => user.emailAddress === isLoggedIn.user);
    const post = await getPostById(id);
    if (post.postLikedBy) {
      if(post.postLikedBy[currentUser.username]) {
        delete post.postLikedBy[currentUser.username];
      } else {
        post.postLikedBy = {...post.postLikedBy, [currentUser.username]: true}
      }
    } else {
      post.postLikedBy = {[currentUser.username]: true}
    }
    updatePostLikes(id, post.postLikedBy);
    updateState();
  }

  return (
    post && (
      <div>
        <div className="postById">
          <div className="personDetails">
            <img src={photo?photo:assets.profile}></img>
            <h4>{post.postAuthor}</h4>
          </div>
          <div className="postContent">
            <h3>{post.postTitle}</h3> <br />
            <p>{post.postContent}</p>
          </div>
          <div className="interactions">
            <p>
              <i className={post.likes.length && post.likes.includes(user) 
                  ? ("fa-solid fa-thumbs-up fa-lg thumbs-up-liked")
                  : ("fa-solid fa-thumbs-up fa-lg")} onClick={() => handleLikes(postId)}></i>
              {post.likes.length}
            </p>
            <p>
              <i className="fa-solid fa-comment fa-lg"></i>
              {post.comments.length}
            </p>
            <p>{post.date}</p>
            {post.postAuthor === user || role === "admin" ? (
              <div className="editOptions">
                <a>
                  <i onClick={handleShowEdit} className="fa-solid fa-pen-to-square"></i>
                </a>
                <a onClick={handleEditOptions}>
                  <i className="fa-solid fa-trash"></i>
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {showEdit && (
          <div className="editPost">
            <textarea
              value={post.postContent}
              placeholder="Content"
              onChange={(e) => {
                setPost({ ...post, postContent: e.target.value })
              }
              }
            ></textarea>
            <button className="editBtn" onClick={() => {
              updatePostContent(postId, post.postContent)
              handleShowEdit()
              }}>Save</button>
          </div>
        )}
        {showOptions && (
          
          <div className="deleteConfirm">
            <p>Are you sure you want to delete the post</p>
            <button className="editBtn" onClick={() => {
              removePost(postId)
              deleteComments()
              navigate("/posts")
              }}>Yes</button>
            <button className="editBtn" onClick={handleEditOptions}>No</button>
          </div>
        )}
        <AllComments comments={post.comments} fn={updateState}/>
        <AddComment relatedPost={postId} fn={updateState}/>
      </div>
    )
  );
};

export default PostById;
