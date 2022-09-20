import React from 'react';

function SocialLink({ children, link }) {
  return (
    <li className="nav-item ms-2">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="nav-link d-flex justify-content-center align-items-center bg-secondary rounded-circle text-reset"
        style={{ width: '35px', height: '35px' }}
      >
        {children}
      </a>
    </li>
  );
}

export default SocialLink;
