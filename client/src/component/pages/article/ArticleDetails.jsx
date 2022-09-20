/* eslint-disable react/no-danger */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';
import e2bNumConv from '../../../util/e2bNumConv';

function ArticleDetails({ article }) {
  const time = Math.ceil(article.content.split(' ').length / 300);
  return (
    <>
      <h1 className="art-title fw-bolder lh-base mb-4 ">
        {article.title}
      </h1>

      <div className="share-btn-wrap mb-5 text-muted border-start ps-2 border-primary border-3" style={{fontFamily: "'Atma', cursive"}}>
        <div className="share-btns d-inline"> 
          <FacebookShareButton className="ms-2" url={window.location.href} quote={article?.excerpt}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton  className="ms-2" url={window.location.href} title={article?.title} summary={article?.excerpt} source={'Hassan\'s Blog'}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <TwitterShareButton  className="ms-2" title={article?.title} via={article?.excerpt} url={window.location.href}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <PinterestShareButton  className="ms-2" media={article?.coverImage} description={article?.title} url={window.location.href}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <RedditShareButton  className="ms-2" title={article?.title} url={window.location.href}>
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
        <span className="mx-2"> <i className="fas fa-eye" /> দেখা হয়েছে {e2bNumConv(article.views) || '০'} বার</span> {' '}
        <span className="mx-2"><i className="fas fa-book-open" /> পড়ার সময় {e2bNumConv(time)} মিনিট</span>
      </div>

      <div
        className="art-post lh-base lead"
        style={{ textAlign: 'justify' }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </>
  );
}

export default ArticleDetails;
