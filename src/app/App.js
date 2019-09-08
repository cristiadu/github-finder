import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../components/layout/Navbar';
import UserList from '../components/users/UserList'
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: res.data, loading: false });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          icon="fab fa-github"
          title="Github Finder" />

        <div className="container">
          <UserList
            loading={this.state.loading}
            users={this.state.users} />
        </div>
      </div>
    );
  };
};

export default App;
