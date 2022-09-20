/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function Input({
  label,
  type,
  name,
  value,
  placeholder,
  changeHdl,
  valid,
  invalid,
  formText,
  boxClass,
  ...rest
}) {
  return (
    <div className={`mb-3 ${boxClass}`}>
      {label && !boxClass?.includes('form-floating') && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className="form-control"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={changeHdl}
        {...rest}
      />
      {label && boxClass?.includes('form-floating') && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      {formText && <div className="form-text">{formText}</div>}
      {valid && <div className="valid-feedback">{valid}</div>}
      {invalid && <div className="invalid-feedback">{invalid}</div>}
    </div>
  );
}

export default Input;
