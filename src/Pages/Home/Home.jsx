import React from "react";
import "./Home.css";
import NavBarHome from "../../Components/NavBarHome/NavBarHome";
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import AllPosts from "../../Components/AllPosts/AllPosts";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <NavBarHome logged="true" />
      <HomeHeader />

      <div className="home-posts">
        <h2>Top posts</h2>
        <h2>Recent posts</h2>
        <AllPosts home="true" order="top" />
        <AllPosts home="true" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
