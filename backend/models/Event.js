const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    default: 'School Campus' 
  },
  // --- ADD THIS FIELD ---
  imageUrl: {
    type: String, // Stores the URL for the event image
    default: '',  // A default empty string is good practice
  },
});

module.exports = mongoose.model('Event', EventSchema);
