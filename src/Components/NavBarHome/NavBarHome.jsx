import React from "react";
import "./NavBarHome.css";
import { assets } from "../../assets/assets";

const NavBarHome = () => {
  return (
    <div className="NavBarHome">
      <div>
        <img src={assets.logo} alt="Test Image" />
      </div>
      <h1>Welcome to our community<span></span></h1>
      <div className="login-buttons-home">
        <button id="login-btn" >Login</button>
        <button id="register-btn">Register</button>
        <button id="logout-btn">Log out</button>
        <button id="users-btn">Users</button>
        <img id="profileImg" src={assets.profile}></img>
      </div>
    </div>
  );
};

export default NavBarHome;
