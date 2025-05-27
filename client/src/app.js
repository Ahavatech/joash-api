import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AdminProvider } from './context/AdminContext';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import EditAbout from './components/Admin/EditAbout';
import EditSkills from './components/Admin/EditSkills';
import EditProjects from './components/Admin/EditProjects';
import ManageReviews from './components/Admin/ManageReviews';
import Settings from './components/Admin/Settings';
import ReviewSubmission from './pages/ReviewSubmission';

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewSubmission />} />
          <Route path="/admin">
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="edit-about" element={
              <ProtectedRoute>
                <EditAbout />
              </ProtectedRoute>
            } />
            <Route path="edit-skills" element={
              <ProtectedRoute>
                <EditSkills />
              </ProtectedRoute>
            } />
            <Route path="edit-projects" element={
              <ProtectedRoute>
                <EditProjects />
              </ProtectedRoute>
            } />
            <Route path="reviews" element={
              <ProtectedRoute>
                <ManageReviews />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;