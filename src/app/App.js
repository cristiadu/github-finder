import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/layout/Navbar';
import Alert from '../components/layout/Alert'

import About from '../components/pages/About'
import Search from '../components/users/Search'
import UserList from '../components/users/UserList';
import UserDetails from '../components/users/UserDetails';

import GithubState from '../context/github/GithubState';

import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  const setAlertMessage = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
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
                  <Search setAlert={setAlertMessage} />
                  <UserList />
                </>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:username" render={props => (
                <UserDetails {...props} />
              )} />
            </Switch>

          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
