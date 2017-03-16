import React from 'react'

class POI extends React.Component {
  constructor(props) {
    super(props)
  }

  requestRoute() {
    console.log('Sending search request to Google Maps API')
    /*
    Send request to Google Maps API with both start and finish points
     - On Success
     - On error
    */
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="Start"></input>
        <input type="text" placeholder="Finish"></input>
        {/*}<Link className="search" to="/trippage">Search</Link>*/}
        Here is the POI component
        <button onClick={this.requestRoute}></button>
      </div>
    )
  }
}

export default POI
