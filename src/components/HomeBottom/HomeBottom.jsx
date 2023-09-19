import React from 'react';
import './HomeBottom.css';
// import bicycle from '/public/HomebottonPic/Bicycle.png';
// import yoka from '/public/HomebottonPic/Yoka.png';
const HomeBottom = () => {
  return (
    // <div>HomeBottom</div>
    <div id="container">
        <div class="div-1">
            <div class="paragraph">
                <h1>Set Goals.
                    Log Workouts.
                    Stay On Track</h1>
                <p>Easily track your Workouts, set Training Plans, and discover new Workout Routines to crush your goals.</p>
                <button type="button">GET  START</button>
            </div>
            <div class="pic">
                <img src="/HomebottonPic/Bicycle.png" alt='Bicycle' />
            </div>
            
        </div>
        <div class="div-1">
            <div class="pic">
                <img src="/HomebottonPic/Yoka.png" alt='Yoka' />
            </div>
            <div class="paragraph">
                <h1>Set Goals. Log Workouts. Stay On Track</h1>
                <p>Easily track your Workouts, set Training Plans, and discover new Workout Routines to crush your goals.</p>
                <button type="button">SET GOAL</button>
            </div>
        </div>
    </div>
  )
}

export default HomeBottom;