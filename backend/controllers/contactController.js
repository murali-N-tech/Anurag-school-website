const Contact = require('../models/Contact');

/**
 * @desc    Create a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
exports.createContactMessage = async (req, res) => {
  // This function remains the same
  try {
    const { name, email, subject, message } = req.body;
    const newContactMessage = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: newContactMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private/Admin
 */
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ submittedAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Update a message's read status
 * @route   PUT /api/contact/:id
 * @access  Private/Admin
 */
exports.updateMessageStatus = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    // Toggle the isRead status
    message.isRead = !message.isRead;
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Delete a contact message
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.deleteOne(); // Use deleteOne() in Mongoose v6+
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};