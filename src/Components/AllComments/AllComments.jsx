import React from "react";
import "./AllComments.css";
import { assets } from "../../assets/assets";

const AllComments = () => {
  return (
    <div className="allComments">
    <h5>All comments</h5>
      <div className="comment">
        <div className="personDetails">
          <img src={assets.profile}></img>
          <h4>Pesho</h4>
        </div>
        <div className="commentContent">
            <p>
                Somecontent hert wae wae saed somecontent hert wae wae saedsomecontent hert wae wae saedsomecontent hert wae wae saed
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
        <hr/>
      </div>
      
    </div>
  );
};

export default AllComments;
