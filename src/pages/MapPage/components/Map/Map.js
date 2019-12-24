import React, { useState } from 'react';

import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../../../constants/envValues';
import { useMissionValue } from '../../contexts/MissionContext';

const INITIAL_VIEWPORT = {
  longitude: 120.9969249, // 交大經緯度
  latitude: 24.7872616,
  zoom: 17,
};

function Map(props) {
  const { handleToggleShowControl } = useMissionValue();

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const onViewportChange = (newViewport) => {
    const { width, height, ...other } = newViewport;
    setViewport(other);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
    }}
    >
      <ReactMapGL
        height="100%"
        width="100%"
        {...viewport}
        onClick={handleToggleShowControl}
        onViewportChange={onViewportChange}
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...props}
      />
    </div>
  );
}

export default Map;
