import React, { useState, useContext } from 'react'

import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

const Search = () => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)

  const [text, setText] = useState('')

  const isSearchValid = (textToValidate) => {
    if (textToValidate === '') {
      alertContext.showAlert('Please enter something!', 'light')
      return false
    }

    return true
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (isSearchValid(text)) {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  const onChange = (e) => setText(e.target.value)
  const { users } = githubContext

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
      {users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
    </div>
  )
}

export default Search
