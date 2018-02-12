import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import _ from 'lodash';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 13.0827, lng: 80.2707 }} >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.long }} />}
  </GoogleMap>
))

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heartBeats: [],
      lastBeat: {}
    };

    this.getLastBeatDetails = this.getLastBeatDetails.bind(this);
  }

  getLastBeatDetails() {
    const { lastBeat } = this.state;

    if(_.isEmpty(lastBeat)){
      return {};
    }

    const { coreid, data } = lastBeat;
    const { geo_code, battery_percent } = JSON.parse(data);
    const [ latStr, longStr ] = geo_code.split(",");
    const [ lat, long ] = [Number(latStr), Number(longStr)]
    return { coreid, lat, long, battery_percent }
  }

  componentDidMount() {
    db.onceGetAllPoints().then(snapshot => {
      const heartBeats = snapshot.val() || [];
      this.setState(() => ({
        heartBeats: heartBeats,
        lastBeat: _.maxBy(_.values(heartBeats), (b) => Date.parse(b.published_at))
      }))
    });
  }

  renderMapComponent() {
    const { coreid, lat, long, battery_percent } = this.getLastBeatDetails();

    if(coreid && lat && long && battery_percent) {
      return <MyMapComponent
        isMarkerShown
        lat={lat}
        long={long}
        deviceId={coreid}
        batteryPercent={battery_percent}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />
    } else {
      return false
    }
  }

  render() {
    const mapComponent = this.renderMapComponent();

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { mapComponent }
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
