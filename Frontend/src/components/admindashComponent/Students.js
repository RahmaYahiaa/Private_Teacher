import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './AdminDashboard.css'; // Ensure your styles are imported
import { useDispatch } from 'react-redux';
import { setTotalStudents } from '../teacherComponents/redux/slices/dash-board-slice';

const StudentsDashboard = () => {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });
    const [editingStudentId, setEditingStudentId] = useState(null); // To track if updating a student
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students/list');
            setStudents(response.data);
            dispatch(setTotalStudents(response.data.length));
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleRegisterStudent = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (editingStudentId) {
                // Update Student
                const response = await axios.put(`http://localhost:5000/api/students/update/${editingStudentId}`, newStudent);
                if (response.status === 200) {
                    setStudents(
                        students.map((student) =>
                            student._id === editingStudentId ? response.data : student
                        )
                    );
                }
            } else {
                // Add new student
                const response = await axios.post('http://localhost:5000/api/students/register', newStudent);
                if (response.status === 201) {
                    setStudents([...students, response.data]);
                }
            }

            // Reset form and state after adding/updating
            setNewStudent({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
            });
            setEditingStudentId(null);
        } catch (error) {
            console.error('Error registering/updating student:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/students/delete/${studentId}`);
            setStudents(students.filter((student) => student._id !== studentId));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleEditStudent = (student) => {
        setNewStudent({
            firstName: student.firstName,
            lastName: student.lastName,
            phone: student.phone,
            email: student.email,
        });
        setEditingStudentId(student._id);
    };

    // Filter students based on the search term
    const filteredStudents = students.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid className="admin-dashboard">
            <h1 className="text-center my-4">{t('Students Dashboard')}</h1>

            {/* Search Input */}
            <Form.Group className="mb-3">

                <Form.Control
                    type="text"
                    placeholder={t('Search by name...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>


            {/* Students List */}
            <Row>
                <Col>
                    <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('First Name')}</th>
                                    <th>{t('Last Name')}</th>
                                    <th>{t('Phone')}</th>
                                    <th>{t('Email')}</th>
                                    <th>{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={student._id}>
                                        <td>{index + 1}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            <Button
                                                className="button-delete"
                                                variant="danger"
                                                onClick={() => handleDeleteStudent(student._id)}
                                            >
                                                {t('Delete')}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>

            {/* Register or Edit Student */}
            {/* Form for adding/updating students can be added here */}
            {/* Uncomment and implement similar to the previous example if needed */}
        </Container>
    );
};

export default StudentsDashboard;
