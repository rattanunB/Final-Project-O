import React from "react";
import "./navbar.scss";

const Navbar = () => {
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
          <a href="/login">Log In</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
