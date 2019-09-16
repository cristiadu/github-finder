import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/layout/Navbar';
import Alert from '../components/layout/Alert'

import About from '../components/pages/About'
import Search from '../components/users/Search'
import UserList from '../components/users/UserList';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  searchUsers = async (text) => {
    const endpoint = `search/users?q=${text}&`;

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/${endpoint}
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render = () => {
    const { users, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar
            icon="fab fa-github"
            title="Github Finder" />

          <div className="container">
            <Alert alert={this.state.alert} />
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
            </Switch>

          </div>
        </div>
      </Router>
    );
  };
};

export default App;
