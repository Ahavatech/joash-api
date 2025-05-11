import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hey, I'm Joash</h1>
          <div className="title-container">
            <div className="title-nocode">
              <span className="highlight">No</span>Code
            </div>
            <div className="title-solution-expert">Solution Expert</div>
          </div>
          <p>
            I help startups and individuals bring their ideas and 
            product to life by building responsive and sellable MVPs
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Get in touch</a>
            <a href="#about" className="btn-secondary">Learn more</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-circle">
            <div className="profile-image">
              <img src="/path-to-profile-image.jpg" alt="Joash" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;