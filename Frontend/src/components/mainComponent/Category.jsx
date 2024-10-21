import React , { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Category.css';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setSpecialization } from '../teacherComponents/redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = ({ categories }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [teacherCounts, setTeacherCounts] = useState({});
  // Update: Function now takes a category parameter
  const handelNavigateToTeacherPageToSearchSubject = (category) => {
    navigate('/TeacherApp');
    dispatch(setSpecialization(category.name));  // Use the specific category name
  };

  useEffect(() => {
    // Fetch teacher counts from the backend
    const fetchTeacherCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers/subject-counts');
        const counts = response.data;
        
        // Transform the data into a key-value pair for easier access
        const countsMap = counts.reduce((acc, item) => {
          acc[item.subject] = item.count;
          return acc;
        }, {});
        
        setTeacherCounts(countsMap);
      } catch (error) {
        console.error('Error fetching teacher counts:', error);
      }
    };

    fetchTeacherCounts();
  }, []);
  return (
    <section className="category" id="category">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={10} sm={9} xs={9}>
            <div className="title">
              <span>{t('Categories')}</span>
              <h1>{t('Teachers Majors')}</h1>
              <hr />
            </div>
          </Col>
          <Col md={2} sm={3} xs={3} className="text-end">
            <Button className="more">{t('All Categories')}</Button>
          </Col>
        </Row>

        <Row>
          {categories.map((category, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <div className="block wow fadeIn" style={{ animationDelay: `${category.delay}`, visibility: 'visible', animationName: 'fadeIn' }}>
                <div className="img_container">
                  <img src={category.imgSrc} alt={category.name} />
                  <div className="img_overlay">
                    <div className="text center">
                      <h1>{category.name}</h1>
                      <h3>{t('teachers')} {teacherCounts[category.name] || 0}</h3>
                    </div>
                  </div>
                  <div className="hover">
                  <Button className="center btn" onClick={() => handelNavigateToTeacherPageToSearchSubject(category)}>{t('Search')} </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Col md={12} sm={12} xs={12} className="text-center">
          <Button className="more2">{t('All Categories')}</Button>
        </Col>
      </Container>
    </section>
  );
};

export default Category;
