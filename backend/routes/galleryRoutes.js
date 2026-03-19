const express = require('express');
const router = express.Router();
const { 
  getAuthParams, 
  getGallery, 
  addPhoto, 
  reorderGallery, 
  deletePhoto 
} = require('../controllers/galleryController');

// Import the protect middleware you just shared
const { protect } = require('../middleware/authMiddleware'); 

// PUBLIC ROUTES (Anyone can view the gallery)
router.get('/', getGallery);

// PROTECTED ROUTES (Only logged-in admins can do these)
router.get('/auth', protect, getAuthParams); // ImageKit Auth
router.post('/', protect, addPhoto);         // Save to DB
router.put('/reorder', protect, reorderGallery); // Drag & Drop
router.delete('/:id', protect, deletePhoto);    // Delete

module.exports = router;