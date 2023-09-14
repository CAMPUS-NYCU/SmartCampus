import React, { useEffect, useState } from 'react'
import { Marker } from '@react-google-maps/api'

import referMarkerIcon from '../../../../assets/images/res1-referMarker.svg'
// import referMarkerActivedIcon from '../../../../assets/images/res1-referMarkerActived.svg'
import { findLocationData } from '../../../../constants/res1ReferMarkers'

function AllReferMarkers(props) {
  const { checkedItems, locationName } = props
  const [checkedCategoryNames, setCheckedCategoryNames] = useState([])
  const [thisLocationData, setThisLocationData] = useState([])

  useEffect(() => {
    setCheckedCategoryNames(checkedItems)
  }, [checkedItems])

  useEffect(() => {
    setThisLocationData(findLocationData(locationName?.locationName))
  }, [locationName])

  // const handleMarkerClick = (index) => {
  //   const updatedData = [...thisLocationData]
  //   updatedData[index].isOpen = !updatedData[index].isOpen
  //   setThisLocationData(updatedData)
  // }

  thisLocationData.map((item) => {
    if (checkedCategoryNames?.includes(item.category.categoryName)) {
      // const markerIcon = item.isOpen
      //   ? referMarkerActivedIcon
      //   : referMarkerIcon
      // const labelColor = item.isOpen ? '#FDCC4F' : '#97948E'

      return (
        <Marker
          key={`${locationName?.locationName}/${item.category.categoryDescName}`}
          position={{
            lat: item.coordinates.latitude,
            lng: item.coordinates.longitude
          }}
          icon={{
            url: referMarkerIcon,
            labelOrigin: { x: 15, y: 34 }
          }}
          label={{
            text: item.category.categoryDescName,
            fontFamily: 'Roboto',
            fontSize: '14px',
            color: '#97948E'
          }}
          // onClick={() => handleMarkerClick(index)}
        />
      )
    }
    return <></>
  })

  return <></>
}

export default AllReferMarkers
