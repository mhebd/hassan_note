/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import PageReducer from './PageReducer';

const pageContext = createContext();

export const usePage = () => useContext(pageContext);

export const PageProvider = ({ children }) => {
	const initialState = {
		page: null,
		pages: [],
		isLoading: false,
		message: null,
	};

	const [state, dispatch] = useReducer(PageReducer, initialState);

	// Create page
	const createPage = async (data) => {
		try {
			const res = await axios.post(`/api/v1/page`, data, {
				headers: { 'content-type': 'application/json' },
			});

			dispatch({
				type: 'CREATE_PAGE',
				payload: res.data,
			});
			setTimeout(clearMsg, 500);
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get all pages
	const getPages = async () => {
		try {
			const res = await axios(`/api/v1/page`, {
				headers: { 'content-type': 'application/json' },
			});

			dispatch({
				type: 'GET_PAGES',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Get a page
	const getPage = async (slug) => {
		try {
			const res = await axios(`/api/v1/page/${slug}`, {
				headers: { 'content-type': 'application/json' },
			});

			dispatch({
				type: 'GET_PAGE',
				payload: res.data,
			});
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Delete a page
	const deletePage = async (id) => {
		try {
			const res = await axios.delete(`/api/v1/page/${id}`, {
				headers: { 'content-type': 'application/json' },
			});
			getPages();

			dispatch({
				type: 'DELETE_PAGE',
				payload: res.data,
			});
			setTimeout(clearMsg, 500);
		} catch (err) {
			setErrMsg(err.response.data.message);
		}
	};

	// Delete a page
	const updatePage = async (data, id) => {
		try {
			const res = await axios.put(`/api/v1/page/${id}`, data, {
				headers: { 'content-type': 'application/json' },
			});

			dispatch({
				type: 'UPDATE_PAGE',
				payload: res.data,
			});
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

	// Set loader
	const setLoader = (bool) => {
		dispatch({
			type: 'SET_LOADER',
			payload: bool,
		});
	};

	return (
		<pageContext.Provider
			value={{
				...state,
				createPage,
				getPages,
				getPage,
				deletePage,
				updatePage,
				setLoader,
			}}
		>
			{children}
		</pageContext.Provider>
	);
};
