const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

// In a real app, you would protect the register route
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;