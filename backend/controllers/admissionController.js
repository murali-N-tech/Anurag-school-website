const Admission = require('../models/Admission');

/**
 * @desc    Submit a new admission application
 * @route   POST /api/admissions
 * @access  Public
 */
exports.createAdmission = async (req, res) => {
  try {
    // Creates a new admission document from the request body
    const newAdmission = await Admission.create(req.body);
    res.status(201).json(newAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all admission applications
 * @route   GET /api/admissions
 * @access  Private/Admin
 */
exports.getAllAdmissions = async (req, res) => {
  try {
    // Finds all admissions and sorts them by the most recent
    const admissions = await Admission.find().sort({ submittedAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};