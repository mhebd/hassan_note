/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { usePage } from '../../../context/page/PageProvider';
import Progressbar from '../../reusable/progress-bar/Progressbar';
import Loader from '../../reusable/Loader';

function Page({ match }) {
	const { slug } = match.params;

	const [pageData, setPageData] = useState(null);

	const { getPage, page, isLoading, setLoader } = usePage();

	useEffect(() => {
		setLoader(true);
		getPage(slug);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	useEffect(() => {
		if (page) setPageData(page);
	}, [page]);

	return (
		<div className='container'>
			<Progressbar />

			{isLoading && <Loader />}

			{!isLoading && pageData && (
				<div className=' page-wrap mb-5'>
					<div className='page-title-wrap mb-5 mt-4 text-center'>
						<h3 className='page-title fw-bolder fs-1 border-bottom d-inline border-3'>
							{pageData.title}
						</h3>
					</div>

					<div
						className='page-content-wrap'
						dangerouslySetInnerHTML={{ __html: pageData.content }}
					/>
				</div>
			)}
		</div>
	);
}

export default Page;
