import React from "react";
import "./AllPosts.css";
import { assets } from "../../assets/assets";

const AllPosts = (props) => {
  return (
    <div className="all-posts">
    {props.home === "true" ? "" : <div className="orderOptions">
            <a>Top</a>
            <a>Recent</a>
    </div>}
      <div className="post">
        <div className="personDetails">
          <img src={assets.profile}></img>
          <h4>Pesho Kirov</h4>
        </div>
        <div className="postContent">
          <h3>Add font in typeform</h3>
          <p>
            Hi, I wanted to know if it possible to add a font in the list? Our
            compagny is currently using the gibson font as the official one so
            it would be cool to use it in our form.
          </p>
        </div>
        <div className="interactions">
          <p>
            <i className="fa-solid fa-thumbs-up fa-lg"></i>3
          </p>
          <p>
            <i className="fa-solid fa-comment fa-lg"></i>4
          </p>
          <p>01.05.2024</p>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
