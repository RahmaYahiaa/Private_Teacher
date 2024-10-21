
import '../App.css';
import React, { useState} from 'react';
import About from '../components/mainComponent/About';
import Category from '../components/mainComponent/Category';
import VideoSection from '../components/mainComponent/VideoSection';
import MainHero from '../components/mainComponent/MainHero';
import ClientSection from '../components/mainComponent/ClientSection';
import PartnerSection from '../components/mainComponent/PartnerSection';
import MyNav from '../components/mainComponent/MyNav';
import MyFooter from '../components/mainComponent/MyFooter';

function Home() {
  
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

  const [categories] = useState(() => {  
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });
  return (
    <>
    <MyNav/>
    <MainHero/>
    <Category categories={categories} />
    <About/>
    <VideoSection/>
    <ClientSection/>
    <PartnerSection/>
    <MyFooter/>
    </>
  );
}

export default Home;
