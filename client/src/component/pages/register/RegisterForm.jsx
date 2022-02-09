/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/user/UserProvider';
import Button from '../../reusable/Button';
import Input from '../../reusable/Input';

function RegisterForm({ history }) {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { registerUser, user } = useUser();

  // eslint-disable-next-line no-unused-vars
  const { name, email, password, password2 } = formData;

  const submintHdl = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      console.log('Passwrod must be at least 6 charecters long.');
    } else if (password !== password2) {
      console.log('Password & Confirm passwrod did not match');
    } else {
      registerUser(formData);
    }
  };

  const changeHdl = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Activate bootstrap form validation
  useEffect(() => {
    // eslint-disable-next-line func-names
    (function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener(
          'submit',
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  }, []);

  useEffect(() => {
    if (user) history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <form onSubmit={submintHdl} className="needs-validation" noValidate>
      <Input
        label="Enter Your Full Name"
        valid="Looks Good"
        invalid="Name is required"
        type="text"
        name="name"
        placeholder="Full Name"
        value={name}
        onChange={changeHdl}
        required
      />

      <Input
        label="Enter Your Valid Email"
        valid="Looks Good"
        invalid="Email is required"
        type="email"
        name="email"
        placeholder="Valid email"
        value={email}
        onChange={changeHdl}
        required
      />

      <Input
        label="Enter Your Secured Passwrod"
        valid="Use at least 6 charecters long password"
        invalid="Passwrod is required"
        type="password"
        name="password"
        placeholder="Secured passwrod"
        value={password}
        onChange={changeHdl}
        required
      />

      <Input
        label="Confirm Your Password"
        valid="Carefully retype your password"
        invalid="Confirm passwrod is required"
        type="password"
        name="password2"
        placeholder="Retype your password"
        value={password2}
        onChange={changeHdl}
        required
      />

      <div className="mb-3">
        <Button className="btn-primary" type="submit">
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
