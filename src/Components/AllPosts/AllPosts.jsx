import React from "react";
import "./AllPosts.css";
import { assets } from "../../assets/assets";
import {
  getPosts,
  getComments,
  likePost,
  unlikePost,
} from "../../service/request-service";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../Context/AuthContext.jsx'; 


const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState(props.order);
  const navigate = useNavigate();

  const user = useContext(AuthContext);
  console.log(user.isLoggedIn); 


  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts();
      if (order === "top") {
        posts.sort(
          (a, b) =>
            Object.keys(b.postLikedBy).length -
            Object.keys(a.postLikedBy).length
        );
      }
      setPosts(posts);
    };

    fetchPosts();

    const fetchComments = async () => {
      const comments = await getComments();
      setComments(comments);
    };

    fetchComments();
  }, [order]);

  return (
    <div className="postsContainer">
      {props.home ? (
        ""
      ) : (
        <div className="options">
          <div className="search">
            <input placeholder="Search..." type="text"></input>
            <button type="submit">Go</button>
          </div>
          <div className="rightSideOptions">
            <button onClick={() => navigate("/create-post")}>Create</button>
            <div className="orderOptions">
              <a onClick={() => setOrder("top")}>Top</a>
              <a onClick={() => setOrder("recent")}>Recent</a>
            </div>
          </div>
        </div>
      )}

      <div className={`all-posts ${props.home ? "isHomeView" : ""}`}>
        {posts.slice(0, visiblePosts).map((post, index) => {
          return (
            <div
              className={`post ${props.home ? "isHomeViewPost" : ""}`}
              key={index}
            >
              <div className="personDetails">
                <img src={assets.profile}></img>
                <h4>{post.postAuthor}</h4>
              </div>
              <div className="postContent">
                <a onClick={() => navigate(`/posts/${index}`)}>
                  {post.postTitle}
                </a>
                <p>
                  {props.home
                    ? post.postContent.substring(0, 100) + "..."
                    : post.postContent}
                </p>
              </div>
              <div className="interactions">
                <p>
                  <i
                    id="likeButton"
                    //TODO: Add username and remove hardcoded koko4
                    //TODO: IF the user is not logged in cant like the post
                    onClick={() => {
                      if (post.postLikedBy["koko4"]) {
                        unlikePost(index, "koko4");
                        setPosts((prevPosts) => {
                          const updatedPosts = [...prevPosts];
                          delete updatedPosts[index].postLikedBy["koko4"];
                          return updatedPosts;
                        });
                        return;
                      } else {
                        likePost(index, "koko4");
                        setPosts((prevPosts) => {
                          const updatedPosts = [...prevPosts];
                          updatedPosts[index].postLikedBy["koko4"] = true;
                          return updatedPosts;
                        });
                      }
                    }}
                    className={`fa-solid fa-thumbs-up fa-lg ${post.postLikedBy["koko4"] ? "liked" : ""}`}
                  ></i>
                  {Object.keys(post.postLikedBy).length}
                </p>
                <p>
                  <i
                    onClick={() => navigate(`/posts/${index}`)}
                    className="fa-solid fa-comment fa-lg"
                  ></i>
                  {
                    comments.filter((comment) => comment.relatedPost === index)
                      .length
                  }
                </p>
                <p>{post.date}</p>
              </div>
            </div>
          );
        })}
        <div className="showMore">
          {!props.home
            ? visiblePosts < posts.length && (
                <button onClick={() => setVisiblePosts(visiblePosts + 5)}>
                  Show More
                </button>
              )
            : ""}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
