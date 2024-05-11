import React from "react";
import "./HomeHeader.css";
import { assets } from "../../assets/assets";
import { getPosts, getComments, getUsers } from "../../service/request-service";
import { useEffect, useState } from "react";

const HomeHeader = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts();
      setPosts(posts);
    };
    fetchPosts();

    const fetchComments = async () => {
      const data = await getComments();
      const comments = (data !== 'Data not found!') ? Object.entries(data).map(([key, comment]) => comment = {id: key, ...comment}) : [];
      setComments(comments);
      const userCommentCount = comments.reduce((acc, comment) => {
        acc[comment.commentAuthor] = (acc[comment.commentAuthor] || 0) + 1;
        return acc;
      }, {});
     
      const topUsers = Object.entries(userCommentCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([user]) => user);

    setTopUsers(topUsers);
    };
    fetchComments();

    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  return (
    <div className="HomeHeader">
      <div className="TopUsers">
        <h2>Top members</h2>
        <div className="TopUsersList">
        {topUsers.map((user, index) => {
          return (
            <div className="TopUser"  key={index}>
              <img src={assets.profile} alt=""></img>
              <p>{user}</p>
            </div>
          )
        })}
        </div>
      </div>
      <div className="CurrentStatus">
        <h2>Current status</h2>
        <div className="CurrentStatusList">
          <h3>
            <i className="fa-regular fa-user fa-lg"></i>{Object.keys(users).length}
          </h3>
          <p>members</p>
          <h3>
            <i className="fa-regular fa-comment-dots fa-lg"></i>{posts.length}
          </h3>
          <p>posts</p>
          <h3>
            <i className="fa-solid fa-reply fa-lg"></i>{comments.length}
          </h3>
          <p>replies</p>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
