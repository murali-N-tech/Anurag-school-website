// =================================================================
// FILE: backend/controllers/eventController.js (FIXED)
// =================================================================
const Event = require('../models/Event'); // Make sure to import the Event model

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
exports.getAllEvents = async (req, res) => {
  try {
    // Find all events in the database and sort them by date
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private/Admin
 */
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    // Basic validation
    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Please provide title, description, and date.' });
    }

    // Create the event in the database
    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
    });
    
    // Send back the created event as confirmation
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Update an event
 * @route   PUT /api/events/:id
 * @access  Private/Admin
 */
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Delete an event
 * @route   DELETE /api/events/:id
 * @access  Private/Admin
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};
