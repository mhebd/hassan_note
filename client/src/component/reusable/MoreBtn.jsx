import React from 'react';

function MoreBtn({ onClickHdl }) {
  return (
    <div className="lazy-load-btn-wrap my-5 text-center">
      <button type="button" className="btn btn-outline-dark" onClick={onClickHdl}>
        আরও আর্টিকেল আনুন
      </button>
    </div>
  );
}

export default MoreBtn;
