import React, { useState } from 'react';
import '../../styles/Admin/ProjectForm.css';

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    image: initialData.image || '',
    link: initialData.link || ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
        if (!file) return;

    setIsUploading(true);
    setUploadError(null);

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
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        image: data.secure_url
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
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
        disabled={isUploading}
      />
      {isUploading && <span className="upload-status">Uploading...</span>}
      {uploadError && <span className="error-message">{uploadError}</span>}
      {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Project preview" />
          </div>
        )}
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