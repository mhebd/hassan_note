/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function Button({ type, className, children, ...rest }) {
  return (
    <button type={type || 'button'} className={` btn ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
