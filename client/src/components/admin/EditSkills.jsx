import React, { useState, useEffect } from 'react';
import { getSkills, addSkill, deleteSkill } from '../../utils/api';
import '../../styles/Admin/EditSkills.css';

const EditSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', icon: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      setError('Failed to fetch skills');
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Upload icon to Cloudinary first if it exists
      let iconUrl = '';
      if (newSkill.icon) {
        const formData = new FormData();
        formData.append('file', newSkill.icon);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) throw new Error('Icon upload failed');
        const data = await response.json();
        iconUrl = data.secure_url;
      }

      // Add skill with icon URL
      const skillData = {
        name: newSkill.name,
        icon: iconUrl
      };

      const addedSkill = await addSkill(skillData);
      setSkills(prev => [...prev, addedSkill]);
      setNewSkill({ name: '', icon: null }); // Reset form
    } catch (err) {
      setError('Failed to add skill');
      console.error('Error adding skill:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        setLoading(true);
        await deleteSkill(skillId);
        setSkills(prev => prev.filter(skill => skill._id !== skillId));
      } catch (err) {
        setError('Failed to delete skill');
        console.error('Error deleting skill:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // ...existing return statement...
  return (
    <div className="edit-skills">
      <h2>Edit Skills</h2>
      <form onSubmit={handleAddSkill}>
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewSkill({...newSkill, icon: e.target.files[0]})}
        />
        <button type="submit" className="btn-primary">Add Skill</button>
      </form>
      <div className="skills-list">
        {skills.map(skill => (
          <div key={skill._id} className="skill-item">
            <img src={skill.icon} alt={skill.name} />
            <span>{skill.name}</span>
            <button onClick={() => handleDeleteSkill(skill._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditSkills;