import React from 'react'
import { Link, Route } from 'react-router-dom'
import Login from './login.js'
import Signup from './signup.js'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="navbar">
        <div>
          <img id="logo" src="chipmunk.jpg" height="150" width="150"></img>
          <Link className="nav-links" to="/"><h1>RoadChip</h1></Link>
          <Link className="nav-links-right" to="/signup">Sign Up</Link>
          <Link className="nav-links-right" to="/login">Login</Link>
        </div>
      </div>
    )
  }
}

export default NavBar
