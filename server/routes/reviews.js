const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Submit new review
router.post('/submit', async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      status: 'pending'
    });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review' });
  }
});

// Get approved reviews
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Admin routes
router.get('/admin/:status', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ status: req.params.status });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

router.post('/admin/:id/:action', auth, async (req, res) => {
  try {
    const { id, action } = req.params;
    
    if (action === 'approve') {
      await Review.findByIdAndUpdate(id, { status: 'approved' });
    } else if (action === 'reject' || action === 'remove') {
      await Review.findByIdAndDelete(id);
    }
    
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
});

module.exports = router;