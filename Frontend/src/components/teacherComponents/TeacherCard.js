import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaStar, FaRegStar, FaGraduationCap, FaHeart, FaRegHeart, FaFlag, FaHome, FaBriefcase, FaPhoneAlt, FaCamera } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import './component styles/TeacherCard.css';

const countryCodes = {
    Egypt: '+20',
    'Saudi Arabia': '+966',
    UAE: '+971',
    Jordan: '+962',
    Iraq: '+964',
    Lebanon: '+961',
    Tunisia: '+216',
    Algeria: '+213',
    Morocco: '+212',
    Oman: '+968',
    Kuwait: '+965',
    Qatar: '+974',
    Bahrain: '+973',
    Yemen: '+967',
};

const TeacherCard = ({ teacher }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [image, setImage] = useState(teacher.image || 'https://via.placeholder.com/150?text=No+Image');
    const [countryCode, setCountryCode] = useState(countryCodes[teacher.country] || '+20');
    const [phoneNumber, setPhoneNumber] = useState(teacher.phone || '');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorited(savedFavorites.includes(teacher._id));

        const savedImage = localStorage.getItem(`teacherImage_${teacher._id}`);
        if (savedImage) {
            setImage(savedImage);
        }

        const selectedTeacherData = {
            id: teacher._id,
            firstName: teacher.first_name,
            lastName: teacher.last_name,
            subject: teacher.subject,
        };

        const existingSelection = localStorage.getItem('selectedTeacher');
        if (!existingSelection || JSON.parse(existingSelection).id !== selectedTeacherData.id) {
            localStorage.setItem('selectedTeacher', JSON.stringify(selectedTeacherData));
        }
    }, [teacher]);

    const handleFavoriteClick = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = isFavorited
            ? savedFavorites.filter(id => id !== teacher._id)
            : [...savedFavorites, teacher._id];

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorited(!isFavorited);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating) || 0;
        const emptyStars = 5 - fullStars;

        return (
            <>
                {[...Array(fullStars)].map((_, i) => <FaStar key={i} className="text-warning" />)}
                {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} className="text-muted" />)}
            </>
        );
    };

    const handleNavigate = () => {
        navigate(`/teacher/${teacher._id}`);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                localStorage.setItem(`teacherImage_${teacher._id}`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleWhatsApp = (messageContent) => {
        const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s+/g, '')}`;
        const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodeURIComponent(messageContent)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            handleWhatsApp(message);
            setMessage('');
        } else {
            alert('Please enter a message to send.');
        }
    };

    const handleContactWithoutMessage = () => {
        handleWhatsApp('');
    };

    const handleContactClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };



    return (
        <div className="card shadow-sm teacher-card d-flex justify-content-center align-items-center flex-column">
            <button className="position-absolute top-0 end-0 m-2 favorite-button p-2 rounded-circle" onClick={handleFavoriteClick}>
                {isFavorited ? <FaHeart className="heart-icon filled-heart-icon" /> : <FaRegHeart className="heart-icon" />}
            </button>

            <div className="row g-0">
                <div className="col-md-12 d-flex justify-content-center align-items-center teacher-image-container" style={{ cursor: 'pointer' }}>
                    <img
                        src={image}
                        alt={`${teacher.first_name} ${teacher.last_name}`}
                        className="teacher-image"
                        onClick={handleNavigate}
                    />
                    <label className="camera-icon-container">
                        <FaCamera className="camera-icon" />
                        <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
                    </label>
                </div>
            </div>

            <div className="row g-0">
                <div className="col-md-12">
                    <div className="card-body">
                        <h5 className="teacher-title">
                            {`${teacher.teacher_desc.substring(0, 10)}`} {/* Short description */}
                            <span className='text-muted'>...</span>
                            <Link
                                to={`/teacher/${teacher._id}`}
                                onClick={handleNavigate}
                                className="read-more-link text-muted ms-2 fw-4 fs-6"
                            >
                                Read More
                            </Link>
                        </h5>
                        <Link
                            to={`/teacher/${teacher._id}`}
                            onClick={handleNavigate}
                            className="teacher-account-link text-decoration-none"
                        >
                            <h6 className="text-muted teacher-account">
                                <FaUserAlt className="me-2 teacher-account" /> {`${teacher.first_name} ${teacher.last_name}`}
                            </h6>
                        </Link>

                        <div className="teacher-rating mb-3">
                            {renderStars(teacher.rating || 0)}
                            <span className="rating-number">({teacher.rating || 0})</span>
                        </div>

                        <div className="teacher-meta mb-3">
                            <p className="mb-1"><FaGraduationCap className="me-2" /> Subject: {teacher.subject}</p>
                            <p className="mb-1"><FaPhoneAlt className="me-2" /> Phone: {teacher.phone}</p>
                            <p className="mb-1"><FaFlag className="me-2" /> Country: {teacher.country || 'Egypt'}</p>
                            <p className="mb-1"><FaUserAlt className="me-2" /> Gender: {teacher.gender}</p>
                            <p className="mb-1"><FaBriefcase className="me-2" /> Experience: {teacher.years_of_experience} years</p>
                            <p className="mb-1"><FaHome className="me-2" /> Status: {teacher.onlineStatus}</p>
                        </div>

                        

                        <div className="mb-3">
                            <button className="contact-button" onClick={handleContactClick} style={{ cursor: 'pointer' }}>Contact</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for sending messages */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        placeholder="Write a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleSendMessage}>
                        Send Message
                    </Button>
                    <Button variant="outline-primary" onClick={handleContactWithoutMessage}>
                        Contact Without Message
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TeacherCard;
