import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../components/layout/Navbar';
import Search from '../components/users/Search'
import UserList from '../components/users/UserList';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  searchUsers = async (text) => {
    const hasFilter = text && text !== '';
    const endpoint = hasFilter ? `search/users?q=${text}&` : "users?";

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/${endpoint}
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: hasFilter ? res.data.items : res.data, loading: false });
  };

  componentDidMount = async () => {
    this.searchUsers(null);
  };

  render = () => {
    return (
      <div className="App">
        <Navbar
          icon="fab fa-github"
          title="Github Finder" />

        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <UserList
            loading={this.state.loading}
            users={this.state.users} />
        </div>
      </div>
    );
  };
};

export default App;
