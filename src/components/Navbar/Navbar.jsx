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
          <a href='#'>Activity</a>
          <a href='#'>Dashboard</a>
          <a href='#'>Contact</a>
        </div>
        <div className='last__nav'>
          <a href='#'>Log in</a>
          <a href='#'>Sign up</a>
        </div>
      </div>
    </>
  );
};

export default Navbar