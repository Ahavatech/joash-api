import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCredentials } from '../../utils/api';
import '../../styles/admin/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (credentials.newPassword !== credentials.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    try {
      await updateCredentials(credentials);
      setMessage({ type: 'success', text: 'Credentials updated successfully' });
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update credentials' });
    }
  };

  return (
    <div className="admin-settings">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          ← Back
        </button>
        <h2>Settings</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            required
            value={credentials.currentPassword}
            onChange={(e) => setCredentials({...credentials, currentPassword: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>New Username</label>
          <input
            type="text"
            value={credentials.newUsername}
            onChange={(e) => setCredentials({...credentials, newUsername: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={credentials.newPassword}
            onChange={(e) => setCredentials({...credentials, newPassword: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={credentials.confirmPassword}
            onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
          />
        </div>
        <button type="submit" className="save-btn">Update Credentials</button>
      </form>
    </div>
  );
};

export default Settings;