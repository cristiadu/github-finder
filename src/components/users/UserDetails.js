import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';

const UserDetails = ({ getUser, getUserRepos, user, loading, repos, match }) => {
    useEffect(() => {
        const username = match.params.username;

        getUser(username);
        getUserRepos(username);
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
        hireable
    } = user;

    if (loading) return <Spinner />;

    return (
        <>
            <Link to="/" className="btn btn-light">
                Back to Search
            </Link>
            Hireable: <i className={hireable ? "fas fa-check text-success" : "fas fa-times-circle text-danger"} />
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
    );
};

UserDetails.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
};

export default UserDetails;
