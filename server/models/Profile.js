const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);