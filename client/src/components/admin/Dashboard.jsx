import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, uploadProfileImage, updateProfile } from '../../utils/api';
import EditAbout from './EditAbout';
import EditSkills from './EditSkills';
import EditProjects from './EditProjects';
import EditReviews from './EditReviews';
import '../../styles/Admin/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [shortBio, setShortBio] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const defaultImage = "path/to/your/default-image.jpg";

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const data = await getProfile();
      console.log('Fetched profile data:', data); // Debug log
      if (data) {
        setProfileImage(data.imageUrl || defaultImage);
        setShortBio(data.shortBio || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);

      // Create FormData
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await uploadProfileImage(formData); // Pass formData instead of file
      console.log('Upload response:', response); // Debug log

      if (response?.imageUrl) {
        setProfileImage(response.imageUrl);
        // Also update the profile with new image URL
        await updateProfile({ 
          imageUrl: response.imageUrl,
          shortBio 
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!shortBio.trim()) {
      setError('Short bio cannot be empty');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await updateProfile({ 
        imageUrl: profileImage, 
        shortBio: shortBio.trim() 
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      setError('Failed to save changes');
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
          {error && <div className="error-message">{error}</div>}
          
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-image-section">
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
                      <label htmlFor="profile-upload">
                        {uploading ? 'Uploading...' : 'Change Photo'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-form">
                <div className="form-group">
                  <label>Short Bio</label>
                  <textarea 
                    value={shortBio}
                    onChange={(e) => setShortBio(e.target.value)}
                    placeholder="Write a short bio for the homepage..."
                    rows={4}
                  />
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