import React from 'react';
import './HomeTop.scss';

const HomeTop = ({auth}) => {
  console.log('Auth...', auth)
  return (
    <section role="Hometop" className='first-top'>
      <div className='Hometop'>
        <h1>REACH YOUR BEST ACTIVITY</h1>
      </div>
      <div className='Hometopdown'>
        <h2>
        Stay motivated and on track with our powerful exercise tracker
        <br/>
        and access to helpful health content.
        </h2>
        {
          auth ? <button><a href="/activity">Let's Start</a></button>
          : 
          <>
            <button><a href="/signup">SIGN UP </a></button>
            <p>Already member?<a href="/login">Log In</a></p>
          </>
        }
      </div>
    </section>
  )
}

export default HomeTop;