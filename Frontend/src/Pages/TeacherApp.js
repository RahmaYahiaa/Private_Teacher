import React from 'react';
import HeadBar from '../components/teacherComponents/Head-bar';
import MainContainer from '../components/teacherComponents/Main-container';
import TeacherHero from '../components/teacherComponents/TeacherHero';
import './teachers.css';
import MyNave from '../components/mainComponent/MyNav';
import MyFooter from '../components/mainComponent/MyFooter';


const TeacherApp = () => {
  return (
<>
<MyNave/>
<TeacherHero/>
<HeadBar />
<MainContainer />
<MyFooter/>

</>
  );
};
export default TeacherApp;



