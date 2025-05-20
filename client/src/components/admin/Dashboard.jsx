import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, uploadProfileImage, updateProfile } from '../../utils/api';
import EditAbout from './EditAbout';
import EditSkills from './EditSkills';
import EditProjects from './EditProjects';
import EditReviews from '../Admin/EditReviews';
import '../../styles/Admin/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    bio: ''
  });
  
  const navigate = useNavigate();
  const defaultImage = "https://res.cloudinary.com/ddcvkggle/image/upload/v1747593098/portfolio/default-profile.jpg";

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const data = await getProfile();
      if (data) {
        setProfileData(data);
        setProfileImage(data.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const { imageUrl } = await uploadProfileImage(file);
      setProfileImage(imageUrl);
      setProfileData(prev => ({ ...prev, imageUrl }));
      await updateProfile({ ...profileData, imageUrl });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      await updateProfile(profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard">
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>Portfolio Manager</h1>
          <p>Welcome back!</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="icon">👤</span>
            Profile
          </button>
          <button 
            className={`nav-button ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="icon">📝</span>
            About
          </button>
          <button 
            className={`nav-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <span className="icon">💡</span>
            Skills
          </button>
          <button 
            className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="icon">🎯</span>
            Projects
          </button>
          <button 
            className={`nav-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span className="icon">⭐</span>
            Reviews
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => navigate('/admin/settings')} className="settings-button">
            <span className="icon">⚙️</span>
            Settings
          </button>
          <button onClick={() => navigate('/admin/login')} className="logout-button">
            <span className="icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        </header>

        <div className="content-body">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-image-section">
                <div className="image-container">
                  <img 
                    src={profileImage || defaultImage} 
                    alt="Profile"
                    className="profile-image"
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
                    <label htmlFor="profile-upload" className={uploading ? 'uploading' : ''}>
                      {uploading ? 'Uploading...' : 'Change Photo'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={profileData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. No-Code Solution Expert" 
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Write a short bio..."
                    rows={4}
                  ></textarea>
                </div>
                <button 
                  className="save-button"
                  onClick={handleSaveChanges}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
          {activeTab === 'about' && <EditAbout />}
          {activeTab === 'skills' && <EditSkills />}
          {activeTab === 'projects' && <EditProjects />}
          {activeTab === 'reviews' && <EditReviews />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;