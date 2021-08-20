import React, { useMemo } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanorama,
  MarkerClusterer
} from '@react-google-maps/api'
import moment from 'moment'
import { REACT_APP_GOOGLE_MAP_API_KEY } from '../../../../constants/envValues'
import {
  useMissionValue,
  MissionStep
} from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import flagImg from '../../../../assets/images/yellow-flag.svg'
import myLocationImg from '../../../../assets/images/my-location.svg'
import { DefaultZoom } from '../../../../constants/mapConstants'
import PinTarget from '../PinTarget'
import Mission2 from '../../../../assets/images/mission2circle.svg'
import Mission1 from '../../../../assets/images/mission1circle.svg'
import Mission3 from '../../../../assets/images/mission3circle.svg'
import Missionred2 from '../../../../assets/images/mission2redcircle.svg'
import Missionred1 from '../../../../assets/images/mission1redcircle.svg'
import Missionred3 from '../../../../assets/images/mission3redcircle.svg'
import Missiongreen3 from '../../../../assets/images/mission3greencircle.svg'
import { missionInfo } from '../../../../constants/missionInfo'

function Map(props) {
  const { mapCenter, userPosition, userPositionError } = props
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
  const { tags, setActiveTagId, activeTagId, filterTags } = useTagValue()
  const showTags = useMemo(
    () =>
      filterTags.length === 0
        ? tags
        : tags.filter(
            (tag) =>
              filterTags.includes(tag.category.missionName) ||
              filterTags.includes(tag.category.subTypeName) ||
              filterTags.includes(tag.category.targetName)
          ),
    [filterTags, tags]
  )
  const missionImage = useMemo(
    () => [Mission1, Mission2, Mission3, Missiongreen3],
    []
  )
  const missionredImage = useMemo(
    () => [Missionred1, Missionred2, Missionred3],
    []
  )
  const missionName = useMemo(
    () =>
      missionInfo.map((mission) => {
        return mission.missionName
      }),
    []
  )
  const compareTime = (time) => {
    const tagTime = moment(time, 'YYYY-MM-DD h:mm')
    const nowTime = moment()
    return moment.duration(nowTime.diff(tagTime)).as('minutes') < 30
  }
  return (
    <div
      style={{
        height: window.innerHeight,
        width: '100vw',
        position: 'fixed'
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
            // styles: [
            //   {
            //     featureType: 'poi',
            //     elementType: 'labels.icon',
            //     stylers: [
            //       {
            //         visibility: 'off'
            //       }
            //     ]
            //   },
            //   {
            //     featureType: 'poi.school',
            //     elementType: 'labels.icon',
            //     stylers: [
            //       {
            //         visibility: 'on'
            //       }
            //     ]
            //   },
            //   {
            //     featureType: 'poi.sports_complex',
            //     elementType: 'labels.icon',
            //     stylers: [
            //       {
            //         visibility: 'on'
            //       }
            //     ]
            //   }
            // ]
          }}
          mapContainerStyle={{
            height: '100%',
            width: '100%'
          }}
          onCenterChanged={() => {
            if (isInMission && currentStep === MissionStep.PlaceFlagOnMap) {
              handleSetMarkerPosition()
            }
          }}
        >
          {!userPositionError && (
            <Marker
              clickable={false}
              position={userPosition}
              icon={{
                url: myLocationImg,
                scaledSize: { width: 20, height: 20 }
              }}
            />
          )}
          {!isInMission && (
            <MarkerClusterer
              option={{
                imagePath:
                  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
              }}
            >
              {(clusterer) =>
                showTags.map((tag) => (
                  <Marker
                    key={tag.id}
                    position={{
                      lat: parseFloat(tag.coordinates.latitude),
                      lng: parseFloat(tag.coordinates.longitude)
                    }}
                    icon={(() => {
                      if (activeTagId === tag.id) {
                        return {
                          url:
                            missionredImage[
                              missionName.findIndex(
                                (mission) =>
                                  mission === tag.category.missionName
                              )
                            ],
                          scaledSize: { width: 20, height: 20 }
                        }
                      }
                      if (tag.category.missionName === '動態任務') {
                        if (compareTime(tag.lastUpdateTime)) {
                          return {
                            url: missionImage[3],
                            scaledSize: { width: 20, height: 20 }
                          }
                        }
                        return {
                          url: missionImage[2],
                          scaledSize: { width: 20, height: 20 }
                        }
                      }
                      return {
                        url:
                          missionImage[
                            missionName.findIndex(
                              (mission) => mission === tag.category.missionName
                            )
                          ],
                        scaledSize: { width: 20, height: 20 }
                      }
                    })()}
                    clickable
                    onClick={() => setActiveTagId(tag.id)}
                    clusterer={clusterer}
                  />
                ))
              }
            </MarkerClusterer>
          )}
          {isInMission && currentStep === MissionStep.PlaceFlagOnMap && (
            <Marker
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
