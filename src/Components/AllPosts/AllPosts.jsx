import React from "react";
import "./AllPosts.css";
import { assets } from "../../assets/assets";
import { getPosts, getComments } from "../../service/request-service";
import { useEffect, useState } from "react";

const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts();
      
      if (props.order === "top") {
        posts.sort((a, b) => Object.keys(b.postLikedBy).length - Object.keys(a.postLikedBy).length);      }

      setPosts(posts);
    };

    fetchPosts();

    const fetchComments = async () => {
      const comments = await getComments();
      setComments(comments);
    };

    fetchComments();
  }, []);

  return (
    <div className="all-posts">
      {props.home !== "true" ? (
        ""
      ) : (
        <div className="orderOptions">
          <a>Top</a>
          <a>Recent</a>
        </div>
      )}
      {posts.map((post, index) => {
        return (
          <div className="post" key={index}>
            <div className="personDetails">
              <img src={assets.profile}></img>
              <h4>{post.postAuthor}</h4>
            </div>
            <div className="postContent">
              <h3>{post.postTitle}</h3>
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
                {comments.filter((comment) => comment.relatedPost === index)
                  .length}
              </p>
              <p>{post.postDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPosts;
