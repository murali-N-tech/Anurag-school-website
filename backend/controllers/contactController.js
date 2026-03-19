const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail'); // Import the new email utility

/**
 * @desc    Create a new contact message and send email notification
 * @route   POST /api/contact
 * @access  Public
 */
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // First, save the message to the database
    const newContactMessage = await Contact.create({ name, email, subject, message });

    // After saving, try to send an email notification to the admin
    try {
      const emailHtml = `
        <h1>New Contact Form Submission</h1>
        <p>You have received a new message from the Anurag School website.</p>
        <h2>Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          <li><strong>Subject:</strong> ${subject}</li>
        </ul>
        <h3>Message:</h3>
        <p>${message}</p>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Message: ${subject}`,
        html: emailHtml,
      });

    } catch (emailError) {
      // IMPORTANT: If the email fails to send, we don't want to show an error to the user
      // because their message WAS successfully saved. We just log the email error on the server.
      console.error('Email notification could not be sent:', emailError);
    }
    
    // Send a success response to the user, confirming their message was received.
    res.status(201).json({ success: true, data: newContactMessage });

  } catch (dbError) {
    // This will catch any errors from trying to save to the database.
    console.error('Database save error:', dbError);
    res.status(500).json({ success: false, message: 'Server Error', error: dbError.message });
  }
};


// --- Other functions remain the same ---

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
    await message.deleteOne();
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
