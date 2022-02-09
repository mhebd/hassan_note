/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CategoryArticles from './CategoryArticles';

function Category(props) {
  return (
    <div>
      <CategoryArticles {...props} />
    </div>
  );
}

export default Category;
