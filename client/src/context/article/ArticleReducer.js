/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
const ArticleReducer = (state, { type, payload }) => {
	switch (type) {
		case 'CREATE_ARTICLE':
		case 'UPDATE_ARTICLE':
		case 'DELETE_ARTICLE':
			return {
				...state,
				...payload,
				isLoading: false,
			};
			break;

		case 'GET_ARTICLES':
		case 'GET_FEATURED_ARTICLES':
			return {
				...state,
				...payload,
				isLoading: false,
			};
			break;

		case 'GET_ARTICLE':
			return {
				...state,
				...payload,
				isLoading: false,
			};
			break;

		case 'ERR_MSG':
			return {
				...state,
				message: payload,
				isLoading: false,
			};
			break;

		case 'CLEAR_MSG':
			return {
				...state,
				message: null,
			};
			break;

		case 'SET_LOADER':
			return {
				...state,
				isLoading: payload,
			};

		default:
			return state;
			break;
	}
};

export default ArticleReducer;
