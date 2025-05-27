import React, { useState, useEffect } from 'react';
import { getReviews, updateReviewStatus, deleteReview } from '../../utils/api';
import '../../styles/Admin/ManageReviews.css';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        setReviews(reviews.filter(review => review._id !== reviewId));
      } catch (err) {
        setError('Failed to delete review');
      }
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      const updatedReview = await updateReviewStatus(reviewId, 'approved');
      setReviews(reviews.map(review => 
        review._id === reviewId ? updatedReview : review
      ));
    } catch (err) {
      setError('Failed to update review status');
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="manage-reviews">
      <h2>Manage Reviews</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review._id} className="review-item">
            <div className="review-content">
              <h4>{review.name}</h4>
              <p className="review-meta">{review.position} at {review.company}</p>
              <blockquote>{review.review}</blockquote>
            </div>
            <div className="review-actions">
              <button 
                className={`approve-btn ${review.approved ? 'approved' : ''}`}
                onClick={() => handleApprove(review._id)}
              >
                {review.approved ? 'Approved' : 'Approve'}
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;