import './admin.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';


function AdminDashboard() {

  return (
    <div className="dash-container">
      <div className="row">
        <div className="col-md-2">
          <div className="sidebar">
            <div className="d-inline-flex logo mb-5">
              <Link to="/">
                <img src="./images/logo.png" alt="Logo" />
                <div className="logo_title">
                  <h1>Private Teacher</h1>
                  <h3>{'Your best choice'}</h3>
                </div>
              </Link>
            </div>
            <ul>
              <li><Link to="">Dashboard</Link></li>
              <li><Link to="subjects">Subjects</Link></li>
              <li><Link to="teachers">Teachers</Link></li>
              <li><Link to="students">Students</Link></li>
              <li><Link to="contact">Contact</Link></li>

            </ul>
          </div>
        </div>

        <div className="col-md-10">

          <Outlet />
        </div>
      </div>
    </div >
  );
}

export default AdminDashboard;
