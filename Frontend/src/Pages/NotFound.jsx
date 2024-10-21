import React from "react";
import { Container, Row, Col, Image ,Button} from "react-bootstrap";
import MyNav from '../components/mainComponent/MyNav';
import MyFooter from '../components/mainComponent/MyFooter';
import { useTranslation } from 'react-i18next';
import './NotFound.css';
export default function NotFound() {
    const { t } = useTranslation();
  return (
    <>
    <MyNav/>
  
    <div className="bgg">
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
    <Container className="py-5 ">
      <Row>
        <Col md={{ span: 8, offset: 3 }}>
          <Image 
            src="../images/giphy3.gif" 
            alt="404 Not Found" 
            fluid 
          />
        </Col>
      </Row>
    </Container>
    </div>
    <MyFooter/>
    </>
  );
}
