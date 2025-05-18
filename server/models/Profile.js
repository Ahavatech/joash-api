const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);