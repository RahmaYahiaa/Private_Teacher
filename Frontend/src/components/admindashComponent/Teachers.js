import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import './AdminDashboard.css';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setTotalTeachers } from '../teacherComponents/redux/slices/dash-board-slice';

const TeachersDashboard = () => {
    const { t } = useTranslation();
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newTeacher, setNewTeacher] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        subject: '',
    });
    const [editingTeacherId, setEditingTeacherId] = useState(null); // Track if updating a teacher
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/teachers/list');
            setTeachers(response.data);

            // Dispatch the total number of teachers to the Redux store
            dispatch(setTotalTeachers(response.data.length));
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleRegisterTeacher = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let response;

            if (editingTeacherId) {
                // Update existing teacher
                response = await axios.put(
                    `http://localhost:5000/api/teachers/update/${editingTeacherId}`,
                    newTeacher
                );
                if (response.status === 200) {
                    // Update the state with the new teacher data
                    setTeachers((prevTeachers) =>
                        prevTeachers.map((teacher) =>
                            teacher.Teacher_Id === editingTeacherId
                                ? response.data
                                : teacher
                        )
                    );
                }
            } else {
                // Register new teacher
                response = await axios.post(
                    'http://localhost:5000/api/teachers/register',
                    newTeacher
                );
                if (response.status === 201) {
                    // Add the new teacher to the list
                    setTeachers([...teachers, response.data]);
                }
            }

            // Reset form and state after operation
            setNewTeacher({
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                password: '',
                subject: '',
            });
            setEditingTeacherId(null);
        } catch (error) {
            console.error('Error registering/updating teacher:', error);
            alert('An error occurred while saving the teacher. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher({ ...newTeacher, [name]: value });
    };

    const handleDeleteTeacher = async (teacherId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/teachers/delete/${teacherId}`
            );
            console.log('Delete Response:', response.data);

            setTeachers((prevTeachers) =>
                prevTeachers.filter((teacher) => teacher.Teacher_Id !== teacherId)
            );
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    // Filtered teachers based on search query
    const filteredTeachers = teachers.filter((teacher) =>
        `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container fluid className="admin-dashboard">
            <h1 className="text-center my-4">{t('Teachers Dashboard')}</h1>

            {/* Search Input */}
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder={t('Search by name...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>

            {/* Teachers List */}
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
                                    <th>{t('Subject')}</th>
                                    <th>{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers.map((teacher, index) => (
                                    <tr key={teacher.Teacher_Id}>
                                        <td>{index + 1}</td>
                                        <td>{teacher.first_name}</td>
                                        <td>{teacher.last_name}</td>
                                        <td>{teacher.phone}</td>
                                        <td>{teacher.userId?.email || 'N/A'}</td>
                                        <td>{teacher.subject}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteTeacher(teacher.Teacher_Id)}
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

            {/* Register or Edit Teacher Form can go here */}
        </Container>
    );
};

export default TeachersDashboard;
