import React from "react";
import { useNavigate } from 'react-router-dom';
import "./NavBarHome.css";
import { assets } from "../../assets/assets";

const NavBarHome = ({logged}) => {
  
  const navigate = useNavigate();

  return (
    <div className="NavBarHome">
      <div>
        <img id="logoImg" src={assets.logo} alt="Test Image" />
      </div>
      <div className="homeTitle">
      <h1>
        Welcome to our community
      </h1>
      <h4>Pesho</h4>
      </div>

      {!logged ? (
        <div className="login-buttons-home">
          <button id="login-btn">Login</button>
          <button id="register-btn" onClick={() => navigate(`/register`)}>Register</button>
        </div>
      ) : (
        <div className="login-buttons-home">
          <button id="logout-btn">Log out</button>
          <button id="users-btn">Users</button>
          <img id="profileImg" src={assets.profile}></img>
        </div>
      )}
    </div>
  );
};

export default NavBarHome;
