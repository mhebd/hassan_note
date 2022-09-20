import React from 'react';
import img from '../../asset/images/loader_block.gif';

function Loader() {
  return (
    <div className="loader-wrap d-flex justify-content-center align-items-center">
      <img src={img} alt="loading..." className="img-fluid" />
    </div>
  );
}

export default Loader;
