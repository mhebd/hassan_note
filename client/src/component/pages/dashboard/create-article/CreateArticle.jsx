/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SectionHeading from '../../../reusable/SectionHeading';
import CreateArticleForm from './CreateArticleForm';

function CreateArticle(props) {
  return (
    <div className="container dahsboard">
      <SectionHeading heading="add new post" />

      <CreateArticleForm {...props} />
    </div>
  );
}

export default CreateArticle;
