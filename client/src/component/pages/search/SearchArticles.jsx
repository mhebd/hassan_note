import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useArticle } from '../../../context/article/ArticleProvider';
import CardArticle from '../../reusable/Card/CardArticle';
import Loader from '../../reusable/Loader';
import MoreBtn from '../../reusable/MoreBtn';
import SectionHeading from '../../reusable/SectionHeading';

function SearchArticles({ location }) {
  const { query } = queryString.parse(location.search);

  const [articleList, setArticleList] = useState([]);
  const [artQ, setArtQ] = useState(12);

  const { articles, getArticlesBySearch, isLoading } = useArticle();

  useEffect(() => {
    getArticlesBySearch(query, artQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, artQ]);

  useEffect(() => {
    if (articles) setArticleList(articles);
  }, [articles]);

  const loadMore = () => {
    setArtQ((prevState) => prevState + 12);
  };

  return (
    <div className="home-all-article-wrap mb-5">
      <div className="container">
        <SectionHeading heading={`আনুসন্ধানঃ "${query}"`} />

        {isLoading && <Loader />}

        {!isLoading && articleList.length !== 0 && (
          <div className="row">
            {articleList.map((article) => (
              <CardArticle key={Math.random()} article={article} />
            ))}
          </div>
        )}

        <MoreBtn onClickHdl={loadMore} />
      </div>
    </div>
  );
}

export default SearchArticles;