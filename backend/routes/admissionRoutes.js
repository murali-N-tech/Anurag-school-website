const express = require('express');
const router = express.Router();
const { createAdmission, getAllAdmissions } = require('../controllers/admissionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createAdmission)
  .get(protect, getAllAdmissions);

// Make sure this is the export statement
module.exports = router;