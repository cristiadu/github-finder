import React, { useContext } from 'react';

import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

import GithubContext from '../../context/github/GithubContext';

import './UserList.css';

const UserList = () => {
    const githubContext = useContext(GithubContext);
    const { loading, users } = githubContext;

    return (
        <div className="user-list">
            {loading ? <Spinner /> : users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;
