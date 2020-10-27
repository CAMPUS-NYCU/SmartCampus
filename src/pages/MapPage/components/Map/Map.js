import React from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanorama
} from '@react-google-maps/api'
import { usePosition } from 'use-position'

import { REACT_APP_GOOGLE_MAP_API_KEY } from '../../../../constants/envValues'
import { useMissionValue, MissionStep } from '../../contexts/MissionContext'
import { useTagValue } from '../../contexts/TagContext'
import flagImg from '../../../../assets/images/yellow-flag.svg'
import myLocationImg from '../../../../assets/images/my-location.png'
import { DefaultZoom } from '../../constants/mapConstants'
import PinTarget from '../PinTarget'
import Mission2 from '../../../../assets/images/mission2circle.svg'
import Mission1 from '../../../../assets/images/mission1circle.svg'
import Mission3 from '../../../../assets/images/mission3circle.svg'
import { missionInfo } from '../../constants/missionInfo'

function Map(props) {
  const { mapCenter } = props
  const {
    handleToggleShowControl,
    isInMission,
    markerPosition,
    handleSetMarkerPosition,
    handleMapOnLoad,
    currentStep,
    handleStreetViewOnLoad,
    streetViewPosition,
    streetViewPOV,
    handleChangeStreetViewPosition,
    handleChangeStreetViewPOV,
    povChanged
  } = useMissionValue()
  const { tags, setActiveTagId, filterTags } = useTagValue()
  const showTags =
    filterTags.length === 0
      ? tags
      : tags.filter(
          (tag) =>
            filterTags.includes(tag.category.missionName) ||
            filterTags.includes(tag.category.subTypeName) ||
            filterTags.includes(tag.category.targetName)
        )
  const {
    latitude: positionLat,
    longitude: positionLng,
    error: positionError
  } = usePosition(false, { enableHighAccuracy: true })
  const missionImage = [Mission1, Mission2, Mission3]
  const missionName = missionInfo.map((mission) => {
    return mission.missionName
  })

  return (
    <div
      style={{
        height: window.innerHeight,
        width: '100vw'
      }}
    >
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          clickableIcons={false}
          center={mapCenter}
          zoom={DefaultZoom}
          onClick={handleToggleShowControl}
          onLoad={handleMapOnLoad}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            disableDefaultUI: true,
            styles: [
              // {
              //   featureType: 'all',
              //   elementType: 'labels.text',
              //   stylers: [
              //     {
              //       visibility: 'off'
              //     }
              //   ]
              // },
              {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }
            ]
          }}
          mapContainerStyle={{
            height: '100%',
            width: '100%'
          }}
        >
          {!positionError && (
            <Marker
              clickable={false}
              position={{
                lat: positionLat,
                lng: positionLng
              }}
              icon={{
                url: myLocationImg,
                scaledSize: { width: 20, height: 20 }
              }}
            />
          )}
          {!isInMission &&
            showTags.map((tag) => (
              <Marker
                key={tag.id}
                position={tag.position}
                icon={{
                  url:
                    missionImage[
                      missionName.findIndex(
                        (mission) => mission === tag.category.missionName
                      )
                    ],
                  scaledSize: { width: 20, height: 20 }
                }}
                clickable
                onClick={() => setActiveTagId(tag.id)}
              />
            ))}
          {isInMission && currentStep === MissionStep.PlaceFlagOnMap && (
            <Marker
              draggable
              // draggable={currentStep === MissionStep.PlaceFlagOnMap}
              onDragEnd={handleSetMarkerPosition}
              position={{
                lat: markerPosition.latitude,
                lng: markerPosition.longitude
              }}
              icon={{ url: flagImg, scaledSize: { width: 30, height: 30 } }}
            />
          )}
          {currentStep === MissionStep.PlaceFlagOnStreet && (
            <>
              <PinTarget />
              <StreetViewPanorama
                position={{
                  lat: streetViewPosition.latitude,
                  lng: streetViewPosition.longitude
                }}
                pov={{
                  heading: !povChanged && streetViewPOV.heading,
                  pitch: !povChanged && streetViewPOV.pitch
                }}
                visible={currentStep === MissionStep.PlaceFlagOnStreet}
                onLoad={handleStreetViewOnLoad}
                onPanoChanged={handleChangeStreetViewPosition}
                onPovChanged={handleChangeStreetViewPOV}
                options={{
                  fullscreenControl: false,
                  zoomControl: false,
                  mapTypeControl: false,
                  // disableDefaultUI: true,
                  enableCloseButton: false,
                  clickToGo: true,
                  addressControl: false
                }}
              />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
