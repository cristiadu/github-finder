import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/layout/Navbar';
import Alert from '../components/layout/Alert'

import About from '../components/pages/About'
import Search from '../components/users/Search'
import UserList from '../components/users/UserList';
import UserDetails from '../components/users/UserDetails';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);
    const res = await callGithubApi(`search/users?q=${text}&`);
    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    setLoading(true);
    const res = await callGithubApi(`users/${username}?`);
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await callGithubApi(`users/${username}/repos?per_page=6&sort=created:asc&`);
    setRepos(res.data);
    setLoading(false);
  }

  // This is here because refactors will happen as the classes move forward.
  // As this is a learning app, I will try to not refactor too much
  // because the next step might undo my refactor.
  const callGithubApi = async (endpoint) => {
    return axios.get(`https://api.github.com/${endpoint}
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const setAlertMessage = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          icon="fab fa-github"
          title="Github Finder" />

        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/" render={() => (
              <>
                <Search
                  setAlert={setAlertMessage}
                  showClearButton={users.length > 0}
                  searchUsers={searchUsers}
                  clearUsers={clearUsers} />

                <UserList
                  loading={loading}
                  users={users} />
              </>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:username" render={props => (
              <UserDetails 
                { ...props } 
                getUser={getUser} 
                getUserRepos={getUserRepos}
                user={user} 
                repos={repos}
                loading={loading} />
            )} />
          </Switch>

        </div>
      </div>
    </Router>
  );
};

export default App;
