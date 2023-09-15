import React from 'react'
import './navbar.css'

const Navbar = () => {
  return (
    <>
      <div className='container'>
        <div className='logo'>
          <p><span className='fit'>Fit</span><span className='hub'>Hub</span></p>          
        </div>
        <div className='center__nav'>
        <a href='#'>Home</a>
          <a href='#'>Activity</a>
          <a href='#'>Dashboard</a>
          <a href='#'>About Us</a>
        </div>
        <div className='last__nav'>
          <a href='#'>Log In</a>
          <a href='#'>Sign Up</a>
        </div>
      </div>
    </>
  );
};

export default Navbar