import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './AboutHero.css';
import '../mainComponent/MainHero.css';
import { useTranslation } from 'react-i18next';

const AboutHero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero hh">
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

        <img src="./images/heros.png" className="bg" alt="Hero Background" />
      
      </div>

      <Container fluid className="about-section">
        <h1 className="about-title">{t('About')}</h1>
        <ul className="list-inline ull">
          <li className="lii">
            <a className="aa" href="/">{t('Home')}</a>
          </li>
          <li className="lii">
            <span className="dot"></span>
            <a className="aa">{t('About us')}</a>
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default AboutHero;