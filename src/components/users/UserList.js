import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import './UserList.css';


const UserList = ({ loading, users }) => {
    return (
        <div className="user-list">
            {loading ? <Spinner /> : users.map(user => (
                <UserItem key={user.id} user={user} />
            ))};
            </div>
    );
};

UserList.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default UserList;
