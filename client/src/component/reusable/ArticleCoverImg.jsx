import React from 'react';

function ArticleCoverImg({ style, article }) {
  return (
    <div className="article-cover-img">
      <img
        src={article?.coverImage}
        className="img-fluid w-100 rounded "
        alt="post thumbnail"
        style={style}
      />
    </div>
  );
}

export default ArticleCoverImg;
