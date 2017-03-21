import React from 'react'
import NavBar from './navbar.js'
import { Link, Route } from 'react-router-dom'
import LandingPage from './landingpage'
import TripPage from './trippage'
import Signup from './signup'
import Login from './login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: null,
      end: null,
      food: false,
      attractions: false
    }
    this.setFilters = this.setFilters.bind(this);
    this.setRoute = this.setRoute.bind(this);
  }

  setFilters(food, attractions) {
    this.setState({
      food: food,
      attractions: attractions
    })
  }

  setRoute(start, end) {
    this.setState({
      start: start,
      end: end
    })
  }

  render() {
    return(
      <div id="app">
        <NavBar />
        <Route exact path="/" render={props => (<LandingPage {...props} setFilters={this.setFilters} setRoute={this.setRoute}/>)} />
        <Route path="/trip" render={props => (<TripPage {...props} food={this.state.food} attractions={this.state.attractions} start={this.state.start} end={this.state.end}/>)}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </div>
    )
  }
}

export default App
