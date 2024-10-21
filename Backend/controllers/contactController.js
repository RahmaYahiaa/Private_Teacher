const Contact = require('../models/contactModel');

// Controller function to handle form submission
exports.submitContactForm = async (req, res) => {
  try {
    // Create a new contact entry with data from the request body
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    // Save the contact data to MongoDB
    await newContact.save();

    // Send a success response
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    // Handle errors and send failure response
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};

// Controller function to get all contact entries
exports.getContacts = async (req, res) => {
  try {
    // Fetch all contact entries from MongoDB
    const contacts = await Contact.find();

    // Send the contact entries as a response
    res.json(contacts);
  } catch (error) {
    // Handle errors and send failure response
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete({_id:req.params.id});
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
