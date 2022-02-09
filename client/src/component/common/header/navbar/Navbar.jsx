import React from 'react';
import Button from '../../../reusable/Button';
import Logo from './Logo';
import Nav from './Nav';

function Navbar({ setting }) {
  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Logo setting={setting} />

        <Button
          className="navbar-toggler order-2"
          data-bs-toggle="collapse"
          data-bs-target="#topMenu"
        >
          <span className="navbar-toggler-icon" />
        </Button>

        <Nav setting={setting} />

        <Button
          className="btn-primary order-1 order-md-2 "
          data-bs-toggle="offcanvas"
          data-bs-target="#drower"
        >
          লুকানো ড্রয়ার
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
