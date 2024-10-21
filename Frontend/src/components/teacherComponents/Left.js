import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './left-side-compo/search';
import Specializations from './left-side-compo/Specializations';
import Level from './left-side-compo/Level';
import TeacherLanguageFilter from './left-side-compo/Teacher-Language-Filter';
import RatingFilter from './left-side-compo/RatingFilter';
// import "./teachers.css";

function Left() {
    return (
        <div className="col-md-4">
            <Search />
            <Specializations />
            <Level />
            <TeacherLanguageFilter />
            <RatingFilter />
        </div>
    );
}
export default Left;