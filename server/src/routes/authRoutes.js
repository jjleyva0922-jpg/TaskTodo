const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Verify token / Get current user
router.get('/me', authController.me);
// Logout
router.post('/logout', authController.logout);

module.exports = router;
