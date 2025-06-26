const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get approved reviews for homepage
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      approved: true,
      showOnHomepage: true 
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    res.status(500).json({ error: 'Failed to fetch approved reviews' });
  }
});

// Submit new review
router.post('/submit', async (req, res) => {
  try {
    const { name, position, company, review } = req.body;
    
    const newReview = new Review({
      name,
      position,
      company,
      review,
      approved: false,
      showOnHomepage: false
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// ...existing code...

// Get approved reviews
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    res.status(500).json({ error: 'Failed to fetch approved reviews' });
  }
});

// Update review status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.approved = !review.approved;
    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ error: 'Failed to update review status' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});
module.exports = router;