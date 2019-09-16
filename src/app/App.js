import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/layout/Navbar';
import Alert from '../components/layout/Alert'

import About from '../components/pages/About'
import Search from '../components/users/Search'
import UserList from '../components/users/UserList';
import UserDetails from '../components/users/UserDetails';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await this.callGithubApi(`search/users?q=${text}&`);
    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await this.callGithubApi(`users/${username}?`);
    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await this.callGithubApi(`users/${username}/repos?per_page=6&sort=created:asc&`);
    this.setState({ repos: res.data, loading: false });
  }


  // This is here because refactors will happen as the classes move forward.
  // As this is a learning app, I will try to not refactor too much
  // because the next step might undo my refactor.
  callGithubApi = async (endpoint) => {
    return axios.get(`https://api.github.com/${endpoint}
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render = () => {
    const { users, loading, alert, user, repos } = this.state;

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
                    setAlert={this.setAlert}
                    showClearButton={users.length > 0}
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers} />

                  <UserList
                    loading={loading}
                    users={users} />
                </>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:username" render={props => (
                <UserDetails 
                  { ...props } 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos}
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
};

export default App;
