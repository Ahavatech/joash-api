import React, { useState } from 'react';
import '../../styles/Admin/ProjectForm.css';

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    image: initialData.image || '',
    link: initialData.link || ''
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // TODO: Add Cloudinary upload logic
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        image: data.secure_url
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      // You might want to show an error message to the user
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input
        type="text"
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <input
        type="url"
        placeholder="Project Link"
        value={formData.link}
        onChange={(e) => setFormData({...formData, link: e.target.value})}
        required
      />
      <button type="submit" className="btn-primary">
        {initialData.title ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;