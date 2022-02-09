import React from 'react';

function SectionHeading({ heading, className }) {
  return (
    <div className={`section-heading mb-3 ${className}`}>
      <h3 className="pb-1 fw-bolder d-inline-block">{heading}</h3>
    </div>
  );
}

export default SectionHeading;
