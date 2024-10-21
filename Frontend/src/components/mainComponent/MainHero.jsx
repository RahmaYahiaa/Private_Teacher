import React, {useState} from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import './MainHero.css'; // Import your custom styles
import './MyNav.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearch } from '../teacherComponents/redux/slices/filterSlice';

const MainHero = () => {
  const { t } = useTranslation(); // Use the translation hook
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [selectedSubject, setSelectedSubject] = useState(''); // State to store selected subject
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to teacher page with the selected subject as a query parameter
    if (selectedSubject) {
      navigate(`/TeacherApp?subject=${selectedSubject}&search=${searchTerm}`);
    }
  };


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearch(value)); // Dispatch the search term to Redux
  };

  return (
    <>
      <section className="hero">
        <div className="bg_container">
          <div className="subnav">
            <ul className="subnav-list">
              <li className="subnav-item">
                <a href="/">{t('Home')} +</a>
              </li>
              <li className="subnav-item">
                <a href="/AboutApp">{t('About')} +</a>
              </li>
              <li className="subnav-item">
                <a href="/TeacherApp">{t('Teacher')} +</a>
              </li>
              <li className="subnav-item">
                <a href="/ContactApp">{t('Contact')} +</a>
              </li>
            </ul>
            <Button href="/TeacherRegister" className="register-btn">
            {t('registerTeacher')}
            </Button>
          </div>

          <img src="./images/hero.png" className="bg" alt="Hero Background" />
          <img src="./images/hero_shape.png" className="hero_shape" alt="Hero Shape" />

          <div className="mouse">
            <a href="#category" className="scroll">
              <img src="./images/mouse.png" alt="Scroll Icon" />
            </a>
          </div>
        </div>

        <Container fluid className="wow fadeIn">
          <div className="text-center">
            <h1 className='mb-3'>{t('looking_for_teacher')}</h1>
            <h3>{t('welcome_message')}</h3>
          </div>

          <Form className="row mx-auto" onSubmit={handleSubmit}>
            {/* Input for search */}
            <Col md={6} className="form-group position-relative">
              <Form.Control
                type="text"
                name="keywords"
                placeholder={t('search_placeholder')}
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange} 
              />
              <img src="./images/search.png" className="form-icon" alt="Search Icon" />
            </Col>

            {/* City Selection Dropdown */}
            <Col md={6} className="form-group position-relative ">
              <Form.Select name="city_id" className="no-border" required>
                <option value="35">{t('City')}</option>
                <option value="35">{t('Aswan')}</option>
                <option value="30">{t('Asyut')}</option>
                <option value="29">{t('Alexandria')}</option>
                <option value="36">{t('Luxor')}</option>
                <option value="28">{t('Giza')}</option>
                <option value="40">{t('Zagazig')}</option>
                <option value="41">{t('Suez')}</option>
                <option value="42">{t('Fayoum')}</option>
                <option value="27">{t('Cairo')}</option>
                <option value="47">{t('Qalyubia')}</option>
                <option value="32">{t('Mansoura')}</option>
                <option value="46">{t('Menofia')}</option>
              </Form.Select>
              <img src="./images/location.png" className="form-icon" alt="Location Icon" />
            </Col>

            {/* Subject Selection */}
            <div className="form-group d-flex align-items-center position-relative">
              <Form.Select name="subjects[]" className="no-border" required   onChange={(e) => setSelectedSubject(e.target.value)} // Set the selected subject
          >
                 <option value="">{t('Category')}</option>
              <option value="Biology">{t('Biology')}</option>
              <option value="History">{t('History')}</option>
              <option value="Geography">{t('Geography')}</option>
              <option value="Math">{t('Math')}</option>
              <option value="Science">{t('Science')}</option>
              <option value="Philosophy">{t('Philosophy')}</option>
              <option value="Physics">{t('Physics')}</option>
              <option value="Chemistry">{t('Chemistry')}</option>
              <option value="English">{t('English')}</option>
              <option value="French">{t('French')}</option>
              <option value="Arabic">{t('Arabic')}</option>
              <option value="Psychology">{t('Psychology')}</option>
              </Form.Select>
              <img src="./images/teacher_1.png" className="form-icon" alt="Subject Icon" />
            </div>

            {/* Submit Button */}
            <Col xs={12} className="form-group">
              <Button type="submit" className="btn btn-primary w-100">
                {t('Search')}
              </Button>
            </Col>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default MainHero;