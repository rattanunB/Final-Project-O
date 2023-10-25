import React from "react";
import "./ContactPage.scss";
import { Link } from "react-router-dom";
const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="about-section">
        <h2>We are project group 3</h2>
        <h3>Falcon Ping</h3>
      </div>

      <div className="my-container">
        <div className="my-container-top">
          <div className="card">
            <img src="/Team/bank.jpg" alt="Bank" />
            <h2>Bank</h2>
            <p className="title">Fullstack Developer</p>
            <p>rattanun901@gmail.com</p>
            <p>
            <Link to="https://www.linkedin.com/in/rattanun" target="_blank"><button className="button">Linked</button></Link>
            </p>
          </div>

          <div className="card">
            <img className="noom-img" src="/Team/noom.jpg" alt="Noom" />

            <h2>Noom</h2>
            <p className="title">Fullstack Developer</p>
            <p>nathawut.munsri@gmail.com</p>
            <p>
              <Link to="https://www.linkedin.com/in/nathawut-munsri/" target="_blank"><button className="button">Linked</button></Link>
            </p>
          </div>
        </div>
        <div className="my-container-bottom">
          <div className="card">
            <img src="/Team/pin.jpg" alt="Pin" />

            <h2>Pinn</h2>
            <p className="title">Fullstack Developer</p>
            <p>thanyalaktanyianiti@gmail.com</p>
            <p>
            <Link to="https://www.linkedin.com/in/thanyalak-tanyianniti/" target="_blank"><button className="button">Linked</button></Link>
            </p>
          </div>

          <div className="card">
            <img src="/Team/pulse.png" alt="pulse" />

            <h2>Pulse</h2>
            <p className="title">Fullstack Developer</p>
            <p>nuchcha.boonyato@gmail.com</p>
            <p>
            <Link to="https://www.linkedin.com/in/nuch-cha-boonyato-498936285" target="_blank"><button className="button">Linked</button></Link>
            </p>
          </div>

          <div className="card">
            <img src="/Team/fluke.jpg" alt="Fluke" />

            <h2>Fluke</h2>
            <p className="title">Fullstack Developer</p>
            <p>supachai.wans@gmail.com</p>
            <p>
              <Link to="https://www.linkedin.com/in/supachaiws/" target="_blank"><button className="button">Linked</button></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
