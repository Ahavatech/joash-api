import React, { useState } from 'react';
import { submitReview } from '../utils/api';
import '../styles/ReviewSubmission.css';

const ReviewSubmission = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    review: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitReview(formData);
      setSuccess(true);
      // Reset form
      setFormData({ name: '', position: '', company: '', review: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-submission">
      <div className="review-container">
        {success ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>Your review has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h1>Share Your Experience</h1>
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Your Position</label>
                <input
                  type="text"
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="review">Your Review</label>
                <textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  required
                  rows={4}
                />
              </div>

              <button type="submit" disabled={loading} className="submit-button">
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewSubmission;