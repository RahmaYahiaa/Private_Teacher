const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  userType: { type: String, default: 'teacher' },
  first_name: { type: String, required: true, index: true },
  last_name: { type: String, required: true, index: true },
  phone: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    index: true
  },
  teacher_desc: { type: String, required: true },
  Teacher_Id: { type: String, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: {
    type: String,
    default: "https://via.placeholder.com/150?text=No+Image"
  },
  country: { type: String, default: 'Egypt', index: true },
  onlineStatus: { type: String, default: 'online' },
  rating: { type: Number, default: 0, index: true },
  years_of_experience: { type: Number, default: 0 },
  gender: { type: String, default: 'Male' },
  date_of_birth: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  level: {
    type: String,
    enum: ['All levels', 'Junior', 'Middle', 'Senior'],
    default: 'Junior',
    index: true
  },
  language: {
    type: String,
    enum: ['English', 'Arabic', 'All Languages'],
    default: 'English',
    index: true
  },
  subject: {
    type: String,
    enum: ['Math', 'Science', "Arabic", "English", "French", "Biology", "Chemistry", "Physics", "History", "Geography", "Psychology", "Sociology", "Philosophy", "Political"],
    default: 'Math',
    index: true
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
