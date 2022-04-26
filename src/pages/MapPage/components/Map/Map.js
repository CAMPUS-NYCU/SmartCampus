import React, { useMemo, useEffect, useCallback } from 'react'
import { GoogleMap, Marker, StreetViewPanorama } from '@react-google-maps/api'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import {
  useMissionValue,
  MissionStep
} from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { MAP_PATH } from '../../../../constants/pageUrls'
import flagImg from '../../../../assets/images/yellow-flag.svg'
import myLocationImg from '../../../../assets/images/my-location.svg'
import { DefaultZoom } from '../../../../constants/mapConstants'
import PinTarget from '../PinTarget'
import FixedTags from '../../../../assets/images/fixedtag.svg'
import Mission2Voting from '../../../../assets/images/mission2_pin_voting.svg'
import Mission2 from '../../../../assets/images/mission2_pin.svg'
import Mission1 from '../../../../assets/images/mission1_pin.svg'
import Mission3 from '../../../../assets/images/mission3_pin.svg'
import Missionred2 from '../../../../assets/images/mission2_pin_activated.svg'
import Missionred1 from '../../../../assets/images/mission1_pin_activated.svg'
import Missionred3 from '../../../../assets/images/mission3_pin_activated.svg'
import Missiongreen3 from '../../../../assets/images/mission3_pin_statusGreen.svg'
import Missionyellow3 from '../../../../assets/images/mission3_pin_statusYellow.svg'
import Missionnewred3 from '../../../../assets/images/mission3_pin_statusRed.svg'
import Searchposition from '../../../../assets/images/searchPositionIcon.svg'
import { missionInfo } from '../../../../constants/missionInfo'
import tagData from '../../../../constants/tagData'

function Map(props) {
  const {
    mapCenter,
    userPosition,
    userPositionError,
    place,
    search,
    placeName
  } = props
  const history = useHistory()
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
    povChanged,
    showControl,
    mapInstance
  } = useMissionValue()
  const { tags, fixedTags, activeTagId, filterTags } = useTagValue()
  const isShown = useCallback(
    (tag) => {
      if (filterTags.length === 0) {
        return true
      }
      return (
        filterTags.includes(tag.category.missionName) ||
        filterTags.includes(tag.category.subTypeName) ||
        (filterTags.includes(tag.category.targetName) &&
          tags.map((t) => t.id).includes(tag.id))
      )
    },
    [filterTags, tags]
  )
  const [markers, setMarkers] = React.useState([])
  const [markerCluster, setMarkerCluster] = React.useState(null)
  useEffect(() => {
    if (mapInstance) {
      const cluster = new MarkerClusterer({
        map: mapInstance,
        markers: [],
        renderer: {
          render: ({ count, position }) => {
            return new window.google.maps.Marker({
              position,
              icon: {
                url:
                  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png',
                scaledSize: new window.google.maps.Size(45, 45)
              },
              label: {
                text: String(count),
                color: 'rgba(255,255,255,0.9)',
                fontSize: '12px'
              },
              // adjust zIndex to be above other markers
              zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count
            })
          }
        }
      })
      setMarkerCluster((prevCluster) => {
        if (prevCluster) {
          prevCluster.clearMarkers()
        }
        return cluster
      })
    }
  }, [mapInstance])
  useEffect(() => {
    if (markerCluster) {
      markerCluster.clearMarkers()
      markerCluster.addMarkers(
        markers.filter((m) => isShown(m.tag)).map((m) => m.marker)
      )
      if (isInMission) {
        markerCluster.clearMarkers()
      }
    }
  }, [markers, markerCluster, isShown, isInMission])
  useEffect(() => {
    setMarkers((prevMarkers) => {
      return prevMarkers.filter((m) => tags.map((t) => t.id).includes(m.tag.id))
    })
  }, [tags])

  const missionImage = useMemo(() => [Mission1, Mission2, Mission3], [])
  const mission2ImageVoting = useMemo(() => [Mission2Voting], [])
  const missionredImage = useMemo(
    () => [Missionred1, Missionred2, Missionred3],
    []
  )
  const missionActiveImage = useMemo(
    () => [Missiongreen3, Missionyellow3, Missionnewred3],
    []
  )
  const missionName = useMemo(
    () =>
      missionInfo.map((mission) => {
        return mission.missionName
      }),
    []
  )
  const StatusName = useMemo(
    () =>
      tagData[2].map((tagdata) => {
        return tagdata.statusName
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
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'poi.school',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'on'
                }
              ]
            }
          ]
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
        {!userPositionError && userPosition.lat && userPosition.lng && (
          <Marker
            clickable={false}
            position={userPosition}
            icon={{
              url: myLocationImg,
              scaledSize: { width: 20, height: 20 }
            }}
          />
        )}
        {markerCluster &&
          fixedTags.map((fixedtag) => (
            <Marker
              key={fixedtag.id}
              visible={!isInMission && isShown(fixedtag)}
              position={{
                lat: parseFloat(fixedtag.coordinates.latitude),
                lng: parseFloat(fixedtag.coordinates.longitude)
              }}
              icon={{
                url: FixedTags,
                scaledSize: { width: 28, height: 30 },
                labelOrigin: { x: 15, y: 34 }
              }}
              label={{
                text: fixedtag.locationName,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: '12px',
                color: '#FDCC4F'
              }}
              clickable
              onClick={() => history.push(`${MAP_PATH}/${fixedtag.id}`)}
            />
          ))}
        {markerCluster &&
          tags.map((tag) => (
            <Marker
              key={tag.id}
              visible={!isInMission && isShown(tag)}
              onLoad={(marker) => {
                setMarkers((prevMarkers) => [...prevMarkers, { tag, marker }])
              }}
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
                          (mission) => mission === tag.category.missionName
                        )
                      ],
                    scaledSize: { width: 28, height: 30 }
                  }
                }
                if (tag.category.missionName === '動態任務') {
                  if (compareTime(tag.lastUpdateTime)) {
                    return {
                      url:
                        missionActiveImage[
                          StatusName.findIndex(
                            (statusName) => statusName === tag.status.statusName
                          ) % 3
                        ],
                      scaledSize: { width: 28, height: 30 }
                    }
                  }
                  return {
                    url: missionImage[2],
                    scaledSize: { width: 28, height: 30 }
                  }
                }
                if (tag?.status?.statusName === '已解決') {
                  return {
                    url: mission2ImageVoting[0],
                    scaledSize: { width: 28, height: 30 }
                  }
                }
                return {
                  url:
                    missionImage[
                      missionName.findIndex(
                        (mission) => mission === tag.category.missionName
                      )
                    ],
                  scaledSize: { width: 28, height: 30 }
                }
              })()}
              clickable
              onClick={() => history.push(`${MAP_PATH}/${tag.id}`)}
            />
          ))}
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
        {placeName !== '' && search === true && showControl && (
          <Marker
            position={place}
            icon={{
              url: Searchposition,
              scaledSize: { width: 32, height: 32 },
              labelOrigin: { x: 16, y: -8 }
            }}
            label={{
              text: placeName,
              color: '#E25D33',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default Map
