/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import CommentReducer from './CommentReducer';

const commentContext = createContext();

export const useComment = () => useContext(commentContext);

export const CommentProvider = ({ children }) => {
  const initialState = {
    rootComments: [],
    isLoading: true,
    message: null,
  };

  const [state, dispatch] = useReducer(CommentReducer, initialState);

  // Create comment
  const createComment = async (data) => {
    try {
      const res = await axios.post(`/api/v1/comment`, data, {
        headers: { 'content-type': 'application/json' },
      });
      getRootComments(data.article);
      dispatch({
        type: 'CREATE_COMMENT',
        payload: res.data,
      });
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  // Get root comments
  const getRootComments = async (aid) => {
    try {
      const res = await axios(`/api/v1/comment/${aid}`, {
        headers: { 'content-type': 'application/json' },
      });

      dispatch({
        type: 'GET_ROOT_COMMENTS',
        payload: res.data,
      });
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
    <commentContext.Provider
      value={{
        ...state,
        createComment,
        getRootComments,
      }}
    >
      {children}
    </commentContext.Provider>
  );
};
