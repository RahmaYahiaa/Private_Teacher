import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

export default function StudentRegister() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use the translation hook
  // State to store form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: ''
    
  });

  // Update state as user inputs data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        confirmButton: 'custom-confirm', // Apply custom class to confirm button
      },
    });
  };

  // Form submission handler with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, country, password, confirmPassword } = formData;

    if (!firstName.trim()) {
      showAlert('First Name is required');
      return;
    }

    if (!lastName.trim()) {
      showAlert('Last Name is required');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Please enter a valid email address');
      return;
    }

    if (!country) {
      showAlert('Please select a country');
      return;
    }

    if (password.length < 6) {
      showAlert('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/students/register', formData);
      if (response.data.success) {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          text: 'Redirecting...',
          customClass: {
            confirmButton: 'custom-confirm', // Apply custom class to confirm button
          },
     
        });
        navigate('/Login');
      }
    } catch (error) {
      showAlert('Registration failed. Please try again.');
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
                <h1>Private Teacher</h1>
                <h3>{t('Your best choice')}</h3>
              </div>
            </a>
          </div>
          <h4>{t('Register as Student')}</h4>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder={t('First Name')}
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <span className="fa fa-user"></span>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder={t('Last Name')}
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <span className="fa fa-user"></span>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder={t('E-mail')}
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className="fa fa-envelope"></span>
            </div>

            <div className="form-group">
              <select
                name="country"
                required
                className="form-control"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="21">Bahrain</option>
                <option value="30">Egypt</option>
                <option value="19">Oman</option>
                <option value="14">Saudi Arabia</option>
              </select>
              <span className="fa fa-flag"></span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder={t('Password')}
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="fa fa-lock"></span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder={t('Confirm Password')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span className="fa fa-lock"></span>
            </div>
{/* <div className="form-group">
              <label>
                <input type="checkbox" name="remember" className="form-control" />
                Remember me
              </label>
            </div>*/}
            

            <div className="form-group">
              <div className="g-recaptcha" data-sitekey="your-site-key"></div>
              <small className="text-danger"></small>
            </div>

            <div className="form-group">
              <input type="submit" className="btn" value="Register" />
            </div>
          </form>

          <h6>
          {t('You do not have an account')} <a href="/">{t('Login')}</a>
          </h6>
        </div>
      </div>
    </section>
  );
}
