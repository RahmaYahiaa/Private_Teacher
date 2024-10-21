import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Left from './Left';
import PaginationContainer from './PaginationContainer';
// import "./teachers.css";


function MainContainer() {
    return (
        <Container className="container my-5 ">
            <div className="row  d-flex justify-content-center">
                <Left />
                <PaginationContainer />


            </div>
        </Container >



    );
}
export default MainContainer;