import React from 'react'

class POI extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="poi">
        <input type="text" placeholder="Start"></input>
        <input type="text" placeholder="Finish"></input>
        {/*}<Link className="search" to="/trippage">Search</Link>*/}
        Here is the POI component
        <button onClick={this.requestRoute}>Search</button>
      </div>
    )
  }
}

export default POI
