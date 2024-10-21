import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSpecialization } from '../redux/slices/filterSlice';
import axios from 'axios';

function Specializations() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedSpecializationFromHome = useSelector((state) => state.filters.specialization);
    const [selectedSpecializations, setSelectedSpecializations] = useState([selectedSpecializationFromHome]);
    
    const staticSubjects = [
        { subject: 'Arabic', count: 0 },
        { subject: 'Biology', count: 0 },
        { subject: 'Chemistry', count: 0 },
        { subject: 'English', count: 0 },
        { subject: 'French', count: 0 },
        { subject: 'Geography', count: 0 },
        { subject: 'History', count: 0 },
        { subject: 'Math', count: 0 },
        { subject: 'Philosophy', count: 0 },
        { subject: 'Physics', count: 0 },
        { subject: 'Psychology', count: 0 },
        { subject: 'Science', count: 0 }
    ];

    const [specializations, setSpecializationsData] = useState(staticSubjects);

    useEffect(() => {
        const fetchSpecializationCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teachers/subject-counts');
                const backendCounts = response.data.filter(item => item.subject); // Filter out null subjects

                // Merge backend counts with static list
                const mergedSpecializations = staticSubjects.map((subject) => {
                    const foundSubject = backendCounts.find(item => item.subject === subject.subject);
                    return {
                        ...subject,
                        count: foundSubject ? foundSubject.count : 0
                    };
                });

                setSpecializationsData(mergedSpecializations);
            } catch (error) {
                console.error('Error fetching specialization counts:', error);
            }
        };

        fetchSpecializationCounts();
    }, []);

    const handleSpecializationChange = (event, specializationLabel) => {
        const newSelectedSpecializations = event.target.checked
            ? [...selectedSpecializations, specializationLabel]
            : selectedSpecializations.filter(label => label !== specializationLabel);
        setSelectedSpecializations(newSelectedSpecializations);
        dispatch(setSpecialization(newSelectedSpecializations));
    };

    const handleAllSpecializationsChange = (event) => {
        if (event.target.checked) {
            const allSubjects = specializations.map(item => item.subject);
            setSelectedSpecializations(allSubjects);
            dispatch(setSpecialization(allSubjects));
        } else {
            setSelectedSpecializations([]);
            dispatch(setSpecialization([]));
        }
    };

    // Calculate total count of subjects excluding null subjects
    const totalSubjectsCount = specializations.reduce((total, item) => total + (item.count > 0 ? item.count : 0), 0);

    return (
        <Card className="border-1 mb-3 px-3 py-4">
            <Card.Body>
                <h5 className="card-title text-end">{t('Majors')}</h5>
                <div className="underline bg-primary mb-4 ms-auto"></div>
                <ListGroup variant="flush" className="list d-flex flex-row-reverse text-end">
                    <ul className="list-unstyled w-100">
                        {/* "All Subjects" checkbox */}
                        <li className="d-flex justify-content-end mb-2">
                            <span className="text-muted me-auto">({totalSubjectsCount})</span>
                            <Form.Label className="ms-2">{t('All Subjects')}</Form.Label>
                            <Form.Check
                                type="checkbox"
                                className="ms-2"
                                onChange={handleAllSpecializationsChange}
                                checked={selectedSpecializations.length === specializations.length && totalSubjectsCount > 0}
                            />
                        </li>
                        {/* Individual subjects */}
                        {specializations.map((item, index) => (
                            <li key={index} className="d-flex justify-content-end mb-2">
                                <span className="text-muted me-auto">({item.count})</span>
                                <Form.Label className="ms-2">{item.subject}</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    className="ms-2"
                                    onChange={(e) => handleSpecializationChange(e, item.subject)}
                                    checked={selectedSpecializations.includes(item.subject)}
                                />
                            </li>
                        ))}
                    </ul>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Specializations;