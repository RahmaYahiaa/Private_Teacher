const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define the POST route for form submission
router.post('/submit', contactController.submitContactForm);
router.get('/list', contactController.getContacts);
router.delete('/delete/:id', contactController.deleteContact);

module.exports = router;
