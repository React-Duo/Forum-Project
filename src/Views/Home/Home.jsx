import React from "react";
import "./Home.css";
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import AllPosts from "../../Components/AllPosts/AllPosts";


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
