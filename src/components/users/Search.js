import React, { useState } from 'react';
import PropTypes from 'prop-types'

const Search = ({ setAlert, searchUsers, showClearButton, clearUsers }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (isSearchValid(text)) {
            searchUsers(text);
            setText('');
        }
    };

    const isSearchValid = (text) => {
        if (text === '') {
            setAlert("Please enter something!", "light");
            return false;
        }

        return true;
    };

    const onChange = (e) => setText(e.target.value);

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={text}
                    onChange={onChange} />

                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {showClearButton && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;
