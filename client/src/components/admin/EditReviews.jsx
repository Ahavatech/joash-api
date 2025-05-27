import React, { useState, useEffect } from 'react';
import { getReviews, updateReviewStatus } from '../../utils/api';

const EditReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reviewId, field) => {
    try {
      const updatedReview = await updateReviewStatus(reviewId, field);
      setReviews(reviews.map(review => 
        review._id === reviewId ? updatedReview : review
      ));
    } catch (err) {
      setError('Failed to update review status');
    }
  };

  if (loading) return <div className="loading">Loading reviews...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-reviews">
      <h3>Manage Reviews</h3>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review._id} className="review-item">
            <div className="review-content">
              <h4>{review.name}</h4>
              <p className="review-meta">
                {review.position} at {review.company}
              </p>
              <blockquote>{review.review}</blockquote>
            </div>
            <div className="review-actions">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={review.approved}
                  onChange={() => handleStatusChange(review._id, 'approved')}
                />
                Approved
              </label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={review.showOnHomepage}
                  onChange={() => handleStatusChange(review._id, 'showOnHomepage')}
                />
                Show on Homepage
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditReviews;