import React from "react";
import "./PostById.css";
import { assets } from "../../assets/assets";
import { useEffect, useState } from "react";

const PostById = () => {

  return (
    <div>
      <div className="postById">
        <div className="personDetails">
          <img src={assets.profile}></img>
          <h4>Pesho</h4>
        </div>
        <div className="postContent">
          <h3>Some title</h3>
          <p>
            somecontent hert wae wae saed somecontent hert wae wae saedsomecontent hert wae wae saedsomecontent hert wae wae saed
             hert wae wae saed somecontent hert wae wae saedsomecontent hert wae wae saedsomecontent hert wae wae saed
          </p>
        </div>
        <div className="interactions">
          <p>
            <i className="fa-solid fa-thumbs-up fa-lg"></i>
            22
          </p>
          <p>
            <i className="fa-solid fa-comment fa-lg"></i>
            3
          </p>
          <p>May 5 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PostById;
