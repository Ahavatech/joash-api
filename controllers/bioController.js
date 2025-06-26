const Bio = require('../models/Bio');

exports.getBio = async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.json(bio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBio = async (req, res) => {
  try {
    let bio = await Bio.findOne();
    if (bio) {
      bio = await Bio.findOneAndUpdate({}, req.body, { new: true });
    } else {
      bio = new Bio(req.body);
      await bio.save();
    }
    res.json(bio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};