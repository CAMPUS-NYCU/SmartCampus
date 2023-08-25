import React, { useEffect, useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'

import allRefMarkersData from '../../../../constants/markers/allMarkers.json'

function AllReferMarkers(props) {
  const locations = props
  const [checkedLocations, setCheckedLocations] = useState([])
  const [activeMarker, setActiveMarker] = useState('')

  useEffect(() => {
    setCheckedLocations(locations.locations)
  }, [locations])

  console.log(checkedLocations)

  return (
    <>
      {allRefMarkersData.map((item) => {
        if (checkedLocations?.includes(item.locationName)) {
          return (
            <Marker
              key={`${item.locationName}/${item.category.categoryDescName}`}
              position={{
                lat: item.coordinates.latitude,
                lng: item.coordinates.longitude
              }}
              title={item.category.categoryDescname}
              onClick={() => {
                setActiveMarker(
                  `${item.locationName}/${item.category.categoryDescName}`
                )
              }}
            >
              {activeMarker ===
              `${item.locationName}/${item.category.categoryDescName}` ? (
                <InfoWindow
                  position={{
                    lat: item.coordinates.latitude,
                    lng: item.coordinates.longitude
                  }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>{item.category.categoryDescName}</div>
                </InfoWindow>
              ) : null}
              {/* <InfoWindow
                position={{
                  lat: item.coordinates.latitude,
                  lng: item.coordinates.longitude
                }}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div>{item.category.categoryDescName}</div>
              </InfoWindow> */}
            </Marker>
          )
        }
        return <></>
      })}
    </>
  )
}

export default AllReferMarkers
