/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import SettingReducer from './SettingReducer';

const settingContext = createContext();

export const useSetting = () => useContext(settingContext);

export const SettingProvider = ({ children }) => {
  const initialState = {
    setting: null,
    isLoading: true,
    message: null,
  };

  const [state, dispatch] = useReducer(SettingReducer, initialState);

  // Create Setting
  const createSetting = async (data) => {
    try {
      const res = await axios.post(`/api/v1/setting`, data, {
        headers: { 'Content-Type': 'Application/json' },
      });

      dispatch({
        type: 'CREATE_SETTING',
        payload: res.data,
      });
      setTimeout(clearMsg, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Get Setting
  const getSetting = async () => {
    try {
      const res = await axios(`/api/v1/setting`, {
        headers: { 'Content-Type': 'Application/json' },
      });

      dispatch({
        type: 'GET_SETTING',
        payload: res.data,
      });
    } catch (err) {
      // setErrMsg(err.response.data.message);
    }
  };

  // Set message
  const setErrMsg = async (msg) => {
    console.log(msg);
    dispatch({
      type: 'ERR_MSG',
      payload: { text: msg, type: 'error' },
    });
    setTimeout(clearMsg, 500);
  };

  // Clear message
  const clearMsg = () => {
    dispatch({
      type: 'CLEAR_MSG',
    });
  };

  return (
    <settingContext.Provider
      value={{
        ...state,
        createSetting,
        getSetting,
      }}
    >
      {children}
    </settingContext.Provider>
  );
};
