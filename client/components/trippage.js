import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: [],
      attractions: [],
      selectedPOI: null,
      directions: null
    }

    this.setFood = this.setFood.bind(this);
    this.setAttractions = this.setAttractions.bind(this);
    this.setSelectedPOI = this.setSelectedPOI.bind(this);
    this.setDirections = this.setDirections.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.start !== prevProps.start ||
        this.props.end !== prevProps.end ||
        this.props.food !== prevProps.food ||
        this.props.attractions !== prevProps.attractions
       ) {
      this.setState({
        food: [],
        attractions: [],
        selectedPOI: null,
        directions: null
      })
    }
  }

  setFood (food) {
      this.setState({
        food: [
        ...this.state.food,
        ...food
        ]
      })
  }

  setAttractions (attractions) {
    this.setState({
      attractions: [
        ...this.state.attractions,
        ...attractions
      ]
    })
  }

  setSelectedPOI (selected) {
    this.setState({
      selectedPOI: selected
    })
  }

  setDirections(directions) {
    this.setState({
      directions: directions
    })
  }

  render() {
    return(
      <div id="trip">
        <POI food={this.props.food}
          attractions={this.props.attractions}
          foodPlaces={this.state.food}
          attractionPlaces={this.state.attractions}
          selectedPOI={this.state.selectedPOI}
          setSelectedPOI={this.setSelectedPOI}
          setFilters={this.props.setFilters}
          setRoute={this.props.setRoute}
          start={this.props.start}
          end={this.props.end}
          history={this.props.history}
          directions={this.state.directions}
        />
        <MapPage
          start={this.props.start}
          end={this.props.end}
          food={this.props.food}
          attractions={this.props.attractions}
          setFood={this.setFood}
          setAttractions={this.setAttractions}
          setSelectedPOI={this.setSelectedPOI}
          selectedPOI={this.state.selectedPOI}
          setDirections={this.setDirections}
        />
      </div>
    )
  }
}

export default TripPage
