import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import './AdminDashboard.css';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setTotalSubjects } from '../teacherComponents/redux/slices/dash-board-slice';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();

  // Load from localStorage or use initial categories if localStorage is empty
  const loadInitialCategories = () => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      return JSON.parse(storedCategories); // Load categories from localStorage
    } else {
      return [
        { name: 'Arabic', imgSrc: './images/عربي.jpeg', delay: '0.15s' },
        { name: 'Biology', imgSrc: './images/احياء.jpeg', delay: '0.35s' },
        { name: 'Chemistry', imgSrc: './images/كيمياء.jpeg', delay: '0.15s' },
        { name: 'English', imgSrc: './images/انجليزي.png', delay: '0.75s' },
        { name: 'French', imgSrc: './images/فرنساوى.jpeg', delay: '0.15s' },
        { name: 'Geography', imgSrc: './images/جغرافيا.jpeg', delay: '0.15s' },
        { name: 'History', imgSrc: './images/تاريخ.jpeg', delay: '0.15s' },
        { name: 'Math', imgSrc: './images/رياضة.jpeg', delay: '0.15s' },
        { name: 'Philosophy', imgSrc: './images/فلسفه.jpeg', delay: '0.15s' },
        { name: 'Physics', imgSrc: './images/فزيا.jpeg', delay: '0.15s' },
        { name: 'Psychology', imgSrc: './images/علم النفس.jpeg', delay: '0.15s' },
        { name: 'Science', imgSrc: './images/علوم.jpeg', delay: '0.15s' },
      ]; // Fallback to initial categories
    }
  };

  const [categories, setCategories] = useState(loadInitialCategories());
  const [newCategory, setNewCategory] = useState({ name: '', imgSrc: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    const fetchTeacherCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers/subject-counts');
        const counts = response.data;

        // Map counts to categories
        const updatedCategories = categories.map((category) => {
          const foundCategory = counts.find((count) => count.subject === category.name);
          return {
            ...category,
            teacherCount: foundCategory ? foundCategory.count : 0, // Add teacherCount dynamically
             };
        });

        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error fetching teacher counts:', error);
      }
    };

    fetchTeacherCounts();
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name && newCategory.imgSrc) {
      setCategories([...categories, { ...newCategory, teacherCount: 0, delay: '0.15s' }]);
      setNewCategory({ name: '', imgSrc: '' });
      setImagePreview(null);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewCategory({ ...newCategory, imgSrc: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(setTotalSubjects(categories.length));
  }, [categories.length, dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="admin-dashboard">
      <h1 className="text-center my-4">{t('Admin Dashboard')}</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder={t('Search by name...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      {/* Subjects List */}
      <Row>
        <Col>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('Subject Name')}</th>
                  <th>{t('Teacher Count')}</th>
                  <th>{t('Image')}</th>
                  <th>{t('Actions')}</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.teacherCount || 0}</td>
                    <td>
                      <img src={category.imgSrc} alt={category.name} style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td>
                      <Button
                        className="button-delete"
                        variant="danger"
                        onClick={() => handleDeleteCategory(index)}
                      >
                        {t('Delete')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} className="offset-md-3">
          <h3>{t('Add New Subject')}</h3>
          <Form onSubmit={handleAddCategory}>
            <Form.Group>
              <Form.Label>{t('Subject Name')}</Form.Label>
              <Form.Control
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder={t('Enter subject name')}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t('Upload Image')}</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} required />
            </Form.Group>

            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />
              </div>
            )}

            <Button type="submit" className="mt-3">
              {t('Add Subject')}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
