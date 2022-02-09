/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import Input from '../../../reusable/Input';

function UpdateProfileForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    biodata: '',
  });

  const { name, biodata } = formData;

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const onChangeHdl = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHdl = (e) => {
    e.preventDefault();
    if (!name) {
      console.log('Name is required');
    } else {
      updateUser(formData);
    }
  };

  return (
    <div className="update-profile-form">
      <form onSubmit={submitHdl} className="form">
        <Input
          type="text"
          value={name}
          name="name"
          boxClass="form-floating"
          label="Enter Your Name"
          placeholder="Enter your name"
          onChange={onChangeHdl}
        />

        <div className="mb-3 form-floating">
          <textarea
            name="biodata"
            value={biodata}
            onChange={onChangeHdl}
            className="form-control"
            placeholder="enter your biodata"
            style={{ height: '200px' }}
          />
          <label htmlFor="biodata">Enter Your Biodata</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
