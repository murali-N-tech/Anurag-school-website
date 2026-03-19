const express = require('express');
const router = express.Router();
const { 
  createContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route for submitting a contact form
router.route('/')
  .post(createContactMessage)
  .get(protect, getContactMessages); // Protected route for admins to view messages

// Protected routes to update and delete a specific message
router.route('/:id')
  .put(protect, updateMessageStatus)
  .delete(protect, deleteMessage);

module.exports = router;