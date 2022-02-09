/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardArticle from '../../../reusable/Card/CardArticle';

function RelatedArticle({ article }) {
  const [relArts, setRelArts] = useState(null);

  useEffect(() => {
    const getArticlesByTags = async (query, limit) => {
      try {
        const res = await axios(`/api/v1/article/tags/${query}?limit=${limit}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        setRelArts(res.data.articles);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getArticlesByTags(article?.tags[0], 8);
  }, [article.tags]);

  return (
    <div className="related-articles">
      {relArts &&
        relArts.length > 0 &&
        relArts.map(
          (art) =>
            art._id !== article._id && <CardArticle key={Math.random()} article={art} hideExcerpt />
        )}
    </div>
  );
}

export default RelatedArticle;
