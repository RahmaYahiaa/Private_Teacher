import React from 'react';

import ContactHero from '../components/contactComponent/ContactHero';
import './teachers.css';
import MyNave from '../components/mainComponent/MyNav';
import MyFooter from '../components/mainComponent/MyFooter';
import ContactUs from '../components/contactComponent/ContactUs';


const ContactApp = () => {
  return (
<>
<MyNave/>
<ContactHero/>
<ContactUs/>
<MyFooter/>

</>
  );
};
export default ContactApp;



