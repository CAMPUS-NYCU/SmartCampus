import React from 'react';
import GoogleMapReact from 'google-map-react';

import { REACT_APP_GOOGLE_MAP_API_KEY } from '../../../../constants/envValues';
import { useMissionValue } from '../../contexts/MissionContext';
import Flag from '../Flag';
import { useTagValue } from '../../contexts/TagContext';
import Tag from '../Tag';

function Map() {
  const {
    handleToggleShowControl,
    isInMission,
    center,
    zoom,
    handleMapChange,
    markerPosition,
    // handleSetMarkerPosition,
  } = useMissionValue();
  const { tags } = useTagValue();

  return (
    <div style={{
      height: window.innerHeight,
      width: '100vw',
    }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAP_API_KEY }}
        center={center}
        zoom={zoom}
        onChange={handleMapChange}
        onClick={handleToggleShowControl}
        // onChildClick={onMapChildClick} // click on marker
        options={{
          clickableIcons: false,
          fullscreenControl: false,
        }}
      >
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            lng={tag.coordinates.longitude}
            lat={tag.coordinates.latitude}
          />
        ))}
        {isInMission && (
          <Flag
            lng={markerPosition.longitude}
            lat={markerPosition.latitude}
            size={30}
            // onDragEnd={handleSetMarkerPosition} // from mapbox
          />
        )}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
