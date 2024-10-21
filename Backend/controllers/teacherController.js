const Teacher = require('../models/Teacher');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.registerTeacher = async (req, res) => {
  const { first_name, last_name, email, phone, teacher_desc, password, subject_id, image, country, rating, years_of_experience, gender } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacherId = uuidv4();

    const user = new User({ email, password: hashedPassword, userType: 'teacher' });
    await user.save();

    const teacher = new Teacher({
      first_name,
      last_name,
      phone,
      email,
      teacher_desc,
      subject_id,
      Teacher_Id: teacherId,
      userId: user._id,
      image: image || undefined,
      country: country || 'Egypt', // Default country
      onlineStatus: 'online', // Default online status
      rating: rating || 0, // Default rating
      years_of_experience: years_of_experience || 0, // Default years of experience
      gender // Set the provided gender
    });

    await teacher.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('userId'); // Optionally populate the user information
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Controller لتحديث المدرس
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.json({ success: true, data: teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId); // Adjust this to your actual model method

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTeacherCountsByLevel = async (req, res) => {
  try {
    const allCount = await Teacher.countDocuments(); // Count all teachers
    const juniorCount = await Teacher.countDocuments({ level: 'Junior' }); // Count Junior level teachers
    const middleCount = await Teacher.countDocuments({ level: 'Middle' }); // Count Middle level teachers
    const seniorCount = await Teacher.countDocuments({ level: 'Senior' }); // Count Senior level teachers

    res.json({
      all: allCount,
      junior: juniorCount,
      middle: middleCount,
      senior: seniorCount
    });
  } catch (error) {
    console.error('Error fetching teacher counts by level:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.getTeacherCountBySubject = async (req, res) => {
  try {
    const teacherCounts = await Teacher.aggregate([
      {
        $group: {
          _id: "$subject", // Group by subject
          count: { $sum: 1 } // Count the number of teachers
        }
      }
    ]);

    const formattedCounts = teacherCounts.map((item) => ({
      subject: item._id,
      count: item.count
    }));

    res.json(formattedCounts);
  } catch (error) {
    console.error('Error fetching teacher counts by subject:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.getTeacherRatingCounts = async (req, res) => {
//   try {
//       const ratingCounts = await Teacher.aggregate([
//           {
//               $group: {
//                   _id: "$rating", // Assuming there's a 'rating' field in the Teacher model
//                   count: { $sum: 1 } // Count the number of teachers for each rating
//               }
//           },
//           {
//               $project: {
//                   rating: { $toString: "$_id" }, // Convert ObjectId to string if necessary
//                   count: 1,
//                   _id: 0
//               }
//           }
//       ]);

//       // Example of ratings you might want to send back
//       const formattedRatings = [
//           { rating: '5.0', count: 0 },
//           { rating: '4.5', count: 0 },
//           { rating: '4.0', count: 0 },
//           { rating: '3.5', count: 0 },
//           { rating: '3.0', count: 0 },
//           { rating: '2.5', count: 0 },
//           { rating: '2.0', count: 0 },
//           { rating: '1.5', count: 0 },
//           { rating: '1.0', count: 0 }
//       ];

//       // Merge the counts with the formatted ratings
//       ratingCounts.forEach((item) => {
//           const rating = formattedRatings.find(r => r.rating === item.rating);
//           if (rating) {
//               rating.count = item.count; // Set the count from the aggregation result
//           }
//       });

//       res.json(formattedRatings);
//   } catch (error) {
//       console.error('Error fetching teacher rating counts:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// };
//};


// exports.deleteTeacher = async (req, res) => {
//   try {
//       const teacher = await Teacher.findOneAndDelete({ userId: req.params.id });
//       if (!teacher) {
//           return res.status(404).json({ success: false, message: 'Teacher not found' });
//       }
//       res.json({ success: true, data: {} });
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Server error' });
//   }
// }
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({ Teacher_Id: req.params.id });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    await User.findByIdAndDelete(teacher.userId);
    res.json({ success: true, data: {} });
  } catch (err) {
    console.error('Error deleting teacher:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}

exports.rateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ Teacher_Id: req.params.id });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    const { rating } = req.body;
    teacher.rating = rating;
    await teacher.save();

    res.json({ success: true, data: teacher });
  } catch (err) {
    console.error('Error rating teacher:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}