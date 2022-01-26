import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import GithubContext from './GithubContext'
import GithubReducer from './GithubReducer'
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types'

const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const setLoading = () => dispatch({ type: SET_LOADING })

  const callGithubApi = async (endpoint) => axios.get(`https://api.github.com/${endpoint}
        client_id=${githubClientId}
        &client_secret=${githubClientSecret}`)

  const searchUsers = async (text) => {
    setLoading()
    const res = await callGithubApi(`search/users?q=${text}&`)
    dispatch({ type: SEARCH_USERS, payload: res.data.items })
  }

  const getUser = async (username) => {
    setLoading()
    const res = await callGithubApi(`users/${username}?`)
    dispatch({ type: GET_USER, payload: res.data })
  }

  const getUserRepos = async (username) => {
    setLoading()
    const res = await callGithubApi(`users/${username}/repos?per_page=6&sort=created:asc&`)
    dispatch({ type: GET_REPOS, payload: res.data })
  }

  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  return <GithubContext.Provider
        value={{
          users: state.users,
          user: state.user,
          repos: state.repos,
          loading: state.loading,
          searchUsers,
          getUser,
          getUserRepos,
          clearUsers,
        }}>
        {props.children}
    </GithubContext.Provider>
}

GithubState.propTypes = {
  children: PropTypes.object.isRequired,
}

export default GithubState
