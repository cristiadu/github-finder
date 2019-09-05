import React, { Component } from 'react'
import UserItem from './UserItem'

class UserList extends Component {
    state = {
        users: [
            {
                "login": "mojombo",
                "id": 1,
                "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
                "html_url": "https://github.com/mojombo"
            },
            {
                "login": "defunkt",
                "id": 2,
                "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4",
                "html_url": "https://github.com/defunkt"
            },
            {
                "login": "pjhyett",
                "id": 3,
                "avatar_url": "https://avatars0.githubusercontent.com/u/3?v=4",
                "html_url": "https://github.com/pjhyett"
            },
            {
                "login": "wycats",
                "id": 4,
                "avatar_url": "https://avatars0.githubusercontent.com/u/4?v=4",
                "html_url": "https://github.com/wycats"
            },
            {
                "login": "ezmobius",
                "id": 5,
                "avatar_url": "https://avatars0.githubusercontent.com/u/5?v=4",
                "html_url": "https://github.com/ezmobius"
            },
            {
                "login": "ivey",
                "id": 6,
                "avatar_url": "https://avatars0.githubusercontent.com/u/6?v=4",
                "html_url": "https://github.com/ivey",
            },
            {
                "login": "evanphx",
                "id": 7,
                "avatar_url": "https://avatars0.githubusercontent.com/u/7?v=4",
                "html_url": "https://github.com/evanphx",
            },
            {
                "login": "vanpelt",
                "id": 17,
                "avatar_url": "https://avatars1.githubusercontent.com/u/17?v=4",
                "html_url": "https://github.com/vanpelt"
            },
            {
                "login": "wayneeseguin",
                "id": 18,
                "avatar_url": "https://avatars0.githubusercontent.com/u/18?v=4",
                "html_url": "https://github.com/wayneeseguin",
            },
            {
                "login": "brynary",
                "id": 19,
                "avatar_url": "https://avatars0.githubusercontent.com/u/19?v=4",
                "html_url": "https://github.com/brynary",
            },
            {
                "login": "kevinclark",
                "id": 20,
                "avatar_url": "https://avatars3.githubusercontent.com/u/20?v=4",
                "html_url": "https://github.com/kevinclark",
            },
            {
                "login": "technoweenie",
                "id": 21,
                "avatar_url": "https://avatars3.githubusercontent.com/u/21?v=4",
                "html_url": "https://github.com/technoweenie",
            },
            {
                "login": "macournoyer",
                "id": 22,
                "avatar_url": "https://avatars3.githubusercontent.com/u/22?v=4",
                "html_url": "https://github.com/macournoyer",
            },
        ]
    };

    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))};
            </div>
        )
    }
}

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: ""
};

export default UserList;
