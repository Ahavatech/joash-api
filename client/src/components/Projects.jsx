import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2 className="section-title">Projects</h2>
        <p className="section-intro">
          Over the years, I've mastered a range of no-code tools and platforms that help me bring
          powerful digital products to life—quickly, efficiently, and without writing traditional code.
          These are the core tools I use to deliver responsive MVPs, automations, and seamless user
          experiences:
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