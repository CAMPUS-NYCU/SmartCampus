import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../../../constants/envValues';

Map.propTypes = {
  handleMapClick: PropTypes.func.isRequired,
};

function Map(props) {
  const { handleMapClick } = props;

  const INITIAL_VIEWPORT = {
    longitude: 120.9969249, // 交大經緯度
    latitude: 24.7872616,
    zoom: 17,
  };

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
        onClick={handleMapClick}
        onViewportChange={onViewportChange}
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
      />
    </div>
  );
}

export default Map;
