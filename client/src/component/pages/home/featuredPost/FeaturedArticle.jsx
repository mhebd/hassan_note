/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useArticle } from '../../../../context/article/ArticleProvider';
import ArticleCoverImg from '../../../reusable/ArticleCoverImg';
import Loader from '../../../reusable/Loader';
import SectionHeading from '../../../reusable/SectionHeading';
import FeaturedArticleDetails from './FeaturedArticleDetails';

function FeaturedArticle() {
	const [fArticles, setFArticles] = useState(null);

	const { featuredArticles, getFeaturedArticles, isLoading, setLoader } =
		useArticle();

	useEffect(() => {
		setLoader(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getFeaturedArticles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (featuredArticles) setFArticles(featuredArticles);
	}, [featuredArticles]);

	return (
		<div className='featured-post-wrap mb-5'>
			<div className='container'>
				<SectionHeading heading='জনপ্রিয় আর্টিকেল' />

				{isLoading && <Loader />}

				{!isLoading &&
					fArticles &&
					fArticles.length > 0 &&
					fArticles.map((article) => (
						<div className='row' key={Math.random()}>
							<div className='col-md-6 mb-3'>
								<ArticleCoverImg article={article} srcPref='' />
							</div>
							<FeaturedArticleDetails article={article} />
						</div>
					))}
			</div>
		</div>
	);
}

export default FeaturedArticle;
