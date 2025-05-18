import React, { useState, useEffect } from 'react';
import '../../styles/admin/ManageReviews.css';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="manage-reviews">
      <h2>Manage Reviews</h2>
      <div className="tabs">
        <button 
          className={activeTab === 'pending' ? 'active' : ''} 
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={activeTab === 'approved' ? 'active' : ''} 
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
      </div>
      <div className="reviews-list">
        {/* Reviews will be mapped here */}
      </div>
    </div>
  );
};

export default ManageReviews;