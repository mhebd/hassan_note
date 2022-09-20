/* eslint-disable no-unreachable */
const CategoryReducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_CATEGORIES':
    case 'CREATE_CATEGORY':
    case 'DELETE_CATEGORY':
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

    default:
      return state;
      break;
  }
};

export default CategoryReducer;
