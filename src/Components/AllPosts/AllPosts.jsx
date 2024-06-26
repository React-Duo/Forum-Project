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
import PropTypes from 'prop-types';



const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState(props.order);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [usersDetails, setUserDetails] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [blocked, setBlocked] = useState(false)
  const [blockedMessage, setBlockedMessage] = useState(false)

  const { isLoggedIn } = useContext(AuthContext);

  const changeBlockedMessage = () => {
    setBlockedMessage(!blockedMessage)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts();
      if (order === "top") {
        posts = posts.filter((post) => post[1].postLikedBy);
        posts.sort(
          (a, b) =>
            Object.keys(b[1].postLikedBy).length -
            Object.keys(a[1].postLikedBy).length
        );
      } else if( order === "search" || order === "search2") {
        if(searchInput !== ""){
          posts = posts.filter(post => post[1].postTitle.toLowerCase().includes(searchInput.toLowerCase()))
        } else{ 
          posts.sort((a, b) => new Date(b[1].date) - new Date(a[1].date));
        }
      }
       else {
        posts.sort((a, b) => new Date(b[1].date) - new Date(a[1].date));
      }
      setPosts(posts);
    };
    fetchPosts();

    const fetchComments = async () => {
      const data = await getComments();
      const comments = (data !== 'Data not found!') ? Object.entries(data).map(([key, comment]) => comment = {id: key, ...comment}) : [];
      setComments(comments);
    };
    fetchComments();

    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      setUserDetails(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0];
        setBlocked(currentUsername[1].isBlocked)
        setUser(currentUsername[0]);
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
            <input value={searchInput} onChange={(e) =>{ 
            setSearchInput(e.target.value)
            }} placeholder="Search..." type="text"></input>
            <button onClick={() => {order==="search" ? setOrder("search2") : setOrder("search")}} type="submit">Go</button>
          </div>
          <div className="rightSideOptions">
            <button onClick={() => {if(blocked) {
              changeBlockedMessage()
            } else{
              navigate("/create-post")
            }
              }}>Create</button>
            <div className="orderOptions">
              <a onClick={() => setOrder("top")}>Top</a>
              <a onClick={() => setOrder("recent")}>Recent</a>
            </div>
          </div>
        </div>
      )}
      {blockedMessage ? <div className="blockMsg"><h3>You are blocked from creating posts</h3></div> : ""}
      <div className={`all-posts ${props.home ? "isHomeView" : ""}`}>
        {posts.slice(0, visiblePosts).map((post, index) => {
          let currentUsername;
          if(usersDetails.length > 0) {
          currentUsername = usersDetails.filter(
          (el) => el[1]?.username === post[1]?.postAuthor
        )[0][1]
          }
          return (
            <div
              className={`post ${props.home ? "isHomeViewPost" : ""}`}
              key={post[0]}
            >
              <div className="personDetails">
                <img src={currentUsername?currentUsername.photo: assets.profile}></img>
                <h4>{post[1]?.postAuthor}</h4>
              </div>
              <div className="postContent">
                <a onClick={() => navigate(`/posts/${post[0]}`)}>
                {props.home
                    ? post[1]?.postTitle?.substring(0, 45) + "..."
                    : post[1]?.postTitle}
                </a>
                <p>
                  {props.home
                    ? post[1]?.postContent?.substring(0, 100) + "..."
                    : post[1]?.postContent}
                </p>
              </div>
              <div className="interactions">
                <p>
                  <i
                    id="likeButton"
                    onClick={() => {
                      if (isLoggedIn.status) {
                        if (post[1]?.postLikedBy) {
                          if (post[1]?.postLikedBy[user]) {
                            unlikePost(post[0], user);
                            setPosts((prevPosts) => {
                              const updatedPosts = [...prevPosts];
                              delete updatedPosts[index][1]?.postLikedBy?.[
                                user
                              ];
                              return updatedPosts;
                            });
                          } else {
                            likePost(post[0], user);
                            setPosts((prevPosts) => {
                              const updatedPosts = [...prevPosts];
                              if (!updatedPosts[index][1]?.postLikedBy) {
                                updatedPosts[index][1].postLikedBy = {};
                              }
                              updatedPosts[index][1].postLikedBy[user] = true;
                              return updatedPosts;
                            });
                          }
                        } else {
                          setPosts((prevPosts) => {
                            const updatedPosts = [...prevPosts];
                            updatedPosts[index][1].postLikedBy = {
                              [user]: true,
                            };
                            return updatedPosts;
                          });
                          likePost([post[0]], user);
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                    className={`${post[0]} fa-solid fa-thumbs-up fa-lg ${
                      post[1]?.postLikedBy && post[1]?.postLikedBy[user]
                        ? "liked"
                        : ""
                    }`}
                  ></i>
                  {post[1]?.postLikedBy
                    ? Object.keys(post[1]?.postLikedBy).length
                    : 0}
                </p>
                <p>
                  <i
                    onClick={() => {
                      navigate(`/posts/${post[0]}`)
                    }}
                    className="fa-solid fa-comment fa-lg"
                  ></i>
                  {
                    comments.filter(comment => post[1].Id === comment.relatedPost).length
                  }
                </p>
                <p>{post[1]?.date}</p>
                              
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

AllPosts.propTypes = {
  order: PropTypes.string,
  home: PropTypes.bool
}

export default AllPosts;
