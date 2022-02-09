/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import setHeader from '../../util/setHeader';
import UserReducer from './UserReducer';

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null,
    isLoading: true,
    message: null,
    token: localStorage.getItem('token'),
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Register User
  const registerUser = async (data) => {
    try {
      const res = await axios.post(`/api/v1/user`, data, {
        headers: { 'Content-Type': 'Application/json' },
      });
      dispatch({
        type: 'REGISTER_USER',
        payload: res.data,
      });
      setTimeout(clearMsg, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Login a User
  const loginUser = async (data) => {
    try {
      const res = await axios.post(`/api/v1/user/login`, data, {
        headers: { 'Content-Type': 'Application/json' },
      });
      dispatch({
        type: 'LOGIN_USER',
        payload: res.data,
      });
      setTimeout(clearMsg, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Update admin profile
  const updateUser = async (data) => {
    try {
      const res = await axios.put(`/api/v1/user`, data, {
        headers: { 'Content-Type': 'Application/json' },
      });
      dispatch({
        type: 'UPDATE_USER',
        payload: res.data,
      });
      setTimeout(clearMsg, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Load a User
  const loadUser = async () => {
    if (localStorage.token) setHeader(localStorage.token);

    try {
      const res = await axios(`/api/v1/user`, {
        headers: { 'Content-Type': 'Application/json' },
      });
      dispatch({
        type: 'LOAD_USER',
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // Set message
  const setErrMsg = async (msg) => {
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

  // logout a User
  const logoutUser = async () => {
    if (localStorage.token) localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        loadUser,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
