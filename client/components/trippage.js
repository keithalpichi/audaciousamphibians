import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="trip">
        <POI food={this.props.food} attractions={this.props.attractions}/>
        <MapPage start={this.props.start} end={this.props.end}/>
      </div>
    )
  }
}

export default TripPage
