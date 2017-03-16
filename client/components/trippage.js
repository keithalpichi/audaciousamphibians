import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <POI />
        <MapPage />
      </div>
    )
  }
}

export default TripPage
