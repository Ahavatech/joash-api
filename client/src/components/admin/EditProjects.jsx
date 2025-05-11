import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import '../../styles/Admin/EditProjects.css';

const EditProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
    // TODO: Add API call to fetch projects
  };

  const handleAddProject = async (projectData) => {
    try {
      setLoading(true);
      const newProject = await createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      // Reset form or show success message
    } catch (err) {
      setError('Failed to add project');
      console.error('Error adding project:', err);
    } finally {
      setLoading(false);
    }
  };
    // TODO: Add API call to add project

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true);
        await deleteProject(projectId);
        setProjects(prev => prev.filter(project => project._id !== projectId));
      } catch (err) {
        setError('Failed to delete project');
        console.error('Error deleting project:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-projects">
      <h2>Manage Projects</h2>
      <ProjectForm onSubmit={handleAddProject} />
      <div className="projects-list">
        {projects.map(project => (
          <div key={project._id} className="project-item">
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <div className="project-actions">
              <button onClick={() => setSelectedProject(project)}>Edit</button>
              <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProjects;