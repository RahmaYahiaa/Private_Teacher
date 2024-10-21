import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(); // Access translation function

  return (
    <section className="about">
      <Container fluid>
        <Row>
          <Col md={7} sm={12}>
            <div className="title">
              <span>{t('about.title')}</span> {/* Translated title */}
              <h1 style={{ fontFamily: 'system-ui' }}>
                {t('about.heading')} {/* Translated heading */}
              </h1>
              <hr />
            </div>
            <p>
              {t('about.description')} {/* Translated description */}
            </p>

            <div
              className="about_block wow fadeIn"
              data-wow-duration=".5s"
              data-wow-delay="0.15s"
              style={{ animationDuration: '0.5s', animationDelay: '0.15s', animationName: 'fadeIn' }}
            >
              <img src="./images/about-icon.png" alt="about-icon" />
              <div className="about_text">
                <h1>{t('about.easy_tutor')}</h1> {/* Translated easy tutor text */}
                <p>{t('about.easy_tutor_desc')}</p> {/* Translated easy tutor description */}
              </div>
            </div>
          </Col>

          <Col md={5} sm={12}>
            <img src="./images/about_img.png" className="about_img" alt="about" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
