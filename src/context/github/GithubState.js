import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const callGithubApi = async (endpoint) => {
        return axios.get(`https://api.github.com/${endpoint}
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    };

    const searchUsers = async (text) => {
        setLoading();
        const res = await callGithubApi(`search/users?q=${text}&`);
        dispatch({ type: SEARCH_USERS, payload: res.data.items })
    };

    const getUser = async (username) => {
        setLoading();
        const res = await callGithubApi(`users/${username}?`);
        dispatch({ type: GET_USER, payload: res.data });
    };

    const getUserRepos = async (username) => {
        setLoading();
        const res = await callGithubApi(`users/${username}/repos?per_page=6&sort=created:asc&`);
        dispatch({ type: GET_REPOS, payload: res.data });
    };

    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers
        }}>
        {props.children}
    </GithubContext.Provider>
};

export default GithubState;