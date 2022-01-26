/* eslint-disable camelcase */
/* Disabling camelCase rule of ESLint due to variable names being from Github API field names */
import React, { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

import Spinner from '../layout/Spinner'
import RepoList from '../repos/RepoList'

import GithubContext from '../../context/github/GithubContext'

const UserDetails = () => {
  const githubContext = useContext(GithubContext)
  const { user, loading, repos } = githubContext
  const { username } = useParams()

  useEffect(() => {
    githubContext.getUser(username)
    githubContext.getUserRepos(username)
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  if (loading) return <Spinner />

  return (
    <>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable: <i className={hireable ? 'fas fa-check text-success' : 'fas fa-times-circle text-danger'} />
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt={login}
            style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            {login && (
              <li>
                <strong>Username: </strong> {login}
              </li>
            )}
            {company && (
              <li>
                <strong>Company: </strong> {company}
              </li>
            )}
            {blog && (
              <li>
                <strong>Website: </strong> {blog}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-light">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-danger">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <RepoList repos={repos} />
    </>
  )
}

export default UserDetails
