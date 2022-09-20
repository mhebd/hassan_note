import React from 'react';
import img from '../../../asset/images/404.png';

function Notfound() {
  return (
    <div
      className="not-found-wrap d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <img src={img} alt="404 error..." className="img-fluid bg-danger p-5" />
    </div>
  );
}

export default Notfound;
