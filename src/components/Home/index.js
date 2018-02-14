/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import _ from 'lodash';
import moment from 'moment';

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
      pings: [],
    };

    this.getMarkers = this.getMarkers.bind(this);
  }


  componentDidMount() {
    db.onceGetAllPoints().then(snapshot => {
      const pings = snapshot.val() || [];
      this.setState(() => ({
        pings: getLatestLatLongForDevices(pings)
      }))
    });
  }

  getMarkers() {
    return this.state.pings.map(ping =>
      <MarkerWithLabel
        key={ping.coreid}
        labelAnchor={new google.maps.Point(0, 0)}
        position={{ lat: ping.lat, lng: ping.lng }}
        labelStyle={{backgroundColor: "yellow", fontSize: "10px", padding: "5px"}}>
        <div>
          <div><strong>DeviceId:</strong> {ping.coreid}</div>
          <div><strong>Last Known:</strong> {moment(ping.published_at).format('MMM Do YY, h:mm:ss a')}</div>
          <div><strong>Battery:</strong> {ping.battery_percent}%</div>
        </div>
      </MarkerWithLabel>)
  }

  renderMapComponent() {
    const markers = this.getMarkers();

    if(!_.isEmpty(markers)) {
      return <MyMapComponent
        markers={markers}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `550px` }} />}
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
