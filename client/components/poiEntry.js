import React from 'react'

const POIEntry = (props) => (
  <div className='poiEntries'>
	  <div onClick={props.setSelectedPOI.bind(null, props)}>
	    <div className='icon'><img src={props.icon}/>
	    </div>
	    <div className='title'> {props.name}
	    </div>
	  </div>
    <div className='clear'></div>
    { props.selectedTab === 0 ?
    	<div><button className="poiButtons" onClick={props.addPOI.bind(null, props)}>Add To Trip</button></div>
    	: <div><button className="poiButtons" onClick={props.deletePOI.bind(null, props)}>Remove From Trip</button></div> }
  </div>
)

export default POIEntry
