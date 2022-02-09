/* eslint-disable no-unreachable */
const SettingReducer = (state, { type, payload }) => {
  switch (type) {
    case 'CREATE_SETTING':
    case 'GET_SETTING':
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

export default SettingReducer;
