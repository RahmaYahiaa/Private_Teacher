import React, { useEffect } from 'react'
import { Container, Grid, Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TotalDashboard() {
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalContacts, setTotalContacts] = useState(0);

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
        fetchContacts();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/teachers/list');
            setTotalTeachers(response.data.length);



        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students/list');
            setTotalStudents(response.data.length);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    const initialCategories = [
        { name: 'Arabic', teacherCount: 66, imgSrc: './images/عربي.jpeg', delay: '0.15s' },
        { name: 'Biology', teacherCount: 90, imgSrc: './images/احياء.jpeg', delay: '0.35s' },
        { name: 'Chemistry', teacherCount: 70, imgSrc: './images/كيمياء.jpeg', delay: '0.15s' },
        { name: 'English', teacherCount: 80, imgSrc: './images/انجليزي.png', delay: '0.75s' },
        { name: 'French', teacherCount: 50, imgSrc: './images/فرنساوى.jpeg', delay: '0.15s' },
        { name: 'Geography', teacherCount: 55, imgSrc: './images/جغرافيا.jpeg', delay: '0.15s' },
        { name: 'History', teacherCount: 40, imgSrc: './images/تاريخ.jpeg', delay: '0.15s' },
        { name: 'Math', teacherCount: 70, imgSrc: './images/رياضة.jpeg', delay: '0.15s' },
        { name: 'Philosophy', teacherCount: 60, imgSrc: './images/فلسفه.jpeg', delay: '0.15s' },
        { name: 'Physics', teacherCount: 90, imgSrc: './images/فزيا.jpeg', delay: '0.15s' },
        { name: 'Psychology', teacherCount: 15, imgSrc: './images/علم النفس.jpeg', delay: '0.15s' },
        { name: 'Science', teacherCount: 50, imgSrc: './images/علوم.jpeg', delay: '0.15s' },
    ];

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contact/list');
            setTotalContacts(response.data.length);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    const totalSubjects = initialCategories.length;




    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Total Subjects Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ p: 2, color: 'orange' }}>
                            <MenuBookIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary">
                                Total Subjects
                            </Typography>
                            <Typography variant="h4">{totalSubjects}</Typography>
                            <CardActions>
                                <Typography color="primary" variant="body2">
                                    See all subjects
                                </Typography>
                                <Link to="/admin/subjects">
                                    <IconButton color="primary">
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Students Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ p: 2, color: 'green' }}>
                            <SchoolIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary">
                                Total Students
                            </Typography>
                            <Typography variant="h4">{totalStudents}</Typography>
                            <CardActions>
                                <Typography color="primary" variant="body2">
                                    See all students
                                </Typography>
                                <Link to="/admin/students">
                                    <IconButton color="primary">
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Teachers Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ p: 2, color: 'blue' }}>
                            <PeopleIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary">
                                Total Teachers
                            </Typography>
                            <Typography variant="h4">{totalTeachers}</Typography>
                            <CardActions>
                                <Typography color="primary" variant="body2">
                                    See all teachers
                                </Typography>
                                <Link to="/admin/teachers">
                                    <IconButton color="primary">
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Contacts Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ p: 2, color: 'purple' }}>
                            <ContactMailIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary">
                                Total Contacts
                            </Typography>
                            <Typography variant="h4">{totalContacts}</Typography>
                            <CardActions>
                                <Typography color="primary" variant="body2">
                                    See all contacts
                                </Typography>
                                <Link to="/admin/contact">
                                    <IconButton color="primary">
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
