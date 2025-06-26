const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Profile = require('../models/Profile');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }]
  }
});

const upload = multer({ storage });

// Get profile data
router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update profile data
router.put('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
    }
    
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Upload profile image
router.post('/upload-profile', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the secure URL from Cloudinary upload
    const imageUrl = req.file.path;

    // Update or create profile with new image URL
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
    }

    // Update the image URL
    profile.imageUrl = imageUrl;
    await profile.save();

    // Return the secure URL for immediate UI update
    res.json({ 
      imageUrl,
      message: 'Profile image updated successfully' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ...existing code...

router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body;
    
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Toggle the specified field (approved or showOnHomepage)
    review[field] = !review[field];
    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ error: 'Failed to update review status' });
  }
});

module.exports = router;