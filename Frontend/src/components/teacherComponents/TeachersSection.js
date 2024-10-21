import React, { useState, useEffect } from 'react';
import './component styles/TeachersSection.css';
import TeacherCard from './TeacherCard';
import { useSelector } from 'react-redux';
import TeacherListCard from './Teacher-list-card';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const TeachersSection = ({ currentPage, itemsPerPage }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const viewType = useSelector(state => state.layout.viewType);
    const searchTerm = useSelector((state) => state.filters.search);


    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const selectedSubject = queryParams.get('subject');

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teachers/list');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setTeachers(data);
                } else if (data.teachers && Array.isArray(data.teachers)) {
                    setTeachers(data.teachers);
                } else {
                    console.error("Unexpected response format:", data);
                    setError('Unexpected response format');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch teacher data');
                setLoading(false);
            }
        };

        fetchTeachers();
    }, [currentPage, itemsPerPage]);
    const { level = [], rating, specialization = [], language } = useSelector((state) => state.filters);
    const filteredTeachers = teachers.filter((teacher) => {
        return (
           ( selectedSubject ? teacher.subject.toLowerCase() === selectedSubject.toLowerCase() : true) && 
            (level.length === 0 || level.includes(teacher.level)) &&
            (rating ? teacher.rating >= rating : true) &&
            (specialization.length > 0 ? specialization.includes(teacher.subject) : true) &&
            (language ? teacher.language.includes(language) : true) &&
            (searchTerm ?
                teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) :
                true
            )
        );
    });

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
                <h2 className="mb-4">Please wait, content is loading...</h2>
                <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    const indexOfLastTeacher = currentPage * itemsPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;

    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
    return (
        <div className="teachers-section container">
            <div className="row">
                <div className={viewType === 'grid' ? 'grid-layout' : 'list-layout'}>
                    {currentTeachers.map((teacher) => (
                        <div key={teacher._id}>
                            {viewType === 'grid' ? (
                                <TeacherCard teacher={teacher} />
                            ) : (
                                <TeacherListCard teacher={teacher} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeachersSection;
