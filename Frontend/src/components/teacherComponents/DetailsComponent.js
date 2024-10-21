import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserAlt, FaPhoneAlt, FaEye, FaFlag, FaGenderless, FaCalendarAlt, FaBriefcase, FaStar } from 'react-icons/fa';
import './component styles/TeacherDetails.css';
// import axios from 'axios';
import Swal from 'sweetalert2';

const TeacherDetails = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info'); // To control tab switching
    const [views, setViews] = useState(0); // State for storing views
    const [activeProfileTab, setActiveProfileTab] = useState('about'); // New tab control
    const [rating, setRating] = useState(0); 

    // Fetch teacher details
    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/teachers/list/${id}`);
                const data = await response.json();
                setTeacher(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teacher details:', error);
                setLoading(false);
            }
        };
        fetchTeacherDetails();
    }, [id]);
// Load stored rating from localStorage
useEffect(() => {
    const storedRating = localStorage.getItem(`teacherRating_${id}`);
    if (storedRating) {
        setRating(Number(storedRating)); // Set the stored rating in state
    }
}, [id]);
    // Handle views
    useEffect(() => {
        const viewsKey = `teacher_${id}_views`;
        let storedViews = localStorage.getItem(viewsKey);
        storedViews = storedViews ? parseInt(storedViews) : 0;

        // Use a slight delay to ensure the effect runs only once
        setTimeout(() => {
            const newViews = storedViews + 1;
            setViews(newViews);
            localStorage.setItem(viewsKey, newViews);
        }, 0);
    }, [id]);

    if (loading) {
        return <p>Loading teacher details...</p>;
    }

    if (!teacher) {
        return <p>No teacher details found</p>;
    }



    const handleRatingClick = async (value) => {
        setRating(value);
        localStorage.setItem(`teacherRating_${id}`, value);
    
        // try {
            // const response = await axios.put(`http://localhost:5000/api/teachers/rate/${id}`, { rating: value });
    
            // Use SweetAlert for success notification
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text:  'Rating submitted successfully!',
                customClass: {
                confirmButton: 'custom-confirm', // Apply custom class to confirm button
              },

            });
    
            // Update teacher details in the UI if rating is updated
            // setTeacher((prevTeacher) => ({
            //     ...prevTeacher,
            //     rating: response.data.data.rating, // Update the rating in the UI
            // }));
        // } catch (error) {
        //     console.error('Error submitting rating:', error);
        //     if (error.response) {
        //         // Use SweetAlert for error notification
        //         await Swal.fire({
        //             icon: 'error',
        //             title: 'Error',
        //             text: error.response.data.message || 'Error submitting rating. Please try again later.',
        //         });
        //     } else {
        //         await Swal.fire({
        //             icon: 'error',
        //             title: 'Error',
        //             text: 'Error submitting rating. Please try again later.',
        //         });
        //     }
        // }
    };
    
    

    return (
        <>
            <div className="big">
                <div className="myTeacherHeader">
                    <div className="teacher-details-container">
                        {/* Tabs for Teacher Info */}
                        <div className="teacher-info">
                            <div className="tabs-container">
                                <span className={`tab-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                                    المعلومات
                                </span>
                                <span className={`tab-item ${activeTab === 'country' ? 'active' : ''}`} onClick={() => setActiveTab('country')}>
                                    الدولة والمدينه
                                </span>
                                {/* <span className={`tab-item ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
                                    مجالات الخبره
                                </span>
                                <span className={`tab-item ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
                                    الشهادات
                                </span> */}
                                <span className={`tab-item ${activeTab === 'sub' ? 'active' : ''}`} onClick={() => setActiveTab('sub')}>
                                    التخصص
                                </span>
                                <span className={`tab-item ${activeTab === 'links' ? 'active' : ''}`} onClick={() => setActiveTab('links')}>
                                    الروابط
                                </span>
                            </div>

                            {/* Information Tab */}
                            {activeTab === 'info' && (
                                <div className="teacher-metaa two-columns">
                                    <div className="teacher-meta-item">
                                        <FaUserAlt className="icon" /> الاسم: {`${teacher.first_name} ${teacher.last_name}`}
                                    </div>
                                    <div className="teacher-meta-item">
                                        <FaPhoneAlt className="icon" /> {teacher.phone} :الهاتف
                                    </div>
                                    <div className="teacher-meta-item">
                                        <FaFlag className="icon" /> بلد الإقامة: {teacher.country || 'Egypt'}
                                    </div>
                                    <div className="teacher-meta-item">
                                        <FaCalendarAlt className="icon" />تاريخ الميلاد :  {teacher.date_of_birth || 'N/A'}
                                    </div>
                                    <div className="teacher-meta-item">
                                        <FaBriefcase className="icon" /> سنوات الخبرة: {teacher.years_of_experience || 'N/A'}
                                    </div>
                                    <div className="teacher-meta-item">
                                        <FaGenderless className="icon" /> النوع : {teacher.gender || 'N/A'}
                                    </div>
                                </div>
                            )}

                            {/* Other Tabs */}
                            {activeTab === 'country' && (
                                <div className="teacher-meta">
                                    <h2>الدولة والمدينه</h2>
                                    <p>{teacher.country || 'No details available'}</p>
                                </div>
                            )}
                            {activeTab === 'sub' && (
                                <div className="teacher-meta">
                                    <h3>التخصص</h3>
                                    <p>{teacher.subject || 'No details available'}</p>
                                </div>
                            )}
                            {/* {activeTab === 'experience' && (
                                <div className="teacher-meta">
                                    <h3> مجالات الخبرة</h3>
                                    <p>{teacher.experience || 'No details available'}</p>
                                </div>
                            )}
                            {activeTab === 'certifications' && (
                                <div className="teacher-meta">
                                    <h3>الشهادات</h3>
                                    <p>{teacher.certifications || 'No details available'}</p>
                                </div>
                            )} */}
                            {activeTab === 'links' && (
                                <div className="teacher-meta">
                                    <h3>الروابط</h3>
                                    <div className="teacher-meta-item">
                                        <FaPhoneAlt className="icon" /> الهاتف: {teacher.phone}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="teacher-image-container">
                            <img
                                src={teacher.image || 'https://via.placeholder.com/250?text=No+Image'}
                                alt={`${teacher.first_name} ${teacher.last_name}`}
                                className="teacher-imagee"
                            />
                        </div>
                    </div>{/* Stats Section */}
                    <div className="teacher-stats">
                        <div className="stat-item">
                            <FaUserAlt className="icon" />
                            <span>التقييم</span>
                            <span className="stat-value">{rating || 'N/A'}</span>
                        </div>
                            <div className="stat-item">
                            <FaUserAlt className="icon" />
                                <span>قيم هذا المُعلم </span>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <FaStar
                                        key={value}
                                        className={`star-icon ${rating >= value ? 'text-warning' : 'text-muted'}`}
                                        onClick={() => handleRatingClick(value)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                    
                        <div className="stat-item">
                            <FaBriefcase className="icon" />
                            <span>سنوات الخبرة</span>
                            <span className="stat-value">{teacher.years_of_experience || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <FaEye className="icon" />
                            <span>المشاهدات</span>
                            <span className="stat-value">{views}</span> {/* Display dynamic views */}
                        </div>
                    </div>

                    {/* New Profile Tab Section */}
                    <div className="profile-tab-container ">
                        <span className={`profile-tab-item ${activeProfileTab === 'about' ? 'active' : ''}`} onClick={() => setActiveProfileTab('about')}>
                            نبذة عني
                        </span>
                        <span className={`profile-tab-item ${activeProfileTab === 'options' ? 'active' : ''}`} onClick={() => setActiveProfileTab('options')}>
                            الحالة
                        </span>
                    </div>

                    {/* Profile Content */}
                    {activeProfileTab === 'about' && (
                        <div className="profile-about-content">
                            <p>{teacher.teacher_desc || 'No description available'}</p>
                        </div>
                    )}
                    {activeProfileTab === 'options' && (
                        <div className="profile-options-content">
                            <p>{teacher.onlineStatus ? 'Online' : 'Offline'}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TeacherDetails;
