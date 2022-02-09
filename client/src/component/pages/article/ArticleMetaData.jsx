import React from 'react';
import { Link } from 'react-router-dom';

function ArticleMetaData({ article }) {
  return (
    <div className="article-meta text-center" style={{ fontFamily: "'Atma', cursive" }}>
      <Link
        to="/"
        className="art-cat h6 fw-bold d-inline-block mb-2 text-dark border-bottom border-3"
      >
        {article.category?.name}
      </Link>
      <p className="small">
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
      </p>
    </div>
  );
}

export default ArticleMetaData;
