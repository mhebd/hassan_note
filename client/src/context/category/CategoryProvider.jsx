/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import CategoryReducer from './CategoryReducer';

const categoryContext = createContext();

export const useCategory = () => useContext(categoryContext);

export const CategoryProvider = ({ children }) => {
  const initialState = {
    categories: [],
    isLoading: true,
    message: null,
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  // Create cateogry
  const createCategory = async (data) => {
    try {
      const res = await axios.post(`/api/v1/category`, data, {
        headers: { 'content-type': 'application/json' },
      });
      dispatch({
        type: 'CREATE_CATEGORY',
        payload: res.data,
      });
      getCategories();
      setTimeout(clearMsg, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Get cateogries
  const getCategories = async () => {
    try {
      const res = await axios(`/api/v1/category`, {
        headers: { 'content-type': 'application/json' },
      });
      dispatch({
        type: 'GET_CATEGORIES',
        payload: res.data,
      });
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Delete cateogry
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/category/${id}`, {
        headers: { 'content-type': 'application/json' },
      });
      dispatch({
        type: 'DELETE_CATEGORY',
        payload: res.data,
      });
      getCategories();
      setTimeout(clearMsg, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
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

  return (
    <categoryContext.Provider
      value={{
        ...state,
        getCategories,
        createCategory,
        deleteCategory,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};
