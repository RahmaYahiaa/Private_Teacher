import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.js';
import TeacherApp from './Pages/TeacherApp.js';
import AboutApp from './Pages/AboutApp.js';
import Login from './components/registerationComponent/Login';
import TeacherDetails from './Pages/TeacherDetails.js';
import Profile from './Pages/Profile.js';
import StudentRegister from './components/registerationComponent/studentRegister';
import TeacherRegister from './components/registerationComponent/teacherRegister';
import ContactApp from './Pages/ContactApp.js';
import AdminDashboard from './Pages/AdminDashBoard.js';
import Subjects from './components/admindashComponent/subjects.jsx';
import Teachers from './components/admindashComponent/Teachers.js';
import Students from './components/admindashComponent/Students.js';
import Contact from './components/admindashComponent/Contacts.js';
import TotalDashboard from './components/admindashComponent/TotalDashboard.js';
import ProtectedRoute from './Pages/protectedRoute.js'; 
import FavoritesPage from './components/teacherComponents/FavoritesPage.jsx';
import NotFound from './Pages/NotFound.jsx';

import 'leaflet/dist/leaflet.css';
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TeacherApp" element={<TeacherApp />} />
        <Route path="/AboutApp" element={<AboutApp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/TeacherRegister" element={<TeacherRegister />} />
        <Route path="/ContactApp" element={<ContactApp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/teacher/:id" element={<TeacherDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />}>
          <Route index element={<TotalDashboard />} /> 
          <Route path="subjects" element={<Subjects />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="students" element={<Students />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
