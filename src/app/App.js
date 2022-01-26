import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from '../components/layout/Navbar'
import Alert from '../components/layout/Alert'

import NotFound from '../components/pages/NotFound'
import About from '../components/pages/About'
import Home from '../components/pages/Home'

import UserDetails from '../components/users/UserDetails'

import GithubState from '../context/github/GithubState'
import AlertState from '../context/alert/AlertState'

import './App.css'

const App = () => (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar
              icon="fab fa-github"
              title="Github Finder" />

            <div className="container">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="user/:username" element={<UserDetails />} />
                <Route element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
)

export default App
