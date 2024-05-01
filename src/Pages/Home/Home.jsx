import React from 'react'
import './Home.css'
import NavBarHome from '../../Components/NavBarHome/NavBarHome'
import HomeHeader from '../../Components/HomeHeader/HomeHeader'

const Home = () => {
  return (
    <div>
        <NavBarHome />
        <HomeHeader />
    </div>
  )
}

export default Home