const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

exports.getUserProfile = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let additionalData = null;

        // Check the user type and fetch the corresponding data
        // if (user.userType === 'teacher') {
        //     additionalData = await Teacher.findOne({ userId: user._id });
        // } else if (user.userType === 'student') {
        //     additionalData = await Student.findOne({ userId: user._id });
        // }
        const teacher = await Teacher.findOne({ userId: user._id });
        const student = await Student.findOne({ userId: user._id });


        if (teacher) {
            additionalData = teacher;
        } else if (student) {
            additionalData = student;
        }

        res.json({
            success: true,
            user,
            additionalData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};