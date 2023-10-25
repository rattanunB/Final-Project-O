import React from 'react'
import "./ActivitiesPage.scss"


const ActivitiesPage = () => {
  return (
    <div className="activity">
      <div className="activity-type">
        <div className="activity-image">
          <img src="images\running-activity.png" alt="running image" />
        </div>
        <div className="activity-detail">
          <h3>Running</h3>
          <p>
            Running is considered a highly beneficial exercise for overall good health. Running is important because it offers a wide range of physical and mental benefits that contribute to a healthier, happier, and more fulfilling life.
          </p>
          <div className='btn-getstart'>
            <a href='/createactivity'><button>GET START</button></a>
          </div>
        </div>
      </div>
      <div className="activity-type">
        <div  className="activity-image">
          <img src="images\yoga-activity.png" alt="yoga image"/>
        </div>
        <div className="activity-detail">
          <h3>Yoga</h3>
          <p>
            Yoga is a holistic system of physical and mental practices that originated in ancient India. It encompasses a wide range of techniques and philosophies aimed at promoting physical health, mental well-being, and spiritual growth.
          </p>
          <div className='btn-getstart'>
            <a href='/createactivity'><button>GET START</button></a>
          </div>
        </div>
      </div>
      <div className="activity-type">
        <div  className="activity-image">
          <img src="images\bike-activity.png" alt="biking image"/>
        </div>
        <div className="activity-detail">
          <h3>Bike</h3>
          <p>
            A "bike," short for "bicycle," is a human-powered, two-wheeled vehicle that is propelled by pedaling. Bicycles have been a popular means of transportation and recreation for many years. 
          </p>
          <div className='btn-getstart'>
            <a href='/createactivity'><button>GET START</button></a>
          </div>
        </div>
      </div>
      <div className="activity-type">
        <div  className="activity-image">
          <img src="images\abs-image.png" alt="abs image" />
        </div>
        <div className="activity-detail">
          <h3>ABS</h3>
          <p>
            In the context of health and fitness, "ABS" typically refers to abdominal muscles. These are the muscles located in your abdominal region, commonly known as your "core." They play a significant role in various bodily functions and are important for overall health and well-being.
          </p>
          <div className='btn-getstart'>
            <a href='/createactivity'><button>GET START</button></a>
          </div>
        </div>
      </div>
      <div className="activity-type">
        <div  className="activity-image">
          <img src="images\weight-activity.png" alt="body weight image"/>
        </div>
        <div className="activity-detail" id='weight-training'>
          <h3>Weight Training</h3>
          <p>
            Weight training, also known as strength training or resistance training, is a form of exercise that involves lifting weights or using resistance to increase muscle strength, endurance, and size.
          </p>
          <div className='btn-getstart'>
            <a href='/createactivity'><button>GET START</button></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivitiesPage