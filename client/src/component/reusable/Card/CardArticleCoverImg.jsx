/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

function CardArticleCoverImg({ article, srcPref }) {
  return (
    <div className="card-img-top card-article-img">
      <img src={srcPref + article.coverImage} alt="" className="img-fluid" />
      <Link
        to={`/category/${article.category?._id}`}
        className="card-article-category text-dark bg-light pt-1 px-2 m-1 fw-bold"
        style={{ fontSize: '.7rem', fontFamily: "'Atma', cursive" }}
      >
        {article.category?.name}
      </Link>
    </div>
  );
}

export default CardArticleCoverImg;
