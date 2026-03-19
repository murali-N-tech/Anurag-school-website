const express = require('express');
const router = express.Router();

// Import controller functions and authentication middleware
const { 
  getAllEvents, 
  createEvent,
  updateEvent,
  deleteEvent 
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// Public route to get all events
// Protected route for admins to create an event
router.route('/')
  .get(getAllEvents)
  .post(protect, createEvent);

// Protected routes for admins to update or delete a specific event
router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;