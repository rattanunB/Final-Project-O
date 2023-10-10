import React from 'react';
import './HomeTop.css';

const HomeTop = () => {
  return (
         <section role="Hometop" class="first-top">
        <div class="Hometop">
          <h1>REACH YOUR BEST ACTIVITY</h1>
          <p1>Stay motivated and on track with our powerful exercise tracker</p1> 
            <p3>and access to helpful health content.</p3>
          
          <button><a href="/signup">SIGN UP </a></button>
          <p2>Already member? 
            <span>
              <a href="/login">Log In</a>
            </span>
            </p2>
        </div>
          <div class="Hometop2">
        </div>
        </section>
  )
}

export default HomeTop;