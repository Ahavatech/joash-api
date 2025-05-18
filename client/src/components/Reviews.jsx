import React, { useState } from 'react';
import '../styles/Reviews.css';

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Temporary static data until backend is ready
  const dummyReviews = [
    {
      id: 1,
      name: "Tevin Lowes",
      position: "CEO",
      company: "Holmes Inc.",
      review: "Securing your site is a must. And we got that taken care of, so you don't need to worry."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "CTO",
      company: "Tech Solutions",
      review: "Outstanding work on our MVP. The no-code solution exceeded our expectations."
    },
    {
      id: 3,
      name: "Mike Chen",
      position: "Founder",
      company: "StartupHub",
      review: "The automation workflows saved us countless hours. Highly recommended!"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dummyReviews.length);
  };

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-content">
        <h2 className="section-title">Reviews</h2>
        <div className="reviews-slider">
          <div className="review-card">
            <blockquote>{dummyReviews[currentSlide].review}</blockquote>
            <div className="review-author">
              <div className="author-info">
                <h4>{dummyReviews[currentSlide].name}</h4>
                <p>{dummyReviews[currentSlide].position} at {dummyReviews[currentSlide].company}</p>
              </div>
              <button className="next-review" onClick={nextSlide}>
                <span>→</span>
              </button>
            </div>
          </div>
          <div className="review-pagination">
            {dummyReviews.map((_, index) => (
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