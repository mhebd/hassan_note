/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SearchArticles from './SearchArticles';

function Search(props) {
  return (
    <div>
      <SearchArticles {...props} />
    </div>
  );
}

export default Search;
