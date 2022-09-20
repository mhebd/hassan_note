import React from 'react';
import { NavLink } from 'react-router-dom';
import SectionHeading from '../../../reusable/SectionHeading';

function DashboardMenu() {
  return (
    <div className="dashboard-menu mt-4">
      <SectionHeading heading="ড্যাসবোর্ড মেনু" />

      <ul className="list-unstyled">
        <li className="list-item">
          <NavLink to="/dashboard/articles" className="nav-link">
            Articles
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/dashboard/pages" className="nav-link">
            Pages
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/dashboard/profile" className="nav-link">
            Prifile
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/dashboard/change-setting" className="nav-link">
            Setting
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DashboardMenu;
