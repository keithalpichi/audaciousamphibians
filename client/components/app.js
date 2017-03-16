import React from 'react'
import NavBar from './navbar.js'
import { Link, Route } from 'react-router-dom'
import LandingPage from './landingpage'
import TripPage from './trippage'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <NavBar />
        <Route exact path="/" component={LandingPage}/>
        <Route path="/trip" component={TripPage}/>
      </div>
    )
  }
}

export default App
