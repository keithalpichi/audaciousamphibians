import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: [],
      attractions: [],
      selectedPOI: null
    }

    this.setFood = this.setFood.bind(this);
    this.setAttractions = this.setAttractions.bind(this);
    this.setSelectedPOI = this.setSelectedPOI.bind(this);
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
        selectedPOI: null
      })
    }
  }

  setFood (food) {
    this.setState({
      food: food
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

  render() {
    return(
      <div id="trip">
        <POI food={this.props.food}
          attractions={this.props.attractions}
          foodMarker={this.state.food}
          attractionsMarker={this.state.attractions}
          selectedPOI={this.state.selectedPOI}
          setSelectedPOI={this.setSelectedPOI}
          setFilters={this.props.setFilters}
          setRoute={this.props.setRoute}
          start={this.props.start}
          end={this.props.end}
          history={this.props.history}
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
        />
      </div>
    )
  }
}

export default TripPage
