import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./NavBarHome.css";
import { assets } from "../../assets/assets";
import AuthContext from "../../Context/AuthContext";

const NavBarHome = () => {
  
  const { isLoggedIn, setLoginState } = useContext(AuthContext);
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

      {!isLoggedIn ? (
        <div className="login-buttons-home">
          <button id="login-btn" onClick={() => navigate(`/login`)}>Login</button>
          <button id="register-btn" onClick={() => navigate(`/register`)}>Register</button>
        </div>
      ) : (
        <div className="login-buttons-home">
          <button id="all-posts" onClick={() => navigate(`/posts`)}>All Posts</button>
          <button id="users-btn">Users</button>
          <img id="profileImg" src={assets.profile}></img>
          <button id="logout-btn" onClick={() => navigate(`/logout`)}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default NavBarHome;
