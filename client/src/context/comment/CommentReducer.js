/* eslint-disable no-unreachable */
const CommentReducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_ROOT_COMMENTS':
      return {
        ...state,
        rootComments: payload.rootComments,
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

export default CommentReducer;
