import React from 'react'
import { Fab, makeStyles } from '@material-ui/core'
import NearMeIcon from '@material-ui/icons/NearMe'
import { usePosition } from 'use-position'

const useStyles = makeStyles({
  fab: {
    position: 'absolute',
    top: 150,
    right: 24
  }
})

const LocationFab = (props) => {
  const { setMapCenter } = props
  const classes = useStyles()
  const {
    latitude: positionLat,
    longitude: positionLng,
    error: positionError
  } = usePosition(false, { enableHighAccuracy: true })
  const goToLocation = () => {
    if (!positionError) {
      setMapCenter({ lat: positionLat, lng: positionLng })
    }
  }
  return (
    <Fab
      className={classes.fab}
      size='medium'
      color='secondary'
      onClick={goToLocation}
    >
      <NearMeIcon style={{ color: 'white' }} />
    </Fab>
  )
}

export default LocationFab
