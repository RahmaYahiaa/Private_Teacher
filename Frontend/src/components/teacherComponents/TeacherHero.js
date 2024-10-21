import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './TeacherHero.css';
import '../mainComponent/MainHero.css';
import { withTranslation } from 'react-i18next'; // Import withTranslation

class TeacherHero extends React.Component {
  render() {
    const { t } = this.props; // Accessing the t function from props

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
            <Button href="/TeacherRegister" className="register-btn">{t('registerTeacher')}</Button>
          </div>
          <img src="./images/heros.png" className="bg" alt={t('Hero Background')} />
        </div>

        <Container fluid className="about-section">
          <h1 className="about-title">{t('Teachers')}</h1>
          <ul className="list-inline ull">
            <li className="lii">
              <a className="aa" href="/">{t('Home')}</a>
            </li>
            <li className="lii">
              <span className="dot"></span>
              <a className="aa">{t('Teachers')}</a>
            </li>
          </ul>
        </Container>
      </section>
    );
  }
}

export default withTranslation()(TeacherHero); // Wrap the component with the withTranslation HOC
