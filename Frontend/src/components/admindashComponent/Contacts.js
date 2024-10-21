import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setTotalContacts } from '../teacherComponents/redux/slices/dash-board-slice';
import axios from 'axios';

const ContactsDashboard = () => {
    const { t } = useTranslation();
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/contact/list');
            setContacts(response.data);
            dispatch(setTotalContacts(response.data.length));
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        if (newContact.name && newContact.email && newContact.message) {
            try {
                const response = await axios.post('http://localhost:5000/api/contact/add', newContact);
                setContacts([...contacts, response.data]);
                setNewContact({ name: '', email: '', message: '' });
            } catch (error) {
                console.error('Error adding contact:', error);
            }
        }
    };

    const handleDeleteContact = async (contactId) => {
        try {
            await axios.delete(`http://localhost:5000/api/contact/delete/${contactId}`);
            setContacts(contacts.filter((contact) => contact._id !== contactId));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <Container fluid className="contacts-dashboard">
            <h1 className="text-center my-4">{t('Contacts Dashboard')}</h1>

            {/* Contacts List */}
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('Name')}</th>
                                <th>{t('Email')}</th>
                                <th>{t('Message')}</th>
                                <th>{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center">{t('Loading...')}</td>
                                </tr>
                            ) : (
                                contacts.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <td>{index + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.message}</td>
                                        <td>
                                            <Button
                                                className="button-delete"
                                                variant="danger"
                                                onClick={() => handleDeleteContact(contact._id)}
                                            >
                                                {t('Delete')}
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>


        </Container>
    );
};

export default ContactsDashboard;
