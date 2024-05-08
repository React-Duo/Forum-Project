import React from "react";
import "./AllPosts.css";
import { assets } from "../../assets/assets";
import {
  getPosts,
  getComments,
  likePost,
  unlikePost,
  getUsers,
} from "../../service/request-service";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext.jsx";

const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState(props.order);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts();
      if (order === "top") {
        posts = posts.filter((post) => post.postLikedBy);
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

    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0][0];
        setUser(currentUsername);
      }
    };
    fetchUsers();
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
                <h4>{post?.postAuthor}</h4>
              </div>
              <div className="postContent">
                <a onClick={() => navigate(`/posts/${index}`)}>
                  {post?.postTitle}
                </a>
                <p>
                  {props.home
                    ? post?.postContent?.substring(0, 100) + "..."
                    : post?.postContent}
                </p>
              </div>
              <div className="interactions">
                <p>
                  <i
                    id="likeButton"
                    onClick={() => {
                      if (isLoggedIn.status) {
                        if (post?.postLikedBy) {
                          if (post?.postLikedBy[user]) {
                            unlikePost(index, user);
                            setPosts((prevPosts) => {
                              const updatedPosts = [...prevPosts];
                              delete updatedPosts[index]?.postLikedBy[user];
                              return updatedPosts;
                            });
                            return;
                          } else {
                            likePost(index, user);
                            setPosts((prevPosts) => {
                              const updatedPosts = [...prevPosts];
                              if (!updatedPosts[index]?.postLikedBy) {
                                updatedPosts[index].postLikedBy = {};
                              }
                              updatedPosts[index].postLikedBy[user] = true;
                              return updatedPosts;
                            });
                          }
                        } else {
                          setPosts((prevPosts) => {
                            const updatedPosts = [...prevPosts];
                            updatedPosts[index].postLikedBy = { [user]: true };
                            return updatedPosts;
                          });
                          likePost(index, user);
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                    className={`fa-solid fa-thumbs-up fa-lg ${
                      post?.postLikedBy && post?.postLikedBy[user]
                        ? "liked"
                        : ""
                    }`}
                  ></i>
                  {post?.postLikedBy
                    ? Object.keys(post?.postLikedBy).length
                    : 0}
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
                <p>{post?.date}</p>
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
