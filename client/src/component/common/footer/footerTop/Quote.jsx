import React from 'react';

function Quote({ setting }) {
  return (
    <div className="quote-wrap">
      <div className="quote mb-3">
        <span className="pe-3 text-bolder fs-2">
          <i className="fas fa-quote-left" />
        </span>
        <span>{setting?.quote?.text}</span>
        <span className="ps-3 text-bolder fs-2">
          <i className="fas fa-quote-right" />
        </span>
      </div>
      <div className="quote-owner text-end pe-4 text-muted fst-italic">
        <span className="fs-4">~</span> {setting?.quote?.writer}
      </div>
    </div>
  );
}

export default Quote;
