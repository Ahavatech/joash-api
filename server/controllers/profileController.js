const cloudinary = require('../config/cloudinary');
const Profile = require('../models/Profile');

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/profile',
      transformation: [
        { width: 500, height: 500, crop: 'fill' }
      ]
    });

    // Update profile with new image URL
    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      { 
        imageUrl: result.secure_url
      },
      { new: true, upsert: true }
    );

    res.json({ 
      imageUrl: result.secure_url 
    });

  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};