import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({auth,setAuth}) => {
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
          <Link to="/">
            <p>
              <span className="fit">Fit</span>
              <span className="hub">Hub</span>
            </p>
          </Link>
        </div>
        <div className="center__nav">
          <Link to="/">Home</Link>
          {
            auth ? <Link to="/activities">Activity</Link>
            :
            <Link to="/login">Activity</Link>
          }
          
          {
            auth ? <Link to="/dashboard">Dashboard</Link>
            : null
          }
          <Link to="/contact">About Us</Link>
        </div>
        <div className="last__nav">
          {
            auth ? <Link to="/" onClick={clearToken}>Log out</Link>
            :
            <>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </> 
          } 
        </div>
      </div>
    </>
  );
};

export default Navbar;