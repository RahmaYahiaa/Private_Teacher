const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userType: { type: String, default: 'student' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Student_Id: { type: String, unique: true, index: true },
  email: {
    type: String,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    index: true
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150?text=No+Image"
  },
  onlineStatus: { type: String, default: 'online' },
  date_of_birth: {
    type: Date
  },
  phone: { type: String },
  gender: { type: String },
  academic_level: { type: String },
  language: {
    type: String,
    enum: ['English', 'Arabic', 'All Languages'],
    default: 'English'
  }


});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;