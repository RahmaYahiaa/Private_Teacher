import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation(); // Use the translation hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
  };

  // SweetAlert for showing error messages
  const showAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: message,
      customClass: {
              confirmButton: 'custom-confirm',
            },
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      showAlert('Please enter a valid email address');
      valid = false;
    }

    if (password.length < 6) {
      showAlert('Password must be at least 6 characters long');
      valid = false;
    }

    if (valid) {
      try {
        // Call the backend API to check credentials
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, userType }), // Include userType
        });

        const data = await response.json();

        if (data.success) {
         
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: 'Redirecting...',
            customClass: {
              confirmButton: 'custom-confirm',
            },
          }).then(() => {
              // Store the user ID and login status in localStorage
              localStorage.setItem('userId', data._id);  // Assuming the backend returns _id for user ID
              localStorage.setItem('loggedIn', 'true');
              // Redirect to the home or profile page
              navigate('/');
          });
        } else {
          showAlert(data.message); // Show error message from backend
        }
      } catch (err) {
        showAlert('An error occurred. Please try again.');
      }
    }
  };


  return (
    <section className="register">
      <div className="container-fluid">
        <div className="sign_content">
          <div className="logo">
            <a href="/">
              <img src="./images/logo.png" alt="Logo" />
              <div className="logo_title">
                <h1> Private Teacher</h1>
                <h3>{t('Your best choice')}</h3>
              </div>
            </a>
          </div>
          <h4>{t('Login')}</h4>

          <form onSubmit={handleSubmit} method="POST">
            <div className="row text-center">
              <div className="col-lg-12">
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={`btn btn-secondary ${userType === 'student' ? 'active' : ''} student-btn`}>
                <input
                  type="radio"
                  name="type"
                  value="student"
                  autoComplete="off"
                  checked={userType === 'student'}
                  onChange={(e) => setUserType(e.target.value)} // Use onChange instead of onClick
                  className="radio-btn"
                /> {t('Student')}
                 </label>
                 <label className={`btn btn-secondary ${userType === 'teacher' ? 'active' : ''} teacher-btn`}>
                 <input
                   type="radio"
                   name="type"
                   value="teacher"
                   autoComplete="off"
                   checked={userType === 'teacher'}
                   onChange={(e) => setUserType(e.target.value)} // Use onChange instead of onClick
                   className="radio-btn"
                 />{t('Teacher')} 
                  </label>
                </div>
              </div>
            </div>
            <br />

            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('E-mail')}
                required
              />
              <span className="fa fa-envelope"></span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('Password')}
                required
              />
              <span className="fa fa-lock"></span>
            </div>

            <div className="form-group">
              <input type="submit" className="btn" value={t('Login')} />
            </div>
          </form>

          <h6>
          {t('You do not have an account')} |{' '}
            <a href="/StudentRegister">{t('Register as Student')}</a> |{' '}
            <a href="/TeacherRegister">{t('Register as Teacher')}</a>
          </h6>
        </div>
      </div>
    </section>
  );
}