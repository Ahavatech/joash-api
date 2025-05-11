import React from 'react';
import '../styles/Projects.css';

const Projects = ({ projects }) => {
  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects?.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  Visit Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;