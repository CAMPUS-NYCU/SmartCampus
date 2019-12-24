import React from 'react';

import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../../../constants/envValues';
import { useMissionValue } from '../../contexts/MissionContext';
import Flag from '../Flag';

function Map(props) {
  const {
    handleToggleShowControl,
    isInMission,
    viewport,
    handleViewportChange,
    markerPosition,
    handleSetMarkerPosition,
  } = useMissionValue();

  return (
    <div style={{
      height: window.innerHeight,
      width: '100vw',
    }}
    >
      <ReactMapGL
        height="100%"
        width="100%"
        {...viewport}
        onClick={handleToggleShowControl}
        onViewportChange={handleViewportChange}
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...props}
      >
        {isInMission && (
          <Marker
            longitude={markerPosition.longitude}
            latitude={markerPosition.latitude}
            offsetTop={-30}
            offsetLeft={-3}
            draggable
            onDragEnd={handleSetMarkerPosition}
          >
            <Flag size={30} />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
