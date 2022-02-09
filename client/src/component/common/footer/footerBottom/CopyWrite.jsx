import React from 'react';
import { Link } from 'react-router-dom';
import e2bNumConv from '../../../../util/e2bNumConv';

function CopyWrite({ setting }) {
  return (
    <div className="col-md-6 order-2 order-md-1">
      <p className="pt-3 text-center text-md-start">
        স্বত্ব &copy; {e2bNumConv(new Date().getFullYear('bn-BD'))}{' '}
        <Link to="/" className="text-reset">
          {setting?.siteName}
        </Link>
      </p>
    </div>
  );
}

export default CopyWrite;
