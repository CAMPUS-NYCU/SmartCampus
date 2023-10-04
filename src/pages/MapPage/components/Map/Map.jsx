import React, { useEffect, useCallback, useMemo } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { useHistory } from 'react-router-dom'
import {
  useMissionValue,
  MissionStep
} from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { MAP_PATH } from '../../../../constants/pageUrls'
import flagImg from '../../../../assets/images/yellow-flag.svg'
// import myLocationImg from '../../../../assets/images/my-location.svg'
import { DefaultZoom } from '../../../../constants/mapConstants'
import FixedTags from '../../../../assets/images/fixedtag.svg'
// import Mission1 from '../../../../assets/images/mission1_pin.svg'
// import Mission2 from '../../../../assets/images/mission2_pin.svg'
import Searchposition from '../../../../assets/images/searchPositionIcon.svg'
import ReferMarkerFab from '../ReferMarkerFab'
import UserLocationResearch from '../ReferMarkerFab/UserLocationResearch'
import { markerIcon } from '../../../../constants/res1MarkerIcon'

function Map(props) {
  const {
    mapCenter,
    // userPosition,
    // userPositionError,
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
    handlePanTo,
    currentStep,
    showControl,
    mapInstance
  } = useMissionValue()
  const {
    tags,
    fixedTags,
    activeTagId,
    highlightTagId,
    setHighLightTagId,
    filterTags,
    activeTag,
    activeFixedTag
  } = useTagValue()

  const markerStatusIcon = useMemo(
    () =>
      markerIcon.map((markerInfo) => {
        return markerInfo
      }),
    []
  )

  const isShown = useCallback(
    (tag) => {
      if (
        tag.fixedTagId !== activeFixedTag?.id &&
        tag.fixedTagId !== activeTag?.fixedTagId
      ) {
        return false
      }
      if (filterTags.length === 0) {
        return true
      }
      return (
        filterTags.includes(tag.category.missionName) ||
        filterTags.includes(tag.category.subTypeName) ||
        (filterTags.includes(tag.category.targetName) &&
          tags?.map((t) => t.id).includes(tag.id))
      )
    },
    [activeFixedTag, activeTag, filterTags, tags]
  )
  const [markers, setMarkers] = React.useState([])
  const [displayTags, setDisplayTags] = React.useState([])
  const [markerCluster, setMarkerCluster] = React.useState(null)

  const getTagIcon = React.useCallback(
    (tag) => {
      if (highlightTagId === tag.id) {
        return {
          url: markerStatusIcon[
            markerStatusIcon.findIndex(
              (markerInfo) => markerInfo.status === tag.status.statusName
            )
          ].highlightIcon,
          scaledSize: { width: 42, height: 45 }
        }
      }
      return {
        url: markerStatusIcon[
          markerStatusIcon.findIndex(
            (markerInfo) => markerInfo.status === tag.status.statusName
          )
        ].normalIcon,
        scaledSize: { width: 28, height: 30 }
      }
    },
    [highlightTagId, markerStatusIcon]
  )
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
                url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png',
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
        markers.filter((m) => isShown(m.tag))?.map((m) => m.marker)
      )
      if (isInMission) {
        markerCluster.clearMarkers()
      }
    }
  }, [markers, markerCluster, isShown, isInMission])
  useEffect(() => {
    setMarkers((prevMarkers) => {
      return prevMarkers.filter((m) =>
        tags?.map((t) => t.id).includes(m.tag.id)
      )
    })
  }, [tags])
  useEffect(() => {
    const newDisplayedTags = tags?.map((tag) => {
      return {
        ...tag,
        icon: getTagIcon(tag)
      }
    })
    setDisplayTags(newDisplayedTags)
  }, [tags, activeTagId, highlightTagId, getTagIcon])

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
                  visibility: 'on'
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
        {/* {!userPositionError && userPosition.lat && userPosition.lng && (
          <Marker
            clickable={false}
            position={userPosition}
            icon={{
              url: myLocationImg,
              scaledSize: { width: 20, height: 20 }
            }}
          />
        )} */}
        {markerCluster &&
          fixedTags &&
          !activeTagId &&
          fixedTags?.map((fixedtag) => (
            <Marker
              key={fixedtag.id}
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
              onClick={() => {
                history.push(`${MAP_PATH}/fixedtag/${fixedtag.id}`)
                handlePanTo({
                  lat: parseFloat(fixedtag.coordinates.latitude),
                  lng: parseFloat(fixedtag.coordinates.longitude)
                })
              }}
            />
          ))}
        {markerCluster &&
          displayTags?.map((tag) => (
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
              icon={tag.icon}
              clickable
              onClick={() => {
                setHighLightTagId(tag.id)
                handlePanTo({
                  lat: parseFloat(tag.coordinates.latitude),
                  lng: parseFloat(tag.coordinates.longitude)
                })
              }}
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
        {activeFixedTag && (
          <>
            <ReferMarkerFab locationName={activeFixedTag.locationName} />
            <UserLocationResearch locationName={activeFixedTag.locationName} />
          </>
        )}
      </GoogleMap>
    </div>
  )
}

export default Map
