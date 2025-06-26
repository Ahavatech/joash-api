const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.post('/update-credentials', async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;
    
    // Get admin user
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    // Verify current password
    const isValid = await admin.verifyPassword(currentPassword);
    if (!isValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update credentials
    if (newUsername) admin.username = newUsername;
    if (newPassword) admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Update credentials error:', error);
    res.status(500).json({ message: 'Failed to update credentials' });
  }
});

module.exports = router;