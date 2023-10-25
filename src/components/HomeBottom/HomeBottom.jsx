import React from 'react';
import './HomeBottom.scss';
import { Link } from 'react-router-dom';

const HomeBottom = ({auth}) => {
    console.log('Auth...', auth)
  return (
    <div id="home-container">
        <div className="home-content">
            <div className="paragraph">
                <h1>GET fit, GET strong.<br/>GET healthy</h1>
                <p>Welcome to our fitness app designed to help you achieve your fitness goal and transform your body and mind.</p>
                {
                    auth ? 
                    <Link to="/activities">
                        <button type="button">GET  START</button>
                    </Link>
                    : 
                    <Link to="/login">
                        <button type="button">GET  START</button>
                    </Link>
                }
                
            </div>
            <div className="activities-pic">
                <img src="/HomebottonPic/Bicycle.png" alt='Bicycle' />
            </div>
            
        </div>
        <div className="home-content">
            <div className="activities-pic">
                <img src="/HomebottonPic/Yoka.png" alt='Yoka' />
            </div>
            <div className="paragraph">
                <h1>Set Goals. Log Workouts.<br/> Stay On Track</h1>
                <p>Easily track your Workouts, set Training Plans, and discover new Workout Routines to crush your goals.</p>
                {
                    auth ?
                    <Link to="/creategoal">
                        <button type="button">SET GOAL</button>
                    </Link>
                    :
                    <Link to="/login">
                        <button type="button">SET GOAL</button>
                    </Link>
                }
            </div>
        </div>
    </div>
  )
}

export default HomeBottom;