import React, { useState } from 'react';

import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../../../constants/envValues';

function Map() {
  const INITIAL_VIEWPORT = {
    width: '100vw',
    height: '100vh',
    longitude: 120.9969249, // 交大經緯度
    latitude: 24.7872616,
    zoom: 17,
  };

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/outdoors-v10"
      mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
    />
  );
}

export default Map;
