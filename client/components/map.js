import React from 'react'
import DrivingGoogleMap from './googleMap'
import googleAPIKey from '../../keys'

class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null
    }
  }

  // https://developers.google.com/maps/documentation/javascript/examples/directions-simple
  componentDidMount() {
    const directionsService = new google.maps.DirectionsService
    directionsService.route({
      origin: this.props.start,
      destination: this.props.end,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    return(
      <div id="map">
        <DrivingGoogleMap
          containerElement={<div style={{height: `100%`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
          directions={this.state.directions}
          >
          </DrivingGoogleMap>
      </div>
    )
  }
}

export default MapPage
