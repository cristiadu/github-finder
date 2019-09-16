import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';

export class UserDetails extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired
    };

    componentDidMount() {
        const username = this.props.match.params.username;

        this.props.getUser(username);
        this.props.getUserRepos(username);
    };

    render() {
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
        } = this.props.user;

        const { loading, repos } = this.props;

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
};

export default UserDetails;
