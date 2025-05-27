import React, { useState, useEffect } from 'react';
import { getProjects } from '../utils/api';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2 className="section-title">Projects</h2>
        <p className="section-intro">
          Each project I take on is focused on solving real-world problems using no-code platforms like Bubble and powerful automation tools. From MVPs to sleek landing pages and AI-powered apps, these solutions are built to be fast, functional, and ready to scale.
        </p>
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project._id}>
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.name} />
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.details}</p>
                  <a 
                    href={project.link} 
                    className="project-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Visit Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;