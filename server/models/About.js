const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  keywords: [{
    text: {
      type: String,
      required: true
    },
    highlighted: {
      type: Boolean,
      default: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);