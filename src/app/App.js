import React, { Component } from 'react';
import Navbar from '../components/layout/Navbar';
import UserList from '../components/users/UserList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar
          icon="fab fa-github"
          title="Github Finder" />

        <div className="container">
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
