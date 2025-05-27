import React, { useState, useEffect } from 'react';
import { getApprovedReviews } from '../utils/api';
import '../styles/Reviews.css';

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getApprovedReviews();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-content">
        <h2 className="section-title">Reviews</h2>
        <div className="reviews-slider">
          <div className="review-card">
            <blockquote>{reviews[currentSlide].review}</blockquote>
            <div className="review-author">
              <div className="author-info">
                <h4>{reviews[currentSlide].name}</h4>
                <p>{reviews[currentSlide].position} at {reviews[currentSlide].company}</p>
              </div>
              <button className="next-review" onClick={nextSlide}>
                <span>→</span>
              </button>
            </div>
          </div>
          <div className="review-pagination">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;