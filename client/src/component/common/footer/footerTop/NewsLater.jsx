import React, { useState } from 'react';
import Button from '../../../reusable/Button';
import Input from '../../../reusable/Input';

function NewsLater() {
  const [email, setEmail] = useState('');

  const submitHdl = (e) => {
    e.preventDefault();
    if (!email) {
      console.log('Please Enter a valid email first.');
    } else {
      console.log(email);
    }
  };

  return (
    <div className="news-later-form">
      <form onSubmit={submitHdl} className="form">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          formText="You can unsubscribe anytime."
        />

        <div className="mb-3 d-grid">
          <Button type="submit" className="btn-primary text-uppercase">
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewsLater;
