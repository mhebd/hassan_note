import React from 'react';

function ArticleCoverImg({ style, article, srcPref }) {
  return (
    <div className="article-cover-img">
      <img
        src={srcPref + article?.coverImage}
        className="img-fluid w-100 rounded "
        alt="post thumbnail"
        style={style}
      />
    </div>
  );
}

export default ArticleCoverImg;
