import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'

import {
  SET_ALERT,
  REMOVE_ALERT,
} from '../types'

const AlertState = (props) => {
  const initialState = null

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const showAlert = (message, type) => {
    dispatch({ type: SET_ALERT, payload: { message, type } })
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000)
  }

  return <AlertContext.Provider
    value={{
      alert: state,
      showAlert,
    }} >
    {props.children}
  </AlertContext.Provider>
}

AlertState.propTypes = {
  children: PropTypes.object.isRequired,
}

export default AlertState
