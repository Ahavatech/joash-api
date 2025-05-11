import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-actions">
        <Link to="/admin/edit-projects" className="admin-btn">Manage Projects</Link>
        <Link to="/admin/edit-bio" className="admin-btn">Edit Bio</Link>
        <Link to="/admin/edit-skills" className="admin-btn">Edit Skills</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;