import React from 'react';
import HomeArticles from './allPost/HomeArticles';
import FeaturedArticle from './featuredPost/FeaturedArticle';

function Home() {
  return (
    <div>
      <FeaturedArticle />
      <HomeArticles />
    </div>
  );
}

export default Home;
