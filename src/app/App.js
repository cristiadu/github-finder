import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/layout/Navbar';
import Alert from '../components/layout/Alert'

import About from '../components/pages/About'
import Search from '../components/users/Search'
import UserList from '../components/users/UserList';
import UserDetails from '../components/users/UserDetails';

import GithubState from '../context/github/GithubState';
import AlertState from '../context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
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
                    <Search />
                    <UserList />
                  </>
                )} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:username" component={UserDetails} />
              </Switch>

            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
