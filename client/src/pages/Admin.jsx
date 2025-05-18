import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import EditProjects from '../components/Admin/EditProjects';
import EditBio from '../components/Admin/EditBio';
import EditSkills from '../components/Admin/EditSkills';
import '../styles/pages/Admin.css';

const Admin = () => {
  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="edit-projects" element={<EditProjects />} />
        <Route path="edit-bio" element={<EditBio />} />
        <Route path="edit-skills" element={<EditSkills />} />
      </Routes>
    </div>
  );
};

export default Admin;