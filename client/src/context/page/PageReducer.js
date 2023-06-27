/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
const PageReducer = (state, { type, payload }) => {
	switch (type) {
		case 'CREATE_PAGE':
		case 'DELETE_PAGE':
		case 'UPDATE_PAGE':
			return {
				...state,
				...payload,
				isLoading: false,
			};
			break;

		case 'GET_PAGES':
			return {
				...state,
				...payload,
				isLoading: false,
			};
			break;

		case 'GET_PAGE':
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
			break;

		default:
			return state;
			break;
	}
};

export default PageReducer;
