const mongoose = require('mongoose');

// Define the schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Create the model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
