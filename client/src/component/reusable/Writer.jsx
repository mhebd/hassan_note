import React from 'react';

function Writer({ writer }) {
  return (
    <div className="bloger-details">
      <img
        src={writer?.gravatar}
        alt=""
        className="img-fluid rounded float-start mb-1 me-2"
        style={{ width: '100px', height: '100px' }}
      />

      <h5 className="mb-2 fw-bolder border-bottom d-inline-block">{writer?.name}</h5>

      <p className="text-muted">{writer?.biodata}</p>
    </div>
  );
}

export default Writer;
