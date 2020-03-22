import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { usePosition } from 'use-position';

import { REACT_APP_GOOGLE_MAP_API_KEY } from '../../../../constants/envValues';
import { useMissionValue } from '../../contexts/MissionContext';
import { useTagValue } from '../../contexts/TagContext';
import HandicapIcon from '../../../../assets/images/handicap-icon.svg';
import flagImg from '../../../../assets/images/red-flag.svg';
import myLocationImg from '../../../../assets/images/my-location.png';
import { DefaultCenter, DefaultZoom } from '../../constants/mapConstants';

function Map() {
  const {
    handleToggleShowControl,
    isInMission,
    markerPosition,
    handleSetMarkerPosition,
    handleMapOnLoad,
  } = useMissionValue();
  const { tags, setActiveTagId } = useTagValue();
  const {
    latitude: positionLat,
    longitude: positionLng,
    error: positionError,
  } = usePosition(true, { enableHighAccuracy: true });

  return (
    <div style={{
      height: window.innerHeight,
      width: '100vw',
    }}
    >
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          clickableIcons={false}
          center={DefaultCenter}
          zoom={DefaultZoom}
          onClick={handleToggleShowControl}
          onLoad={handleMapOnLoad}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          }}
          mapContainerStyle={{
            height: '100%',
            width: '100%',
          }}
        >
          {!positionError && (
            <Marker
              clickable={false}
              position={{
                lat: positionLat,
                lng: positionLng,
              }}
              icon={{ url: myLocationImg, scaledSize: { width: 20, height: 20 } }}
            />
          )}
          {tags.map((tag) => (
            <Marker
              key={tag.id}
              position={tag.position}
              icon={{ url: HandicapIcon, scaledSize: { width: 20, height: 20 } }}
              clickable
              onClick={() => setActiveTagId(tag.id)}
            />
          ))}
          {isInMission && (
          <Marker
            draggable
            onDragEnd={handleSetMarkerPosition}
            position={{
              lat: markerPosition.latitude,
              lng: markerPosition.longitude,
            }}
            icon={{ url: flagImg, scaledSize: { width: 30, height: 30 } }}
          />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
