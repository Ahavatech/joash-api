import React, { useState, useEffect } from 'react';
import { updateAbout, getAbout } from '../../utils/api';
import '../../styles/Admin/EditAbout.css';

const EditAbout = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    experience: '',
    mission: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const data = await getAbout();
      if (data) {
        setFormData(data);
      }
    } catch (err) {
      setError('Failed to fetch about data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateAbout(formData);
      alert('About section updated successfully!');
    } catch (err) {
      setError('Failed to update about section');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="edit-about">
      <h2>Edit About Section</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mission">Mission</label>
          <textarea
            id="mission"
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update About'}
        </button>
      </form>
    </div>
  );
};

export default EditAbout;