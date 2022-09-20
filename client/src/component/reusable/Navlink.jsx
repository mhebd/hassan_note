import React from 'react';
import { NavLink } from 'react-router-dom';

function Navlink({ children, link }) {
  return (
    <li className="nav-item">
      <NavLink exact to={link} className="nav-link">
        {children}
      </NavLink>
    </li>
  );
}

export default Navlink;
