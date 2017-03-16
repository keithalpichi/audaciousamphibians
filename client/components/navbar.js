import React from 'react'
import Login from './login.js'
import Signup from './signup.js'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>RoadChip</h1>
        <Login />
        <Signup />
      </div>
    )
  }
}

export default NavBar
