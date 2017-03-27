import React from 'react'
import POIEntry from './poiEntry.js'
import Search from './search.js'

class POI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 0,
      selectedPOIs: [],
      foodPlaces: [],
      attractionPlaces: [],
      foodFilter: this.props.food,
      attractionFilter: this.props.attractions
    }
    this.setTab = this.setTab.bind(this);
    this.addPOI = this.addPOI.bind(this);
    this.deletePOI = this.deletePOI.bind(this);
    this.renderSelectedPOI = this.renderSelectedPOI.bind(this)
    this.findPOI = this.findPOI.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      foodPlaces: props.foodPlaces,
      attractionPlaces: props.attractionPlaces
    })
  }

  setTab(tab) {
    this.setState({
      selectedTab: tab
    })
  }

  addPOI (poi) {
    this.setState({
      selectedPOIs: [...this.state.selectedPOIs, poi]
    })
  }

  deletePOI (poi) {
    let index = this.state.selectedPOIs.findIndex(place => place.place_id === poi.place_id)
    this.setState({
      selectedPOIs: [
      ...this.state.selectedPOIs.slice(0,index),
      ...this.state.selectedPOIs.slice(index + 1)
      ]
    })
  }

  findPOI(element) {
    return element.place_id === this.props.selectedPOI
  }


  renderSelectedPOI() {
    if (this.props.selectedPOI && this.state.selectedTab === 0) {
      let poi
      if ((this.state.foodFilter && this.state.attractionFilter) || (!this.state.foodFilter && !this.state.attractionFilter)) {
        poi = this.state.foodPlaces.concat(this.state.attractionPlaces).find(this.findPOI)
      } else if (this.state.foodFilter && !this.state.attractionFilter) {
        poi = this.state.foodPlaces.find(this.findPOI)
      } else if (!this.state.foodFilter && this.state.attractionFilter) {
        poi = this.state.attractionPlaces.find(this.findPOI)
      }
      return (
        <div id='poiCurrent'>
        <div className='icon'><img src={poi.icon}/></div>
        <div className='title'> {poi.name} </div>
        <div className='clear'></div>
        { !this.state.selectedPOIs.find(this.findPOI) ?
          <div><button className="poiButtons" onClick={this.addPOI.bind(null, poi)}>Add To Trip</button></div>
          : <div><button className="poiButtons" onClick={this.deletePOI.bind(null, poi)}>Remove From Trip</button></div> }
        </div>
      )
    }
  }

  renderPOIEntry() {
    let POIs
    if ((this.props.food && this.props.attractions) || (!this.props.food && !this.props.attractions)) {
      POIs = this.state.foodPlaces.concat(this.state.attractionPlaces)
    } else if (this.props.food) {
      POIs = this.state.foodPlaces
    } else if (this.props.attractions) {
      POIs = this.state.attractionPlaces
    }
    if (this.state.selectedTab === 0) {
      return POIs.map((entry) => {
        return (<POIEntry {...entry}
                  key={entry.place_id}
                  setSelectedPOI={this.props.setSelectedPOI}
                  selectedTab={this.state.selectedTab}
                  addPOI={this.addPOI}
                />)
      })
    } else if (this.state.selectedTab === 1) {
      return this.state.selectedPOIs.map((entry) => {
        return (<POIEntry {...entry}
                  key={entry.place_id}
                  setSelectedPOI={this.props.setSelectedPOI}
                  selectedTab={this.state.selectedTab}
                  deletePOI={this.deletePOI}
                />)
      })
    } else {
      if (!this.props.directions) return null
      return (
        <ul>
          {this.props.directions.map((step, i) => {
            return <li className="directions" key={i} dangerouslySetInnerHTML={{__html: step}}></li>
          })
          }
        </ul>
      )
    }
  }

  render() {
    return(
      <div id="poi">
        <Search
          setFilters={this.props.setFilters}
          setRoute={this.props.setRoute}
          history={this.props.history}
          food={this.props.food}
          attractions={this.props.attractions}
          start={this.props.start}
          end={this.props.end}
        />
        <div id="tabs">
          <div className="tab myButton" onClick={this.setTab.bind(null, 0)}>Places</div>
          <div className="tab myButton" onClick={this.setTab.bind(null, 1)}>My Places</div>
          <div className="tab myButton" onClick={this.setTab.bind(null, 2)}>Directions</div>
          <div className="clear"></div>
        </div>
        <div>
        </div>
        <div className="clear">
          {this.renderSelectedPOI()}
          {this.renderPOIEntry()}
        </div>
      </div>
    )
  }
}

export default POI
