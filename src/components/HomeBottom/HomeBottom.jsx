import React from 'react';
import './HomeBottom.scss';

const HomeBottom = () => {
  return (
    <div id="home-container">
        <div class="home-content">
            <div class="paragraph">
                <h1>GET fit, GET strong.
                    GET healthy</h1>
                <p>Welcome to our fitness app designed to help you achieve your fitness goal and transform your body and mind.</p>
                <a href="/activities"><button type="button">GET  START</button></a>
            </div>
            <div class="activities-pic">
                <img src="/HomebottonPic/Bicycle.png" alt='Bicycle' />
            </div>
            
        </div>
        <div class="home-content">
            <div class="activities-pic">
                <img src="/HomebottonPic/Yoka.png" alt='Yoka' />
            </div>
            <div class="paragraph">
                <h1>Set Goals. Log Workouts. Stay On Track</h1>
                <p>Easily track your Workouts, set Training Plans, and discover new Workout Routines to crush your goals.</p>
                <a href="/creategoal"><button type="button">SET GOAL</button></a>
            </div>
        </div>
    </div>
  )
}

export default HomeBottom;