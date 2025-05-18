import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProfileImage, getProfileImage } from '../../utils/api';
import '../../styles/Admin/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const defaultImage = "https://res.cloudinary.com/ddcvkggle/image/upload/v1746705287/cld-sample-4.jpg";


  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const { imageUrl } = await getProfileImage();
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const { imageUrl } = await uploadProfileImage(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Portfolio Manager</h1>
        <div className="header-actions">
          <button onClick={() => navigate('/admin/settings')} className="settings-btn">
            ⚙️ Settings
          </button>
          <button onClick={() => navigate('/admin/login')} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button 
          className={`nav-item ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button 
          className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <section className="content-section">
            <h2>Profile Settings</h2>
            <div className="section-grid">
              <div className="profile-upload">
                <img 
                  src={profileImage || defaultImage} 
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div className="upload-overlay">
                  <input 
                    type="file" 
                    id="profile-upload" 
                    hidden 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="profile-upload">
                    {uploading ? 'Uploading...' : 'Update Profile Picture'}
                  </label>
                </div>
              </div>
              <div className="form-container">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="e.g. No-Code Solution Expert" />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    placeholder="Write a short bio..."
                    rows={4}
                  ></textarea>
                </div>
                <button className="save-btn">Save Changes</button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;