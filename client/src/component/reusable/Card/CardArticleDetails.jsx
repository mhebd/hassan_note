import React from 'react';
import { Link } from 'react-router-dom';

function CardArticleDetails({ article, hideExcerpt }) {
  const { title, excerpt, slug } = article;

  return (
    <div className="card-body">
      <Link to={`/article/${slug}`} className="card-title text-dark h5 d-block">
        {title}
      </Link>

      {!hideExcerpt && (
        <div className="card-text">
          {excerpt} ...{' '}
          <Link to={`/article/${slug}`} className="fst-italic text-reset">
            <u>বাকিটুকু পড়ুন</u>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardArticleDetails;
