const About = require('../models/About');

// Get about content
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { content: '', keywords: [] });
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
};

// Update about content
exports.updateAbout = async (req, res) => {
  try {
    const { content, keywords } = req.body;

    // Validate the data
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Update or create about content
    const updatedAbout = await About.findOneAndUpdate(
      {}, // find first document
      { 
        content,
        keywords: keywords.map(k => ({
          text: k.text,
          highlighted: Boolean(k.highlighted)
        }))
      },
      { new: true, upsert: true } // create if doesn't exist, return updated doc
    );

    console.log('Updated about content:', updatedAbout); // Debug log
    res.json(updatedAbout);

  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};