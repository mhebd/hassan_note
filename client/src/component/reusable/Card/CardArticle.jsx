import React from 'react';
import CardArticleCoverImg from './CardArticleCoverImg';
import CardArticleDetails from './CardArticleDetails';

function CardArticle({ article, hideExcerpt }) {
  return (
    <div className="col-lg-4 col-sm-6 mb-5 col-xxl-3">
      <div className="card article-card">
        <CardArticleCoverImg article={article} srcPref="../" />
        <CardArticleDetails article={article} hideExcerpt={hideExcerpt} />
      </div>
    </div>
  );
}

export default CardArticle;
