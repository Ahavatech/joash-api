import React, { useState, useEffect } from 'react';
import { getReviews } from '../../utils/api';
import '../../styles/Admin/EditReviews.css';

const EditReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    position: '',
    company: '',
    review: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add API call here when ready
      await addReview(newReview);
      await fetchReviews();
      setNewReview({ name: '', position: '', company: '', review: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-reviews">
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <h3>{review.name}</h3>
              <p>{review.position} at {review.company}</p>
            </div>
            <p className="review-content">{review.review}</p>
            <button 
              className="delete-review"
              onClick={() => handleDeleteReview(review._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="add-review-form">
        <h3>Add New Review</h3>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={newReview.name}
            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            placeholder="Reviewer's name"
            required
          />
        </div>

        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            value={newReview.position}
            onChange={(e) => setNewReview({...newReview, position: e.target.value})}
            placeholder="Job position"
            required
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            value={newReview.company}
            onChange={(e) => setNewReview({...newReview, company: e.target.value})}
            placeholder="Company name"
            required
          />
        </div>

        <div className="form-group">
          <label>Review</label>
          <textarea
            value={newReview.review}
            onChange={(e) => setNewReview({...newReview, review: e.target.value})}
            placeholder="Write the review here..."
            rows={4}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Review'}
        </button>
      </form>
    </div>
  );
};

export default EditReviews;