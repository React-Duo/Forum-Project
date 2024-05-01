import React from "react";
import "./HomeHeader.css";
import { assets } from "../../assets/assets";

const HomeHeader = () => {
  return (
    <div className="HomeHeader">
      <div className="TopUsers">
        <h2>Most helpful members</h2>
        <div className="TopUsersList">
          <div className="TopUser">
            <img src={assets.profile} alt=""></img>
            <p>Pesho Kirov</p>
          </div>
          <div className="TopUser">
            <img src={assets.profile} alt=""></img>
            <p>Username</p>
          </div>
          <div className="TopUser">
            <img src={assets.profile} alt=""></img>
            <p>Username</p>
          </div>
          <div className="TopUser">
            <img src={assets.profile} alt=""></img>
            <p>Username</p>
          </div>
          <div className="TopUser">
            <img src={assets.profile} alt=""></img>
            <p>Username</p>
          </div>
          <div className="TopUser">
            <img src={assets.profile} alt=""></img>
            <p>Username</p>
          </div>
        </div>
      </div>
      <div className="CurrentStatus">
        <h2>Current status</h2>
        <div className="CurrentStatusList">    
            <h3><i className="fa-regular fa-user fa-lg"></i>15</h3>
            <p>members</p>
            <h3><i className="fa-regular fa-comment-dots fa-lg"></i>34</h3>
            <p>posts</p>
            <h3><i className="fa-solid fa-reply fa-lg"></i>115</h3>
            <p>replies</p>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
