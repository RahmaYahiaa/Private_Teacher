const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');

// GET: Fetch user profile by ID
router.get('/profile/:id', getUserProfile);

module.exports = router;