import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClearButton: PropTypes.bool.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: '' });
    }

    onChange = (e) => this.setState({ text: e.target.value });

    render = () => {
        const { showClearButton, clearUsers } = this.props;
        const { text } = this.state;

        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users..."
                        value={text}
                        onChange={this.onChange} />

                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClearButton && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
            </div>
        );
    };
};

export default Search;
