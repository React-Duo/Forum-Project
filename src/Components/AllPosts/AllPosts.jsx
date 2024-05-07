import React from "react";
import "./AllPosts.css";
import { assets } from "../../assets/assets";
import { getPosts, getComments } from "../../service/request-service";
import { useEffect, useState } from "react";
import { set } from "firebase/database";
import { useNavigate } from 'react-router-dom';


const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState(props.order);
  const navigate = useNavigate();

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
    <div className="all-posts">
      {props.home ? (
        ""
      ) : (
        <div className="options">
          <div className="search">
            <input placeholder="Search..." type="text"></input>
            <button type="submit">Go</button>
          </div>
          <div className="rightSideOptions">
          <div><button onClick={() => navigate('/create-post')}>Create</button></div>            <div className="orderOptions">
              <a onClick={() => setOrder("top")}>Top</a>
              <a onClick={() => setOrder("recent")}>Recent</a>
            </div>         
          </div>
        </div>
      )}

      {posts.slice(0, visiblePosts).map((post, index) => {
        return (
          <div className="post" key={index}>
            <div className="personDetails">
              <img src={assets.profile}></img>
              <h4>{post.postAuthor}</h4>
            </div>
            <div className="postContent">
              <a onClick={() => navigate(`/posts/:${index}`)}>{post.postTitle}</a>
              <p>
                {props.home
                  ? post.postContent.substring(0, 100) + "..."
                  : post.postContent}
              </p>
            </div>
            <div className="interactions">
              <p>
                <i className="fa-solid fa-thumbs-up fa-lg"></i>
                {Object.keys(post.postLikedBy).length}
              </p>
              <p>
                <i className="fa-solid fa-comment fa-lg"></i>
                {
                  comments.filter((comment) => comment.relatedPost === index)
                    .length
                }
              </p>
              <p>{post.postDate}</p>
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
  );
};

export default AllPosts;
