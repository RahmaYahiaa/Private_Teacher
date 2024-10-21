import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from './PaginationComponent';
import TeachersSection from './TeachersSection';

function PaginationContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const itemsPerPage = 6;


    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
    }, []);


    useEffect(() => {
        const fetchTotalTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teachers/list');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setTotalTeachers(data.length);
                } else {
                    console.error("Unexpected response format:", data);
                }
            } catch (err) {
                console.error('Error fetching teachers:', err);
            }
        };

        fetchTotalTeachers();
    }, []);

    const totalPages = Math.ceil(totalTeachers / itemsPerPage);

    return (
        <div className="container col-md-8 d-flex justify-content-center">
            <div className="row d-flex justify-content-center height-fit" style={{ height: "fit-content", width: "110%" }}>
                <div className="col-md-12 height-fit">
                    <TeachersSection currentPage={currentPage} itemsPerPage={itemsPerPage} />
                </div>
                <div className="row d-flex justify-content-center mt-3" style={{ height: "fit-content" }}>
                    <div className="col-md-12">
                        <PaginationComponent
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginationContainer;
