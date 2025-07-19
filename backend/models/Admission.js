const mongoose = require('mongoose');

// Defines the schema for an admission application
const AdmissionSchema = new mongoose.Schema({
  studentName: { 
    type: String, 
    required: true 
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  parentName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending' 
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Admission', AdmissionSchema);