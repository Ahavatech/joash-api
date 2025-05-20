const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');

const upload = multer({ dest: 'uploads/' });

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Add new project with image
router.post('/', upload.single('projectImage'), async (req, res) => {
  try {
    const { name, details, link } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Project image is required' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/projects'
    });

    const project = new Project({
      name,
      details,
      imageUrl: result.secure_url,
      link
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Extract public_id from Cloudinary URL
    const publicId = project.imageUrl.split('/').slice(-1)[0].split('.')[0];
    
    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(`portfolio/projects/${publicId}`);
    
    // Delete project from database
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;