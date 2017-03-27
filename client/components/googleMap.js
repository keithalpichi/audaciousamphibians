import React from 'react'
import { GoogleMap, Marker, withGoogleMap, DirectionsRenderer } from 'react-google-maps'

const DrivingGoogleMap = props => (
  <GoogleMap
    onClick={() => props.setSelectedPOI(null)}
  >
    {props.markers && props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.setSelectedPOI(marker.place.placeId)}
        key={marker.place.placeId}
      />
    ))
    }
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default withGoogleMap(DrivingGoogleMap)
