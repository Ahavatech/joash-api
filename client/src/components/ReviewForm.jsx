import React, { useState } from 'react';
import '../styles/ReviewForm.css';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    review: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', position: '', company: '', review: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="review-form-section">
      <div className="review-form-content">
        <h2 className="section-title">Share Your Experience</h2>
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Your Position"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Your Review"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
          </button>
          {status === 'success' && (
            <p className="success-message">
              Thank you for your review!
            </p>
          )}
          {status === 'error' && (
            <p className="error-message">
              Failed to submit review. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;