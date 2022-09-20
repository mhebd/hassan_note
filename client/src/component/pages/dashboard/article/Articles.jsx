/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticle } from '../../../../context/article/ArticleProvider';
import MoreBtn from '../../../reusable/MoreBtn';
import Notification from '../../../reusable/Notification';
import SectionHeading from '../../../reusable/SectionHeading';

function Articles() {
  const [articleList, setArticleList] = useState(null);
  const [artQ, setArtQ] = useState(12);

  const { getArticles, articles, deleteArticle, isLoading, message } = useArticle();

  useEffect(() => {
    getArticles(artQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artQ]);

  useEffect(() => {
    if (articles) setArticleList(articles);
  }, [articles]);

  const loadMore = () => {
    setArtQ((prevState) => prevState + 12);
  };

  return (
    <div className="container dashboard">
      <div className="d-flex justify-content-between align-items-start">
        <SectionHeading heading="আর্টিকেল সমূহ" />
        <Link to="/dashboard/create-article" className="btn btn-primary">
          Add Article
        </Link>
      </div>

      <div className="article-list">
        <table className="table table-striped w-100 table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>View</th>
              <th>Date</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              articleList &&
              articleList.length > 0 &&
              articleList.map((article, i) => (
                <tr key={Math.random()}>
                  <th>{i + 1}</th>
                  <td>
                    <Link to={`/article/${article?.slug}`} className="text-reset">
                      {article?.title}
                    </Link>
                  </td>
                  <td>{article?.category?.name}</td>
                  <td>{article?.views}</td>
                  <td>
                    {new Date(article?.created).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/create-article?slug=${article?.slug}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteArticle(article?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <MoreBtn onClickHdl={loadMore} />
      </div>

      <Notification message={message} />
    </div>
  );
}

export default Articles;
