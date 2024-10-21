import React from 'react';
import './teachers.css';
import MyNave from '../components/mainComponent/MyNav';
import AboutHero from '../components/aboutComponent/AboutHero';
import About from '../components/mainComponent/About';
import Title from '../components/aboutComponent/title';
import VideoSection from '../components/mainComponent/VideoSection';
import MyFooter from '../components/mainComponent/MyFooter';

const AboutApp = () => {
  return (
<>
<MyNave/>
<AboutHero/>
<Title/>
<VideoSection/>
<About/>
<MyFooter/>
</>
  );
};
export default AboutApp;



