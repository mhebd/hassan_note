/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import ArticleReducer from './ArticleReducer';

const articleContext = createContext();

export const useArticle = () => useContext(articleContext);

export const ArticleProvider = ({ children }) => {
	const initialState = {
		article: null,
		articles: [],
		message: null,
		featuredArticles: [],
		isLoading: true,
	};

	const [state, dispatch] = useReducer(ArticleReducer, initialState);

	// Create Article
	const createArticle = async (data) => {
		try {
			const res = await axios.post(`/api/v1/article`, data, {
				headers: { 'Content-Type': 'Application/json' },
			});

			dispatch({
				type: 'CREATE_ARTICLE',
				payload: res.data,
			});
			setTimeout(clearMsg, 500);
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Create Article
	const updateArticle = async (data, id) => {
		try {
			const res = await axios.put(`/api/v1/article/${id}`, data, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({
				type: 'UPDATE_ARTICLE',
				payload: res.data,
			});
			setTimeout(clearMsg, 500);
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get all Article
	const getArticles = async (limit) => {
		try {
			const res = await axios(`/api/v1/article?limit=${limit}`, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({
				type: 'GET_ARTICLES',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get Featured Article
	const getFeaturedArticles = async () => {
		try {
			const res = await axios(`/api/v1/article/featured`, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({
				type: 'GET_FEATURED_ARTICLES',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get all Article By category
	const getArticlesByCategory = async (id, limit) => {
		try {
			const res = await axios(
				`/api/v1/article/by-category/${id}?limit=${limit}`,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			dispatch({
				type: 'GET_ARTICLES',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get all Article By search
	const getArticlesBySearch = async (query, limit) => {
		try {
			const res = await axios(
				`/api/v1/article/search/${query}?limit=${limit}`,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			dispatch({
				type: 'GET_ARTICLES',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get all Article
	const getArticle = async (slug) => {
		try {
			const res = await axios(`/api/v1/article/${slug}`, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({
				type: 'GET_ARTICLE',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Delete a Article
	const deleteArticle = async (id) => {
		try {
			const res = await axios.delete(`/api/v1/article/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({
				type: 'DELETE_ARTICLE',
				payload: res.data,
			});
			getArticles();
			setTimeout(clearMsg, 500);
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

  // Set loader
  const setLoader = (bool) => {
    dispatch({
      type: 'SET_LOADER',
      payload: bool,
    });
  }

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
		<articleContext.Provider
			value={{
				...state,
				createArticle,
				updateArticle,
				getArticles,
				getArticle,
				getArticlesByCategory,
				getArticlesBySearch,
				getFeaturedArticles,
				deleteArticle,
        setLoader,
			}}
		>
			{children}
		</articleContext.Provider>
	);
};
