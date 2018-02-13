import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import _ from 'lodash';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import { getLatestLatLongForDevices } from './helper';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 13.0827, lng: 80.2707 }} >
    {props.markers}
  </GoogleMap>
))

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heartBeats: [],
    };

    this.getMarkers = this.getMarkers.bind(this);
  }


  componentDidMount() {
    db.onceGetAllPoints().then(snapshot => {
      const heartBeats = snapshot.val() || [];
      this.setState(() => ({
        heartBeats: getLatestLatLongForDevices(heartBeats)
      }))
    });
  }

  getMarkers() {
    return this.state.heartBeats.map(beat => <Marker position={{ lat: beat.lat, lng: beat.lng }} />)
  }

  renderMapComponent() {
    const markers = this.getMarkers();

    if(!_.isEmpty(markers)) {
      return <MyMapComponent
        markers={markers}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />
    } else {
      return <h4>Loading map...</h4>
    }
  }

  render() {
    return (
      <div>
        <h1>Devices</h1>
        <p>Showing last known location of the devices.</p>

        { this.renderMapComponent() }
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
