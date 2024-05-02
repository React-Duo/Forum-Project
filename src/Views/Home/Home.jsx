import React from "react";
import "./Home.css";
import NavBarHome from "../../Components/NavBarHome/NavBarHome";
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import AllPosts from "../../Components/AllPosts/AllPosts";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <HomeHeader />

      <div className="home-posts">
        <div>
          <h2>Top posts</h2>
          <AllPosts home="true" order="top" />
        </div>
        <div>
          <h2>Recent posts</h2>
          <AllPosts home="true" />
        </div>
      </div>
    </div>
  );
};

export default Home;
