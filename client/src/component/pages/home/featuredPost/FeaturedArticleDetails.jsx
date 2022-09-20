/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

function FeaturedArticleDetails({ article }) {
  return (
    <div className="col-md-6 mb-3 d-flex flex-column justify-content-center fad-card">
      <div className="article-category mb-2 mb-md-4">
        <Link
          to={`/category/${article?.category?._id}`}
          style={{ fontFamily: "'Atma', cursive" }}
          className="text-reset fw-bolder"
        >
          {article?.category?.name}
        </Link>
      </div>

      <Link to={`/article/${article?.slug}`} className="title text-dark h1 d-block">
        {article?.title}
      </Link>

      <div className="article-info mb-3" style={{ fontFamily: "'Atma', cursive" }}>
        <small>
          <span className="art-date mx-2">
            {new Date(article.created).toLocaleDateString('bn-BD', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          |
          <span className="art-writer mx-2">
            <Link to="/" className="text-reset fw-bold">
              {article.writer?.name}
            </Link>
          </span>
        </small>
      </div>

      <div className="card-text">
        {article?.excerpt} ...{' '}
        <Link to={`/article/${article?.slug}`} className="fw-bold text-reset">
          বাকিটুকু পড়ুন
        </Link>
      </div>
    </div>
  );
}

export default FeaturedArticleDetails;
