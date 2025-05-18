const About = require('../models/About');

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about content' });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (about) {
      about.content = req.body.content;
      await about.save();
    } else {
      await About.create({ content: req.body.content });
    }
    res.json({ message: 'About content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating about content' });
  }
};