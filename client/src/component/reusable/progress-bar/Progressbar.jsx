/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';

function Progressbar() {
  useEffect(() => {
    window.addEventListener('scroll', scroll);
    function scroll() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('progress').style.width = `${scrolled}%`;
    }

    return () => window.removeEventListener('scroll', scroll);
  }, []);

  return (
    <div className="progress-wrapper">
      <div className="progress-container">
        <div className="progress-bar" id="progress" />
      </div>
    </div>
  );
}

export default Progressbar;
