import React, { useEffect, useState } from 'react'
import { Marker } from '@react-google-maps/api'

import userMarkerIcon from '../../../../assets/images/res1-userLocation.svg'
import { findUserLocation } from '../../../../constants/res1FixedTagMissionConfig'

function UserLocationResearch(props) {
  const { locationName } = props
  const [thisUserLocation, setThisUserLocation] = useState({})

  useEffect(() => {
    setThisUserLocation(findUserLocation(locationName))
  }, [locationName])

  return (
    <>
      {thisUserLocation?.coordinates?.latitude &&
        thisUserLocation?.coordinates?.longitude && (
          <Marker
            position={{
              lat: thisUserLocation.coordinates.latitude,
              lng: thisUserLocation.coordinates.longitude
            }}
            icon={{
              url: userMarkerIcon,
              scaledSize: { width: 28, height: 30 }
            }}
          />
        )}
    </>
  )
}

export default UserLocationResearch
