import React, { Component } from 'react';

import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../../../constants/envValues';

class Map extends Component {
  state = {
    viewport: {
      width: '100vw',
      height: 'calc(100vh - 56px)',
      latitude: 24.7872616, // 交大經緯度
      longitude: 120.9969249,
      zoom: 17,
    },
  };

  render() {
    return (
      <ReactMapGL
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...this.state.viewport}
      />
    );
  }
}

export default Map;
