import React from 'react'
import { GoogleMap, Marker, withGoogleMap, DirectionsRenderer } from "react-google-maps"

const DrivingGoogleMap = props => (
  <GoogleMap
  >
    {/*props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))
    */}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default withGoogleMap(DrivingGoogleMap)
