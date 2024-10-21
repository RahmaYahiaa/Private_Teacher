import React, { useEffect ,useState} from "react";
import L from "leaflet";
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import Swal from 'sweetalert2';
import "./contactUs.css";
import "./contactUs.scss";
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation();
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!validateEmail(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'OK',
        customClass: {
        confirmButton: 'custom-confirm', // Apply custom class to confirm button
      },
      });
      return; // Prevent form submission if email is invalid
    }

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/api/contact/submit', formData);

      // If submission is successful, show a success alert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your message has been sent successfully, we will contact you soon.',
        confirmButtonText: 'OK',
        customClass: {
        confirmButton: 'custom-confirm', // Apply custom class to confirm button
      },
      });

      // Clear form data after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });

    } catch (error) {
      // Handle errors and show an error alert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was a problem submitting your message.',
        confirmButtonText: 'Try Again',
        customClass: {
        confirmButton: 'custom-confirm', // Apply custom class to confirm button
      },
      });
    }
  };
  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map").setView([30.0444, 31.2357], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([30.0444, 31.2357])
      .addTo(map)
      .bindTooltip(
        "<strong>Welcome to Cairo</strong><br/>مرحبا بك في القاهرة",
        {
          permanent: true,
          direction: "top",
        }
      )
      .openTooltip();
  }, []);

  return (
    <section className="contact">
      <div className="info container-fluid">
        <div className="row gx-6 mx-5">
          <div className="info_block col-lg-4 col-md-6 col-xs-12">
            <span className="fa fa-envelope"></span>
            <div className="text">
              <h2>{t('contactUs.emailTitle')}</h2>
              <h3>{t('contactUs.email1')}</h3>
              <h3>{t('contactUs.email2')}</h3>
            </div>
          </div>

          <div className="info_block col-lg-4 col-md-6 col-xs-12">
            <span className="fa fa-phone"></span>
            <div className="text">
              <h2>{t('contactUs.phoneTitle')}</h2>
              <h3>{t('contactUs.privateTeacherSiteArabic')}</h3>
              <h3>{t('contactUs.privateTeacherSiteEnglish')}</h3>
            </div>
          </div>

          <div className="info_block col-lg-4 col-md-6 col-xs-12">
            <span className="fa fa-map-marker-alt"></span>
            <div className="text">
              <h2>{t('contactUs.locationTitle')}</h2>
              <h3>{t('contactUs.locationDescription')}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid contact_form mt-5">
        <div className="container-fluid">
          <div className="title">
            <h1>{t('contactUs.stayInTouch')}</h1>
            <h3>{t('contactUs.writeMessage')}</h3>
            <hr />
          </div>

          <div className="container-fluid row mt-5 justify-content-between">
            <div className="col-md-6 col-xs-12 col-sm-12">
            <form className="row gy-2 mb-5" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                id="message"
                rows="2"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
            </div>

            <div className="col-md-12 col-xs-12 col-sm-12">
              <div id="map" style={{ height: "400px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}