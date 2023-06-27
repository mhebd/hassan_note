/* eslint-disable prettier/prettier */
import React from 'react';
import img from '../../asset/images/loader-2.gif';

function Loader() {
	return (
		<div className='loader-wrap d-flex justify-content-center align-items-center my-5 py-5'>
			<img src={img} alt='loading...' className='img-fluid' />
		</div>
	);
}

export default Loader;
