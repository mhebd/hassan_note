/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../../context/user/UserProvider';
import Button from '../../../reusable/Button';
import Input from '../../../reusable/Input';

function LoginForm() {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loginUser } = useUser();

  // eslint-disable-next-line no-unused-vars
  const { email, password } = formData;

  const submintHdl = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      console.log('Passwrod must be at least 6 charecters long.');
    } else {
      console.log(formData);
      loginUser(formData);
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

  return (
    <form onSubmit={submintHdl} className="needs-validation" noValidate>
      <Input
        label="আপনার ইমেইল দিন"
        valid="Looks Good"
        invalid="Email is required"
        type="email"
        name="email"
        placeholder="Valid email"
        value={email}
        onChange={changeHdl}
        boxClass="form-floating"
        required
      />

      <Input
        label="আপনার পাসওয়ার্ড দিন"
        invalid="Passwrod is required. Use at least 6 charecters long password"
        type="password"
        name="password"
        placeholder="Secured passwrod"
        value={password}
        onChange={changeHdl}
        boxClass="form-floating"
        required
      />

      <div className="mb-3">
        এখনও রেজিস্ট্রেশন করেন নি? <Link to="/register">রেজিস্ট্রেশন করুন</Link>
      </div>

      <div className="mb-3">
        <Button className="btn-primary" type="submit">
          প্রবেশ করুন
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
