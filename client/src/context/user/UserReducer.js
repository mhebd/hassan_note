/* eslint-disable no-unreachable */
const UserReducer = (state, { type, payload }) => {
  switch (type) {
    case 'REGISTER_USER':
    case 'LOGIN_USER':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
      break;

    case 'LOAD_USER':
    case 'UPDATE_USER':
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

export default UserReducer;
