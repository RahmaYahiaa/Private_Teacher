const User = require('../models/User');
const Student = require('../models/Student');

const bcrypt = require('bcryptjs');

exports.registerStudent = async (req, res) => {
  const { studentId,firstName, lastName, email, country, password, date_of_birth, phone, gender, academic_level, language } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, userType: 'student' });
    await user.save();

    const student = new Student({
      firstName, lastName, country, date_of_birth, phone,email, 
      gender,
      academic_level,
      language, userId: user._id,Student_Id: studentId,
    });
    await student.save();

    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




//Controller لتحديث الطالب
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }

};



exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId'); // Optionally populate the user information
    res.json(students);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ _id: req.params.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    await User.findByIdAndDelete(student.userId);
    res.json({ success: true, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

