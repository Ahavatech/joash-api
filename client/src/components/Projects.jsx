import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2 className="section-title">Projects</h2>
        <p className="section-intro">
          Each project I take on is focused on solving real-world problems using no-code platforms like Bubble and powerful automation tools. From MVPs to sleek landing pages and AI-powered apps, these solutions are built to be fast, functional, and ready to scale.
        </p>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">
              {/* Add project image here */}
            </div>
            <div className="project-info">
              <h3>Project Title</h3>
              <p>Project description goes here...</p>
              <a href="#" className="project-link" target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
            </div>
          </div>
          {/* Add more project cards as needed */}
        </div>
      </div>
    </section>
  );
};

export default Projects;