const express = require('express');
const router = express.Router();
const { 
  getBio, 
  updateBio 
} = require('../controllers/bioController');

router.get('/', getBio);
router.put('/', updateBio);

module.exports = router;