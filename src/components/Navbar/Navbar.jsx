import React from "react";
import "./navbar.scss";

const Navbar = ({auth}) => {
  console.log('setAuth111',auth)
  const accessToken = localStorage.getItem('accessToken')
  console.log(accessToken);

  const clearToken = () => {
    localStorage.removeItem('accessToken')
  }

  return (
    <>
      <div className="container">
        <div className="logo">
          <p>
            <span className="fit">Fit</span>
            <span className="hub">Hub</span>
          </p>
        </div>
        <div className="center__nav">
          <a href="/">Home</a>
          <a href="/activities">Activity</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/contact">About Us</a>
        </div>
        <div className="last__nav">
          {
            auth ? <a href="/" onClick={clearToken}>Log out</a>
            :
            <>
              <a href="/login">Log In</a>
              <a href="/signup">Sign Up</a>
            </> 
          } 
        </div>
      </div>
    </>
  );
};

export default Navbar;