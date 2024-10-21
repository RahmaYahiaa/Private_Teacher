import React, { useState, useEffect } from 'react';
import './component styles/card-list.css';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import {
    FaStar,
    FaRegStar,
    FaGraduationCap,
    FaUserAlt,
    FaHome,
    FaHeart,
    FaRegHeart,
    FaFlag,
    FaBriefcase,
    FaPhoneAlt
} from 'react-icons/fa';
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

const TeacherListCard = ({ teacher }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const charLimit = 20;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [countryCode, setCountryCode] = useState(countryCodes[teacher.country] || '+20');
    const [phoneNumber, setPhoneNumber] = useState(teacher.phone || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorited(savedFavorites.includes(teacher._id));
    }, [teacher._id]);

    const handleFavoriteClick = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorited) {
            const updatedFavorites = savedFavorites.filter(id => id !== teacher._id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            savedFavorites.push(teacher._id);
            localStorage.setItem('favorites', JSON.stringify(savedFavorites));
        }
        setIsFavorited(!isFavorited);
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

    // Function to handle the modal open
    const handleContactClick = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };


    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <>
                {[...Array(fullStars)].map((_, i) => <FaStar key={i} className="star-icon filled" />)}
                {halfStar ? <FaStar key="half" className="star-icon half" /> : null}
                {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} className="star-icon empty" />)}
            </>
        );
    };

    const handleNavigate = () => {
        navigate(`/teacher/${teacher._id}`);
    };



    return (
        <div className="teacher-card">
            <button className="position-absolute top-0 end-0 m-2 favorite-button p-2 rounded-circle" onClick={handleFavoriteClick}>
                {isFavorited ? <FaHeart className="heart-icon filled-heart-icon" /> : <FaRegHeart className="heart-icon" />}
            </button>

            <div className="teacher-image-container" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                <img
                    src={teacher.image || 'https://via.placeholder.com/150?text=No+Image'}
                    alt={`${teacher.first_name} ${teacher.last_name}`}
                    className="teacher-image"
                />
            </div>

            <div className="card-body">
                <h5 className="teacher-title">
                    <h5>{`${teacher.teacher_desc.substring(0, charLimit)}`}
                        {teacher.teacher_desc.length > charLimit && <span className='text-muted'>...</span>}
                        {teacher.teacher_desc.length > charLimit && (
                            <Link
                                to={`/teacher/${teacher._id}`}
                                onClick={handleNavigate}
                                style={{ cursor: 'pointer' }}
                                className="read-more-link text-muted ms-2 fw-4 fs-6"
                            >
                                Read More
                            </Link>
                        )}
                    </h5>
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

                <div className="teacher-rating">
                    {renderStars(teacher.rating || 0)}
                    <span className="rating-number">({teacher.rating || 0})</span>
                </div>

                <div className="teacher-meta">
                    <p className="mb-1"><FaGraduationCap className="me-2" /> Subject: {teacher.subject}</p>
                    <p className='pipe'>|</p>
                    <p className="mb-1"><FaUserAlt className="me-2" /> Gender: {teacher.gender}</p>
                    <p className='pipe'>|</p>
                    <p className="mb-1"><FaPhoneAlt className="me-2" /> Phone: {teacher.phone}</p>
                    <p className='pipe'>|</p>
                    <p className="mb-1"><FaFlag className="me-2" /> Country: {teacher.country || 'Egypt'}</p>
                    <p className='pipe'>|</p>
                    <p className="mb-1"><FaBriefcase className="me-2" /> Experience: {teacher.years_of_experience} years</p>
                    <p className='pipe'>|</p>
                    <p className="mb-1"><FaHome className="me-2" />Status: {teacher.onlineStatus}</p>
                </div>

                <div className='contact-button-container'>
                    <button className="contact-button" onClick={handleContactClick}>
                        Contact
                    </button>
                </div>
            </div>
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
                        className="form-control mb-2"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSendMessage}>
                        Send Message
                    </Button>
                    <Button variant="primary" onClick={handleContactWithoutMessage}>
                        Just Contact
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TeacherListCard;
