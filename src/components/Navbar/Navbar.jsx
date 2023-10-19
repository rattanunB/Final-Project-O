import React from "react";
import "./navbar.scss";

const Navbar = ({auth,setAuth}) => {
  // console.log('Auth.....',auth)
  const accessToken = localStorage.getItem('accessToken')
  console.log(accessToken);

  const clearToken = () => {
    localStorage.removeItem('accessToken')
    setAuth(false)
  }

  return (
    <>
      <div className="container">
        <div className="logo">
          <a href="/">
            <p>
              <span className="fit">Fit</span>
              <span className="hub">Hub</span>
            </p>
          </a>
        </div>
        <div className="center__nav">
          <a href="/">Home</a>
          {
            auth ? <a href="/activities">Activity</a>
            :
            <a href="/login">Activity</a>
          }
          
          {
            auth ? <a href="/dashboard">Dashboard</a>
            : null
          }
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