import React from 'react'

import spinnerImg from './Spinner.gif'

const Spinner = () => (
  <img src={spinnerImg}
    alt="Loading..."
    style={{ width: '200px', margin: 'auto', display: 'block' }} />
)

export default Spinner
