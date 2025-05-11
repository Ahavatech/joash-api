import React from 'react';
import '../styles/About.css';

const About = ({ aboutData }) => {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="section-title">About Me<span className="title-line"></span></h2>
        <div className="about-text">
          <p className="intro-text">
            Hi, I'm Joash Otitooluwa Adeoye — a <span className="highlight">NoCode solutions expert</span> passionate about turning ideas into <span className="highlight">functional, user-friendly digital products</span>. I specialize in using platforms like <span className="highlight">Bubble.io, Figma</span>, and <span className="highlight">automation tools</span> to help startups and individuals build <span className="highlight">responsive, scalable MVPs</span> without writing traditional code.
          </p>
          <p>
            With years of experience in the no-code ecosystem, I've helped founders launch fully interactive web apps, engaging <span className="highlight">landing pages</span>, and <span className="highlight">automated workflows</span> that save time and resources. Whether it's creating <span className="highlight">sleek websites</span>, integrating <span className="highlight">AI-powered tools like OpenAI</span>, or setting up systems that boost productivity, I bring a problem-solving mindset and a results-driven approach to every project.
          </p>
          <p>
            I believe in building products that are not just visually appealing but also effective solutions that are ready to scale and sell. My goal is to bridge the gap between vision and reality for clients who want to launch quickly without compromising quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;