const express = require('express');
const { registerStudent, updateStudent, getStudents, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

router.post('/register', registerStudent);

router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);


router.get('/list', getStudents);









module.exports = router;