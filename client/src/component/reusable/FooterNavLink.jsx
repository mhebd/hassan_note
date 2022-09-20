import React from 'react';
import { Link } from 'react-router-dom';

function FooterNavLink({ link, children }) {
  return (
    <li className="list-item">
      <Link to={link} className="text-reset">
        {children}
      </Link>
    </li>
  );
}

export default FooterNavLink;
