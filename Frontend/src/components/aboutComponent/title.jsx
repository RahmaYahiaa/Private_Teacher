import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './title.css';
import { withTranslation } from 'react-i18next';

class Title extends Component {
  render() {
    const { t } = this.props; // Accessing the t function from props
    return (
      <section className="about_us">
        <Container fluid>
          <div className="title">
            <span>{t('Start with sefihat')}</span>
            <h1>{t('About us')}</h1>
            <hr />
          </div>
          <Row>
            <Col md={5} sm={6} xs={12} className="pb-5">
              <img
                src="https://private-teacher.org/storage/app/public/about/bnpFskCR1dRJPKA09WkK1vvMuLI5jnjiJhFXDvkt.png"
                alt={t('aboutUsImageAlt')} // Add translation key for alt text
                className="img-fluid"
              />
            </Col>
            <Col md={7} sm={6} xs={12}>
              <h2>{t('Teachers site is your ideal guide for choosing the best teachers')}</h2>
              <p>{t('about-hero-title')}</p> {/* Ensure this key is defined in your i18n config */}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default withTranslation()(Title); // Wrap the component with the withTranslation HOC
