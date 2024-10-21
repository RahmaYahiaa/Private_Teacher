const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { updateTeacher } = require('../controllers/teacherController');
const { getTeacherCountsByLevel } = require('../controllers/teacherController');
// const { getTeacherRatingCounts } = require('../controllers/teacherController');

router.get('/list', teacherController.getTeachers);

router.post('/register', teacherController.registerTeacher);
router.put('/update/:id', updateTeacher);
router.delete('/delete/:id', teacherController.deleteTeacher);
router.get('/list/:id', teacherController.getTeacherById);
router.get('/teacher-counts', getTeacherCountsByLevel);
router.get('/subject-counts', teacherController.getTeacherCountBySubject);
router.post('/rate/:id', teacherController.rateTeacher);

// router.get('/rating-counts', getTeacherRatingCounts);


module.exports = router;