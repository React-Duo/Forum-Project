import React from 'react'
import './Footer.css'
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className='Footer'>
      <div>
        <img src={assets.logo} alt='Test Image' />
      </div>
      <div>
        <ul className='servicesFooter'>
          <li>About</li>
          <li>Services</li>
          <li>Blog</li>
          <li>Contacts</li>
        </ul>
      </div>
      <div className='copyrigth'>
        <p>Copyright © 2024  </p>
        <p>Powered by React Duo</p>
      </div>
    </div>
  )
}

export default Footer