import React, { useContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import "./NavBarHome.css";
import { assets } from "../../assets/assets";
import AuthContext from "../../Context/AuthContext";
import { getUsers} from "../../service/request-service";



const NavBarHome = () => {
  const [user, setUser] = useState();
  const { isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0][1];
        setUser(currentUsername);
      }
    };
    fetchUsers();
  }, [isLoggedIn]);

  return (
    <div className="NavBarHome">
      <div>
        <img onClick={() => navigate("/")} id="logoImg" src={assets.logo} alt="Test Image" />
      </div>
      <div className="homeTitle">
      <h1>
        Welcome to our community
      </h1>
      </div>

      {!isLoggedIn.status ? (
        <div className="login-buttons-home">
          <button id="login-btn" onClick={() => navigate(`/login`)}>Login</button>
          <button id="register-btn" onClick={() => navigate(`/register`)}>Register</button>
        </div>
      ) : (
        <div className="login-buttons-home">
          <button id="all-posts" onClick={() => navigate(`/posts`)}>All Posts</button>
          <img onClick={() => navigate("/profile")} id="profileImg" src={user?.photo}></img>
          {user && 
                (user.role === "admin" 
                    && <a id="users-btn" className="Btn" onClick={() => navigate(`/users`)}>
                      <svg className="logoIcon" height="1em" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"></path></svg>
                      <span className="tooltip">Admin</span>
                      </a>
                )
          } 
          <button id="logout-btn" onClick={() => navigate(`/logout`)}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default NavBarHome;
