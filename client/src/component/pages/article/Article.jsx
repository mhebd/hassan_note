/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useArticle } from '../../../context/article/ArticleProvider';
import ArticleCoverImg from '../../reusable/ArticleCoverImg';
import Loader from '../../reusable/Loader';
import Progressbar from '../../reusable/progress-bar/Progressbar';
import SectionHeading from '../../reusable/SectionHeading';
import Writer from '../../reusable/Writer';
import ArticleDetails from './ArticleDetails';
import ArticleMetaData from './ArticleMetaData';
import Comment from './comment/Comment';
import RelatedArticle from './related/RelatedArticle';

function Article({ match }) {
  const { slug } = match.params;

  const [articleData, setArticleData] = useState(null);

  const { getArticle, article, isLoading } = useArticle();

  useEffect(() => {
    getArticle(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (article) setArticleData(article);
  }, [article]);

  return (
    <div className="container">
      <Progressbar />

      {isLoading && <Loader />}

      {!isLoading && articleData && (
        <div className="single-article-wrap mx-auto" style={{ maxWidth: '992px' }}>
          <ArticleMetaData article={articleData} />

          <div className="mb-5 article-cover">
            <ArticleCoverImg article={articleData} style={{ maxHeight: '500px' }} />
          </div>

          <ArticleDetails article={articleData} />

          <div className="related-article-wrap mt-5">
            <SectionHeading heading="আপনার জন্য আরও কিছু আর্টিকেল" />
            <RelatedArticle article={articleData} />
          </div>

          <div className="writer-wrap mt-5 clearfix">
            <SectionHeading heading="লেখক" />
            <div className="card">
              <div className="card-body">
                <Writer writer={article.writer} />
              </div>
            </div>
          </div>

          <div className="comment-wrap mt-5">
            <SectionHeading heading="মন্তব্য সমূহ" />
            <Comment articleId={article._id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Article;
