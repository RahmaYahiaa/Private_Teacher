const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' }); // User does not exist
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' }); // Incorrect password
    }

    // If user is successfully verified, return user information along with userType
    return res.json({
      success: true,
      message: 'Login successful',
      _id: user._id,  // Add the user ID to the response
      userType: user.userType, // Include userType in the response
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ success: false, message: err.message }); // Any other error
  }
};




// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' }); // User does not exist
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' }); // Incorrect password
//     }

//     // If user is successfully verified
//     res.json({ success: true, message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message }); // Any other error
//   }
// };


// const User = require('../models/User');
// const Student = require('../models/Student');
// const Teacher = require('../models/Teacher');
// const bcrypt = require('bcryptjs');

// exports.registerStudent = async (req, res) => {
//   const { firstName, lastName, email, country, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();

//     const student = new Student({ firstName, lastName, country, userId: user._id });
//     await student.save();

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.registerTeacher = async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     email,
//     phone,
//     teacher_desc,
//     password,
//     subject_id,
//     country,
//     gender,
//     years_of_experience
//   } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const user = new User({ email, password: hashedPassword }); // Create a new user
//     await user.save();

//     // Generate unique Teacher_Id
//     const Teacher_Id = new mongoose.Types.ObjectId().toString();

//     const teacher = new Teacher({
//       first_name,
//       last_name,
//       phone,
//       teacher_desc,
//       subject_id,
//       userId: user._id,
//       country: country || 'Egypt', // Default country is 'Egypt'
//       Teacher_Id,
//       gender,
//       years_of_experience: years_of_experience || 0, // Default years of experience is 0
//       onlineStatus: 'online', // Default online status is 'online'
//       image: "https://via.placeholder.com/150?text=No+Image", // Default image URL
//       rating: 0 // Default rating is 0
//     });
//     await teacher.save();

//     res.json({ success: true, message: "Teacher registered successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };