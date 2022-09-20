import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ setting }) {
  return (
    <Link to="/" className="navbar-brand">
      {setting?.siteName}
    </Link>
  );
}

export default Logo;
