/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RegisterForm from './RegisterForm';

function Register(props) {
  return (
    <div className="container">
      <div className="register-wrap d-flex justify-content-center pt-5">
        <div className="register-form-wrap">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <RegisterForm {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
